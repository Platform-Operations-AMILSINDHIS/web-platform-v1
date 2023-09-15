import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { rsvpForEvent } from "../../sheets";
import { sendRsvpMailForEvent } from "../../mail";

export const eventRouter = createTRPCRouter({
  rsvp: publicProcedure
    .input(
      z.object({
        eventTitle: z.string(),
        eventDate: z.date(),
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { eventTitle, eventDate, email, name } = input;

      // Add to Google sheet here
      await rsvpForEvent({ eventTitle, name, email });

      // Send mail here
      await sendRsvpMailForEvent({ eventTitle, eventDate, to: email });

      return {
        success: true,
      };
    }),
});
