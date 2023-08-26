import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { kapMembershipFormValuesSchema } from "../../schemas";

import { sendRawJsonData } from "../../mail";

export const formRouter = createTRPCRouter({
  kapMembership: publicProcedure
    .input(z.object({ formData: kapMembershipFormValuesSchema }))
    .mutation(async ({ input }) => {
      const { formData } = input;

      console.log({ formData });

      await sendRawJsonData("somesh.kar@gmail.com", formData);
      await sendRawJsonData("akshat.sabavat@gmail.com", formData);

      return {
        greeting: `Hello`,
      };
    }),
});
