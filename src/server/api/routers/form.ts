import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { kapMembershipFormValuesSchema } from "../../schemas";

import { sendFormConfirmationMail, sendRawJsonData } from "../../mail";

export const formRouter = createTRPCRouter({
  kapMembership: publicProcedure
    .input(z.object({ formData: kapMembershipFormValuesSchema }))
    .mutation(async ({ input }) => {
      const { formData } = input;

      console.log({ formData });

      // Send response
      await sendRawJsonData("somesh.kar@gmail.com", formData);
      await sendRawJsonData("akshat.sabavat@gmail.com", formData);

      // Send confirmation mail
      await sendFormConfirmationMail({
        to: formData.personalInfo.emailId,
        formName: "Khudabadi Amil Panchayat Membership",
      });

      return {
        greeting: `Hello`,
      };
    }),
});
