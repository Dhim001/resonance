import { baseProcedure, createTRPCRouter } from '../init';
 
export const appRouter = createTRPCRouter({
  health: baseProcedure.query(async () => {
    // demo Suspense query that takes 1 second to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { status: 'ok' };
  }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;