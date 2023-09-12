import { exampleRouter } from "~/server/api/routers/example";
import { formRouter } from "~/server/api/routers/form";
import { eventRouter } from "~/server/api/routers/event";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  form: formRouter,
  event: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
