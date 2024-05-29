import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

import * as Yup from "yup";
import { sendDescisionMail } from "~/server/mail";
import {
  MatrimonyBufferDataType,
  MembershipBufferDataType,
} from "~/types/tables/dataBuffer";

const formBufferData = createTRPCRouter({
  fetchMembershipBuffer: publicProcedure.query(async () => {
    try {
      const {
        data: formMembershipBufferData,
        error: formMembershipBufferDataError,
      } = await supabase
        .from("form_buffer")
        .select("*")
        .in("formType", ["KAP", "YAC"])
        .eq("status", "PENDING");

      if (formMembershipBufferDataError) throw formMembershipBufferDataError;

      return formMembershipBufferData as MembershipBufferDataType[]; // Return the fetched data
    } catch (err) {
      // Handle errors here
      console.error("Error fetching membership form buffer data:", err);
      throw new Error("Failed to fetch form buffer data");
    }
  }),

  fetchMatrimonyBuffer: publicProcedure.query(async () => {
    try {
      const {
        data: formMatrimonyBufferData,
        error: formMatrimonyBufferDataError,
      } = await supabase
        .from("form_buffer")
        .select("*")
        .in("formType", ["MATRIMONY"])
        .eq("status", "PENDING");

      if (formMatrimonyBufferDataError) throw formMatrimonyBufferDataError;

      return formMatrimonyBufferData as MatrimonyBufferDataType[]; // Return the fetched data
    } catch (err) {
      // Handle errors here
      console.error("Error fetching membership form buffer data:", err);
      throw new Error("Failed to fetch form buffer data");
    }
  }),

  fetchApprovedMatrimonyApplicants: publicProcedure.query(async () => {
    try {
      const {
        data: approvedMatrimonyApplicants,
        error: approvedMatrimonyApplicantsFetchError,
      } = await supabase.from("matrimony_profiles").select("*");

      if (approvedMatrimonyApplicantsFetchError)
        throw approvedMatrimonyApplicantsFetchError;

      return {
        matrimonyApplicantsApproved: approvedMatrimonyApplicants,
      };
    } catch (err) {
      console.log(
        `Error while fetching approved matrimony applicants : ${err}`
      );
    }
  }),

  fetchUserMembershipSubmission: publicProcedure
    .input(Yup.object({ user_id: Yup.string(), formType: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id, formType } = input;
        const { data: userFormSubmission, error: fetchSubmissionError } =
          await supabase
            .from("form_buffer")
            .select("submission")
            .eq("user_id", user_id)
            .eq("formType", formType);

        if (fetchSubmissionError) throw fetchSubmissionError;

        return {
          DB_submission_response: userFormSubmission,
        };
      } catch (err) {
        console.log(err);
      }
    }),

  rejectUserApplication: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string(),
        formType: Yup.string(),
        to: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { user_id, formType, to } = input;
        const { data: RemoveRowResponse, error: RemoveRowResponseError } =
          await supabase.from("form_buffer").delete().eq("user_id", user_id);

        if (RemoveRowResponseError) throw RemoveRowResponseError;

        await sendDescisionMail({
          formType: formType ?? "",
          descision: false,
          to: to ?? "",
        });

        return {
          DB_response: RemoveRowResponse,
        };
      } catch (err) {
        console.log(err);
      }
    }),

  acceptUserApplication: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string(),
        formType: Yup.string(),
        to: Yup.string(),
        membership_id: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { formType, to, user_id, membership_id } = input;
        const memberProperty = `${formType}_member`;

        const { data, error } = await supabase
          .from("general_accounts")
          .update({ [memberProperty]: true, membership_id: membership_id })
          .eq("id", user_id);

        if (error) throw error;

        const { data: _, error: formBufferError } = await supabase
          .from("form_buffer")
          .update({ status: "APPROVED" })
          .eq("user_id", user_id)
          .eq("formType", formType);

        if (formBufferError) throw error;

        await sendDescisionMail({
          membershipID: membership_id as string,
          descision: true,
          formType: formType ?? "",
          to: to ?? "",
        });

        return {
          server_response: data,
          user_id,
          to,
        };
      } catch (err) {
        console.log(err);
      }
    }),

  fetchApplicantAge: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: applicantAge, error: ErrorFetchingAge } = await supabase
          .from("general_accounts")
          .select("age")
          .eq("id", user_id);

        if (ErrorFetchingAge) throw ErrorFetchingAge;

        return {
          DB_response: applicantAge,
        };
      } catch (err) {
        console.log(`Error while fetching user_age: ${err}`);
      }
    }),

  acceptUserMatrimonyApplication: publicProcedure
    .input(Yup.object({ user_id: Yup.string(), matrimony_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { matrimony_id, user_id } = input;

        const { data: _, error: formBufferError } = await supabase
          .from("form_buffer")
          .update({ status: "APPROVED" })
          .eq("user_id", user_id);

        if (formBufferError) throw formBufferError;

        const {
          data: matrimonyDataUpdatedRows,
          error: matrimonyDataUploadError,
        } = await supabase
          .from("matrimony_profiles")
          .insert([{ user_id: user_id, matrimony_id: matrimony_id as string }]);

        if (matrimonyDataUploadError) throw Error;

        return {
          new_rows: matrimonyDataUpdatedRows,
        };
      } catch (err) {
        console.log(`Error while updating matrimony profile table: ${err}`);
      }
    }),

  rejectUserMatrimonyApplication: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const user_id = input.user_id;

        const { error: DeletionError } = await supabase
          .from("matrimony_profiles")
          .delete()
          .eq("user_id", user_id);

        if (DeletionError) throw DeletionError;

        return {
          message: "Applicant rejected",
        };
      } catch (err) {
        console.log(`Error while deleting matrimony buffer data : ${err}`);
      }
    }),
});

export default formBufferData;
