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
import { TRPCClientError } from "@trpc/client";

const getLastMembershipNums = async () => {
  const { data, error } = await supabase
    .from("general_accounts")
    .select("membership_id");
  if (error) {
    throw new Error("Failed to fetch data");
  }

  const allMembershipIds =
    data
      ?.map((row: { membership_id: string | null }) => row.membership_id)
      .filter((mId) => typeof mId === "string") || [];

  console.log("this is allMembershipIds: ", { allMembershipIds });

  const kapMembershipIds = allMembershipIds
    .filter((id: string | null) => typeof id === "string" && id.startsWith("K"))
    .sort()
    .reverse();
  const lastKapMembershipIdNum =
    kapMembershipIds.length > 0
      ? parseInt(kapMembershipIds[0]!.substring(1))
      : 0;

  const yacMembershipIds = allMembershipIds
    .filter((id: string | null) => typeof id === "string" && id.startsWith("Y"))
    .sort()
    .reverse();
  const lastYacMembershipIdNum =
    yacMembershipIds.length > 0
      ? parseInt(yacMembershipIds[0]!.substring(1))
      : 0;

  const patronMembershipIds = allMembershipIds
    .filter((id: string | null) => typeof id === "string" && id.startsWith("P"))
    .sort()
    .reverse();
  const lastPatronMembershipIdNum =
    patronMembershipIds.length > 0
      ? parseInt(patronMembershipIds[0]!.substring(1))
      : 0;

  return {
    lastKapMembershipIdNum,
    lastYacMembershipIdNum,
    lastPatronMembershipIdNum,
  };
};

async function getUserIdByEmail(emailId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("general_accounts")
    .select("id")
    .eq("email_id", emailId)
    .limit(1);

  if (error) {
    console.error("Error fetching ID:", error);
    return null;
  }

  return (data?.[0]?.id as string) ?? null;
}

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

      // KAP Form submission buffer
      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      if (!userId)
        throw new TRPCClientError("Email does not exist in user database");

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "KAP",
        submission: formData,
      });

      if (error) console.error(error);

      // // Membership ID Logic
      // const { lastKapMembershipIdNum, lastPatronMembershipIdNum } =
      //   await getLastMembershipNums();
      // const membershipId =
      //   formData.membershipInfo.membershipType === "life-member"
      //     ? `K${(lastKapMembershipIdNum + 1).toString().padStart(5, "0")}`
      //     : `P${(lastPatronMembershipIdNum + 1).toString().padStart(5, "0")}`;

      // const { error } = await supabase
      //   .from("general_accounts")
      //   .update({ membership_id: membershipId })
      //   .eq("email_id", formData.personalInfo.emailId);

      // if (error) console.error(error);

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
        "amilsindhis@gmail.com",
        // "akshat.sabavat@gmail.com",
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

  kapMembershipPrev: publicProcedure
    .input(
      Yup.object({
        formData: kapMembershipFormValuesSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { formData } = input;
      console.log({ formData });

      // KAP Form submission buffer
      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      if (!userId)
        throw new TRPCClientError("Email does not exist in user database");

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "KAP",
        submission: formData,
      });

      if (error) console.error(error);
      await sendRawJsonDataWithPDF(
        "amilsindhis@gmail.com",
        formData,
        "kap-membership"
      );

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

      // YAC Form submission buffer
      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      if (!userId)
        throw new TRPCClientError("Email does not exist in user database");

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "YAC",
        submission: formData,
      });

      if (error) console.error(error);

      // // Membership ID Logic
      // const { lastYacMembershipIdNum } = await getLastMembershipNums();
      // const membershipId = `Y${(lastYacMembershipIdNum + 1)
      //   .toString()
      //   .padStart(5, "0")}`;

      // const { error } = await supabase
      //   .from("general_accounts")
      //   .update({ membership_id: membershipId })
      //   .eq("email_id", formData.personalInfo.emailId);

      // if (error) console.error(error);

      // Send response
      await sendRawJsonDataWithPDF(
        "amilsindhis@gmail.com",
        // "akshat.sabavat@gmail.com",
        // "somesh.kar@gmail.com",
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

  yacMembershipPrev: publicProcedure
    .input(
      Yup.object({
        formData: yacMembershipFormValuesSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { formData } = input;
      console.log({ formData });

      // YAC Form submission buffer
      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      if (!userId)
        throw new TRPCClientError("Email does not exist in user database");

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "YAC",
        submission: formData,
      });

      if (error) console.error(error);

      // // Membership ID Logic
      // const { lastYacMembershipIdNum } = await getLastMembershipNums();
      // const membershipId = `Y${(lastYacMembershipIdNum + 1)
      //   .toString()
      //   .padStart(5, "0")}`;

      // const { error } = await supabase
      //   .from("general_accounts")
      //   .update({ membership_id: membershipId })
      //   .eq("email_id", formData.personalInfo.emailId);

      // if (error) console.error(error);

      // Send response
      await sendRawJsonDataWithPDF(
        "amilsindhis@gmail.com",
        // "akshat.sabavat@gmail.com",
        // "somesh.kar@gmail.com",
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
      // await sendRawJsonDataOnly("akshat.sabavat@gmail.com", formData);
      // await sendRawJsonDataOnly("somesh.kar@gmail.com", formData);
      // await sendDonationNotificationMail("akshat.sabavat@gmail.com", {
      await sendDonationNotificationMail("amilsindhis@gmail.com", {
        donorName: formData.donorName,
        email: formData.email,
        phone: formData.contactNumber,
        amount: formData.amount,
        panCardUrl: formData.panCard,
        addressProofUrl: formData.addressProof,
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

      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      console.log({ formData });

      const { error: BufferError } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "MATRIMONY",
        submission: formData,
      });

      if (BufferError) throw BufferError;

      // Send response
      // await sendRawJsonDataOnly("akshat.sabavat@gmail.com", formData);
      await sendMatrimonyFormNotificationMail(
        "amilsindhis@gmail.com",
        // "akshat.sabavat@gmail.com",
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
