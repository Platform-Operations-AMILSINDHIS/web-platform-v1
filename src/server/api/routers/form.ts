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
  matrimonyFormValuesSchema,
} from "~/utils/schemas";

import {
  sendFormConfirmationMail,
  sendDonationFormConfirmationMail,
  sendRawJsonDataWithPDF,
  sendRawJsonDataOnly,
  sendDonationNotificationMail,
  sendMatrimonyFormNotificationMail,
} from "../../mail";

import supabase from "~/pages/api/auth/supabase";

const getLastMembershipNums = async () => {
  const { data, error } = await supabase
    .from("general_accounts")
    .select("membership_id");
  if (error) {
    throw new Error("Failed to fetch data");
  }

  const allMembershipIds =
    data
      ?.map((row) => row.membership_id)
      .filter((mId) => typeof mId === "string") || [];

  console.log("this is allMembershipIds: ", { allMembershipIds });

  const kapMembershipIds = allMembershipIds
    .filter((id: string) => id.startsWith("K"))
    .sort()
    .reverse();
  const lastKapMembershipIdNum =
    kapMembershipIds.length > 0
      ? parseInt(kapMembershipIds[0].substring(1))
      : 0;

  const yacMembershipIds = allMembershipIds
    .filter((id: string) => id.startsWith("Y"))
    .sort()
    .reverse();
  const lastYacMembershipIdNum =
    yacMembershipIds.length > 0
      ? parseInt(yacMembershipIds[0].substring(1))
      : 0;

  const patronMembershipIds = allMembershipIds
    .filter((id: string) => id.startsWith("P"))
    .sort()
    .reverse();
  const lastPatronMembershipIdNum =
    patronMembershipIds.length > 0
      ? parseInt(patronMembershipIds[0].substring(1))
      : 0;

  return {
    lastKapMembershipIdNum,
    lastYacMembershipIdNum,
    lastPatronMembershipIdNum,
  };
};

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

      const { lastKapMembershipIdNum, lastPatronMembershipIdNum } =
        await getLastMembershipNums();
      const membershipId =
        formData.membershipInfo.membershipType === "life-member"
          ? `K${(lastKapMembershipIdNum + 1).toString().padStart(5, "0")}`
          : `P${(lastPatronMembershipIdNum + 1).toString().padStart(5, "0")}`;

      const { error } = await supabase
        .from("general_accounts")
        .update({ membership_id: membershipId })
        .eq("email_id", formData.personalInfo.emailId);

      if (error) console.error(error);

      // const membershipId = `P${(lastPatronMembershipIdNum + 1)
      //   .toString()
      //   .padStart(5, "0")}`;

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

      return { success: true, membershipId };
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

      const { lastYacMembershipIdNum } = await getLastMembershipNums();
      const membershipId = `Y${(lastYacMembershipIdNum + 1)
        .toString()
        .padStart(5, "0")}`;

      const { error } = await supabase
        .from("general_accounts")
        .update({ membership_id: membershipId })
        .eq("email_id", formData.personalInfo.emailId);

      if (error) console.error(error);

      // Send response
      await sendRawJsonDataWithPDF(
        "akshat.sabavat@gmail.com",
        // "somesh.kar@gmail.com",
        formData,
        "yac-membership"
      );

      // Send confirmation mail
      await sendFormConfirmationMail({
        to: formData.personalInfo.emailId,
        formName: "Young Amil Circle Membership",
      });

      return { success: true, membershipId };
    }),
  donations: publicProcedure
    .input(Yup.object({ formData: donationsFormSchema }))
    .mutation(async ({ input }) => {
      // .mutation(({ input }) => {
      const { formData } = input;

      console.log({ formData });

      // Send response
      // await sendRawJsonDataOnly("akshat.sabavat@gmail.com", formData);
      // await sendRawJsonDataOnly("somesh.kar@gmail.com", formData);
      await sendDonationNotificationMail("akshat.sabavat@gmail.com", {
        donorName: formData.donorName,
        email: formData.email,
        amount: formData.amount,
      });

      // Send confirmation mail
      await sendDonationFormConfirmationMail(formData);
      // await sendFormConfirmationMail({
      //   to: formData.email,
      //   formName: "Donations",
      // });

      return { success: true };
    }),
  matrimony: publicProcedure
    .input(Yup.object({ formData: matrimonyFormValuesSchema }))
    .mutation(async ({ input }) => {
      // .mutation(({ input }) => {
      const { formData } = input;

      console.log({ formData });

      // Send response
      // await sendRawJsonDataOnly("akshat.sabavat@gmail.com", formData);
      await sendMatrimonyFormNotificationMail(
        "akshat.sabavat@gmail.com",
        formData
      );

      // Send confirmation mail
      await sendFormConfirmationMail({
        to: formData.personalInfo.emailId,
        formName: "Matrimony",
      });

      return { success: true };
    }),
});
