import { exampleRouter } from "~/server/api/routers/example";
import { formRouter } from "~/server/api/routers/form";
import { eventRouter } from "~/server/api/routers/event";
import { r2Router } from "~/server/api/routers/r2-router";

import { createTRPCRouter } from "~/server/api/trpc";
import formBufferData from "./routers/formBufferData";
import actions from "./routers/actions";
import matrimonyProfiles from "./routers/matrimonyProfiles";
import profilRequests from "./routers/profileRequests";
import recoveryRouter from "./routers/recovery";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  form: formRouter,
  event: eventRouter,
  r2: r2Router,
  formBuffer: formBufferData,
  actions: actions,
  matrimonyProfiles: matrimonyProfiles,
  profileRequests: profilRequests,
  recovery: recoveryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
