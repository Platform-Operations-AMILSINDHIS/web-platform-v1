import * as Yup from "yup";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  verifyAgeForMembership,
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
import { TRPCError } from "@trpc/server";

const getLastMembershipNums = async () => {
  const { data, error } = await supabase
    .from("general_accounts")
    .select("membership_id");
  if (error) {
    console.error("Error fetching membership IDs:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch membership data",
    });
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

async function syncDOBToAccount(
  userId: string,
  dob: string | Date | null | undefined
): Promise<void> {
  if (!userId || !dob) return;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return;
  const dobString = d.toISOString().slice(0, 10);
  // Only update if date_of_birth is not already set on the account
  const { error } = await supabase
    .from("general_accounts")
    .update({ date_of_birth: dobString })
    .eq("id", userId)
    .is("date_of_birth", null);
  if (error) console.error("Error syncing DOB to account:", error);
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
      const { formData, paymentId } = input;
      console.log({ formData });

      // KAP Form submission buffer
      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      if (!userId)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email does not exist in user database",
        });

      // Backend age eligibility check — KAP requires age >= 21
      await verifyAgeForMembership(userId, "KAP");

      // check for duplicate payment ID

      const { data: paymentID, error: paymentIDfetchError } = await supabase
        .from("form_buffer")
        .select("paymentID")
        .eq("paymentID", paymentId);

      if (paymentIDfetchError) {
        console.error("Error verifying paymentId:", paymentIDfetchError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Issue verifying paymentId, try submitting again",
        });
      }

      if (paymentID.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Duplicate paymentIds detected, please enter the right payment ID",
        });

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "KAP",
        submission: formData,
        paymentID: paymentId,
      });

      if (error) {
        console.error("Error inserting KAP form buffer:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit form",
        });
      }

      await syncDOBToAccount(userId, formData.personalInfo.dateOfBirth);

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
        isPrevMember: false,
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
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email does not exist in user database",
        });

      // Backend age eligibility check — KAP requires age >= 21
      await verifyAgeForMembership(userId, "KAP");

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "KAP",
        submission: formData,
        isMember: true,
      });

      if (error) {
        console.error("Error inserting KAP prev form buffer:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit form",
        });
      }

      await syncDOBToAccount(userId, formData.personalInfo.dateOfBirth);

      await sendRawJsonDataWithPDF(
        "amilsindhis@gmail.com",
        formData,
        "kap-membership"
      );

      await sendFormConfirmationMail({
        to: formData.personalInfo.emailId,
        formName: "Khudabadi Amil Panchayat Membership",
        isPrevMember: true,
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
      const { formData, paymentId } = input;
      console.log({ formData });

      // YAC Form submission buffer
      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      if (!userId)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email does not exist in user database",
        });

      // Backend age eligibility check — YAC requires age between 16 and 30
      await verifyAgeForMembership(userId, "YAC");

      // check for duplicate payment ID

      const { data: paymentID, error: paymentIDfetchError } = await supabase
        .from("form_buffer")
        .select("paymentID")
        .eq("paymentID", paymentId);

      if (paymentIDfetchError) {
        console.error("Error verifying paymentId:", paymentIDfetchError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Issue verifying paymentId, try submitting again",
        });
      }

      if (paymentID.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Duplicate paymentIds detected, please enter the right payment ID",
        });

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "YAC",
        submission: formData,
        paymentID: paymentId,
      });

      if (error) {
        console.error("Error inserting YAC form buffer:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit form",
        });
      }

      await syncDOBToAccount(userId, formData.personalInfo.dateOfBirth);

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
        isPrevMember: false,
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
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email does not exist in user database",
        });

      // Backend age eligibility check — YAC requires age between 16 and 30
      await verifyAgeForMembership(userId, "YAC");

      const { error } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "YAC",
        submission: formData,
        isMember: true,
      });

      if (error) {
        console.error("Error inserting YAC prev form buffer:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit form",
        });
      }

      await syncDOBToAccount(userId, formData.personalInfo.dateOfBirth);

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
        isPrevMember: true,
      });

      return { success: true };
    }),
  donations: publicProcedure
    .input(Yup.object({ formData: donationsFormSchema }))
    .mutation(async ({ input }) => {
      try {
        const { formData } = input;

        // Validate input (optional, but recommended)
        if (!formData) {
          return {
            success: false,
            error: "Invalid form data provided",
          };
        }

        // Validate specific fields if needed
        if (!formData.email || !formData.donorName) {
          return {
            success: false,
            error: "Missing required fields",
          };
        }

        // Existing logic for sending emails
        await sendDonationNotificationMail("amilsindhis@gmail.com", {
          donorName: formData.donorName,
          email: formData.email,
          phone: formData.contactNumber,
          amount: formData.amount,
          panCardUrl: formData.panCard,
          addressProofUrl: formData.addressProof,
          paymentTransactionID: formData.paymentTransactionId,
        });

        await sendDonationFormConfirmationMail(formData);

        return {
          success: true,
          error: null,
        };
      } catch (error) {
        // Log the full error for server-side debugging
        console.error("Donation form submission error:", error);

        // Return a user-friendly error message
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred during form submission",
        };
      }
    }),
  matrimony: publicProcedure
    .input(Yup.object({ formData: matrimonyFormValuesSchema }))
    .mutation(async ({ input }) => {
      const { formData } = input;

      const userId = await getUserIdByEmail(formData.personalInfo.emailId);

      console.log({ formData });

      // Backend check — prevent duplicate matrimony submissions for already-approved applicants
      if (userId) {
        const { data: existingMatrimonyProfile } = await supabase
          .from("matrimony_profiles")
          .select("matrimony_id")
          .eq("user_id", userId)
          .maybeSingle();

        if (existingMatrimonyProfile) {
          throw new TRPCError({
            code: "CONFLICT",
            message:
              "You already have an approved matrimony profile. You cannot submit another application.",
          });
        }
      }

      const { error: BufferError } = await supabase.from("form_buffer").insert({
        user_id: userId,
        formType: "MATRIMONY",
        submission: formData,
      });

      if (BufferError) {
        console.error("Error inserting matrimony form buffer:", BufferError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit form",
        });
      }

      if (userId) {
        await syncDOBToAccount(
          userId,
          formData.personalInfo.dateAndTimeOfBirth
        );
      }

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
