import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/db";
import { deleteAudio } from "@/lib/r2";
import { createTRPCRouter, orgProcedure } from '../init';

export const voiceRouter = createTRPCRouter({
    getAll: orgProcedure
        .input(
            z
                .object({
                    query: z.string().trim().optional(),
                })
                .optional(),
        )
        .query(async ({ ctx, input }) => {
            const searchFilter = input?.query
                ? {
                        OR: [
                            {
                                name: { 
                                    contains: input.query, mode: "insensitive" as const
                                }
                            },   
                            {
                                description: {
                                    contains: input.query, mode: "insensitive" as const,
                                }
                            },
                        ]
                  }
                : {};

            const [custom, system] = await Promise.all([
                prisma.voice.findMany({
                    where: {
                        variant: "CUSTOM",
                        orgId: ctx.orgId,
                        ...searchFilter,
                    },
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true,
                        language: true,
                        variant: true,
                    },
                }),
                prisma.voice.findMany({
                    where: {
                        variant: "SYSTEM",
                        ...searchFilter,
                    },
                    orderBy: { name: "asc" },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true,
                        language: true,
                        variant: true,  
                    }
                })
            ]);

            return { custom, system };
        }),

    delete: orgProcedure
        .input(
            z.object({ id: z.string() })
        )
        .mutation(async ({ ctx, input }) => {
            const voice = await prisma.voice.findFirst({
                where: {
                    id: input.id,
                    orgId: ctx.orgId,
                    variant: "CUSTOM",
                },
                select: { id: true, r2ObjectKey: true },
            });
        
            if (!voice) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Voice not found" });
            }

            await prisma.voice.delete({
                where: { id: voice.id },
            });

            if (voice.r2ObjectKey) {
                // Attempt to delete the audio file, but don't fail the whole operation if it fails
                // In production, consider background jobs, retries, cron jobs, or other strategies for ensuring cleanup of orphaned files
                await deleteAudio(voice.r2ObjectKey).catch(() => {
                    console.error(`Failed to delete audio file: ${voice.r2ObjectKey}`);
                });
            }

            return { success: true };
        }),
});