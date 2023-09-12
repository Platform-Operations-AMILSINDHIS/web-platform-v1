import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { rsvpForEvent } from "../../sheets";

export const eventRouter = createTRPCRouter({
  rsvp: publicProcedure
    .input(
      z.object({ eventName: z.string(), name: z.string(), email: z.string() })
    )
    .mutation(async ({ input }) => {
      const { eventName, email, name } = input;

      // TODO: Send mail here

      // TODO: Add to Google sheet here
      await rsvpForEvent({ eventName, name, email });

      return {
        success: true,
      };
    }),
});
