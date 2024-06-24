import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

import * as Yup from "yup";
import { sendDescisionMail, sendMatrimonyDescisionMail } from "~/server/mail";

const formBufferData = createTRPCRouter({
  fetchAllBuffer: publicProcedure.query(async () => {
    try {
      const { data: fetchedFormBufferData, error: fetchError } = await supabase
        .from("form_buffer")
        .select("*");

      if (fetchError) throw fetchError;

      return {
        form_buffer: fetchedFormBufferData,
      };
    } catch (err) {
      console.error("Error fetching form buffer data:", err);
      throw new Error("Failed to fetch form buffer data");
    }
  }),
  fetchMembershipBuffer: publicProcedure.query(async () => {
    try {
      const {
        data: formMembershipBufferData,
        error: formMembershipBufferDataError,
      } = await supabase
        .from("form_buffer")
        .select("*")
        .in("formType", ["KAP", "YAC"]);

      if (formMembershipBufferDataError) throw formMembershipBufferDataError;

      return {
        membership_formbuffer: formMembershipBufferData,
      }; // Return the fetched data
    } catch (err) {
      console.error("Error fetching membership form buffer data:", err);
      throw new Error("Failed to fetch membership form buffer data");
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
        .in("formType", ["MATRIMONY"]);

      if (formMatrimonyBufferDataError) throw formMatrimonyBufferDataError;

      return {
        matrimony_formbuffer: formMatrimonyBufferData,
      }; // Return the fetched data
    } catch (err) {
      // Handle errors here
      console.error("Error fetching membership form buffer data:", err);
      throw new Error("Failed to fetch matrimony form buffer data");
    }
  }),

  fetchApprovedMatrimonyApplicants: publicProcedure.query(async () => {
    try {
      const {
        data: approvedMatrimonyApplicants,
        error: approvedMatrimonyApplicantsFetchError,
      } = await supabase
        .from("form_buffer")
        .select("*")
        .eq("status", "APPROVED")
        .eq("formType", "MATRIMONY");

      if (approvedMatrimonyApplicantsFetchError)
        throw approvedMatrimonyApplicantsFetchError;

      return approvedMatrimonyApplicants;
    } catch (err) {
      console.log(
        `Error while fetching approved matrimony applicants : ${err}`
      );
    }
  }),

  fetchUserSubmission: publicProcedure
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

        return userFormSubmission[0]?.submission;
      } catch (err) {
        console.log(err);
      }
    }),

  fetchUserMatrimonySubmission: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: userFormSubmission, error: fetchSubmissionError } =
          await supabase
            .from("form_buffer")
            .select("submission")
            .eq("user_id", user_id)
            .eq("formType", "MATRIMONY");

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
        const { data: _, error: formBufferError } = await supabase
          .from("form_buffer")
          .update({ status: "REJECTED" })
          .eq("user_id", user_id)
          .eq("formType", formType);

        if (formBufferError) throw formBufferError;

        await sendDescisionMail({
          formType: formType ?? "",
          descision: false,
          to: to ?? "",
        });

        return {
          status: "Application Rejected",
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
    .input(
      Yup.object({
        user_id: Yup.string(),
        matrimony_id: Yup.string(),
        to: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { matrimony_id, user_id, to } = input;

        const { data: _, error: formBufferError } = await supabase
          .from("form_buffer")
          .update({ status: "APPROVED" })
          .eq("user_id", user_id);

        if (formBufferError) throw formBufferError;

        const { error: matrimonyDataUploadError } = await supabase
          .from("matrimony_profiles")
          .insert([{ user_id: user_id, matrimony_id: matrimony_id as string }]);

        if (matrimonyDataUploadError) throw Error;

        await sendMatrimonyDescisionMail({
          descision: true,
          to: to as string,
          matrimonyID: matrimony_id as string,
        });

        return {
          status: true,
        };
      } catch (err) {
        console.log(`Error while updating matrimony profile table: ${err}`);
      }
    }),

  rejectUserMatrimonyApplication: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string(),
        to: Yup.string(),
        formType: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { user_id, formType, to } = input;

        const { data: _, error: formBufferError } = await supabase
          .from("form_buffer")
          .delete()
          .eq("user_id", user_id)
          .eq("formType", "MATRIMONY");

        if (formBufferError) throw formBufferError;

        await sendDescisionMail({
          descision: false,
          formType: formType ?? "",
          to: to ?? "",
        });

        return {
          message: "Applicant rejected",
        };
      } catch (err) {
        console.log(`Error while deleting matrimony buffer data : ${err}`);
      }
    }),

  verifyMatrimonyApplicant: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;

        const { data: fetchedData, error: fetchError } = await supabase
          .from("form_buffer")
          .select("*")
          .eq("user_id", user_id)
          .eq("formType", "MATRIMONY")
          .eq("Status", "PENDING");

        if (fetchError) throw fetchError;

        if (fetchedData.length > 0) {
          return {
            user_verification: true,
            user_matData: fetchedData,
          };
        } else {
          return {
            user_verification: false,
            user_matData: null,
          };
        }
      } catch (err) {}
    }),

  deleteMatrimonyFormBufferData: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: DeleteResponseData, error: DeleteBufferError } =
          await supabase.from("form_buffer").delete().eq("user_id", user_id);

        if (DeleteBufferError)
          throw new Error(`Buffer Deletion Error: ${DeleteBufferError}`);

        return DeleteResponseData;
      } catch (err) {
        console.log(err);
      }
    }),
});

export default formBufferData;
