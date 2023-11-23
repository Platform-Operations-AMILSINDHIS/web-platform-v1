import * as Yup from "yup";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import {
  kapMembershipFormValuesSchema,
  yacMembershipFormValuesSchema,
  donationsFormSchema,
} from "~/utils/schemas";

import {
  sendFormConfirmationMail,
  sendRawJsonDataWithPDF,
  sendRawJsonDataOnly,
} from "../../mail";

export const formRouter = createTRPCRouter({
  kapMembership: publicProcedure
    .input(
      Yup.object({
        formData: kapMembershipFormValuesSchema,
        paymentId: Yup.string().required(),
      })
    )
    .mutation(async ({ input }) => {
      const { formData } = input;

      console.log({ formData });

      // const pdf = await generateKAPMembershipPDF({
      //   // TODO: Dynamically generate membership number
      //   membershipNumber: "123456",
      //   kapForm: formData as KAPMembershipFormValues,
      // });

      // console.log({ pdf });

      // Send response
      // await sendRawJsonDataWithPDF(
      //   "somesh.kar@gmail.com",
      //   formData,
      //   "kap-membership"
      // );
      await sendRawJsonDataWithPDF(
        "akshat.sabavat@gmail.com",
        // "somesh.kar@gmail.com",
        formData,
        "kap-membership"
      );

      // await sendRawJsonDataOnly("somesh.kar@gmail.com", formData);
      // await sendRawJsonDataOnly("akshat.sabavat@gmail.com", formData);

      // Send confirmation mail
      await sendFormConfirmationMail({
        to: formData.personalInfo.emailId,
        formName: "Khudabadi Amil Panchayat Membership",
      });

      return { success: true };
    }),
  yacMembership: publicProcedure
    .input(
      Yup.object({
        formData: yacMembershipFormValuesSchema,
        paymentId: Yup.string().required(),
      })
    )
    .mutation(async ({ input }) => {
      const { formData } = input;

      console.log({ formData });

      // Send response
      await sendRawJsonDataWithPDF(
        // "akshat.sabavat@gmail.com",
        "somesh.kar@gmail.com",
        formData,
        "yac-membership"
      );

      // Send confirmation mail
      await sendFormConfirmationMail({
        to: formData.personalInfo.emailId,
        formName: "Young Amil Circle Membership",
      });

      return { success: true };
    }),
  donations: publicProcedure
    .input(Yup.object({ formData: donationsFormSchema }))
    .mutation(async ({ input }) => {
      // .mutation(({ input }) => {
      const { formData } = input;

      console.log({ formData });

      // Send response
      await sendRawJsonDataOnly("akshat.sabavat@gmail.com", formData);

      // Send confirmation mail
      await sendFormConfirmationMail({
        to: formData.email,
        formName: "Donations",
      });

      return { success: true };
    }),
});
