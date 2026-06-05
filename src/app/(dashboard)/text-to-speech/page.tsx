import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import type { Metadata } from "next";
import { trpc, HydrateClient, prefetch } from "@/trpc/server";

export const metadata: Metadata = {
    title: "Text to Speech - Resonance",
    description: "Convert your text into natural-sounding speech with our Text to Speech feature. Simply input your text, choose a voice, and let our advanced AI technology do the rest. Perfect for creating audio content, enhancing accessibility, or just having fun with your words!"
};
export default async function TextToSpeechPage({
    searchParams,
}: {
    searchParams: Promise<{ text?: string; voiceId?: string }>;
}) {
    const { text, voiceId } = await searchParams;

    prefetch(trpc.voices.getAll.queryOptions());

    return (
        <HydrateClient>
            <TextToSpeechView 
                initialValues={{ text, voiceId }} 
            />
        </HydrateClient>
    );
};