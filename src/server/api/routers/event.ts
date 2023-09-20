// import { z } from "zod";
import * as Yup from "yup";
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
      Yup.object().shape({
        eventTitle: Yup.string().required(),
        eventDate: Yup.date().required(),
        name: Yup.string().required(),
        email: Yup.string().required(),
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
