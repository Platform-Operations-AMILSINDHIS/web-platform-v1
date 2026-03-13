/* eslint-disable */
import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

import * as Yup from "yup";
import { sendDescisionMail, sendMatrimonyDescisionMail } from "~/server/mail";
import { TRPCError } from "@trpc/server";

const formBufferData = createTRPCRouter({
  fetchAllBuffer: publicProcedure.query(async () => {
    try {
      const { data: fetchedFormBufferData, error: fetchError } = await supabase
        .from("form_buffer")
        .select("*");

      if (fetchError) {
        console.error("Error fetching all form buffer data:", fetchError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch form buffer data",
        });
      }

      return {
        form_buffer: fetchedFormBufferData,
      };
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      console.error("Unexpected error in fetchAllBuffer:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      });
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

      if (formMembershipBufferDataError) {
        console.error("Error fetching membership buffer data:", formMembershipBufferDataError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch membership form buffer data",
        });
      }

      return {
        membership_formbuffer: formMembershipBufferData,
      }; // Return the fetched data
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      console.error("Unexpected error in fetchMembershipBuffer:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      });
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

      if (formMatrimonyBufferDataError) {
        console.error("Error fetching matrimony buffer data:", formMatrimonyBufferDataError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch matrimony form buffer data",
        });
      }

      return {
        matrimony_formbuffer: formMatrimonyBufferData,
      }; // Return the fetched data
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      console.error("Unexpected error in fetchMatrimonyBuffer:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      });
    }
  }),

  fetchApprovedMatrimonyApplicants: publicProcedure.query(async () => {
    // First, get the approved matrimony applicants
    const {
      data: approvedMatrimonyApplicants,
      error: approvedMatrimonyApplicantsFetchError,
    } = await supabase
      .from("form_buffer")
      .select("*")
      .eq("formType", "MATRIMONY")
      .eq("status", "APPROVED");

    if (approvedMatrimonyApplicantsFetchError) {
      console.error(
        `Error while fetching approved matrimony applicants:`,
        approvedMatrimonyApplicantsFetchError
      );
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch approved matrimony applicants",
        cause: approvedMatrimonyApplicantsFetchError,
      });
    }

    if (
      !approvedMatrimonyApplicants ||
      approvedMatrimonyApplicants.length === 0
    ) {
      return [];
    }

    // Get all user_ids
    const userIds = approvedMatrimonyApplicants.map((app) => app.user_id);

    // Fetch associated S3 metadata
    const { data: s3MetaData, error: s3MetaError } = await supabase
      .from("application_s3_meta")
      .select("*")
      .in("user_id", userIds);

    if (s3MetaError) {
      console.error("Error fetching S3 metadata:", s3MetaError);
      // Still return the applicants without S3 data
      return approvedMatrimonyApplicants.map((app) => ({
        ...app,
        application_s3_meta: [],
      }));
    }

    // Combine the data
    const combinedData = approvedMatrimonyApplicants.map((applicant) => ({
      ...applicant,
      application_s3_meta:
        s3MetaData?.filter((meta) => meta.user_id === applicant.user_id) ?? [],
    }));

    return combinedData;
  }),

  fetchUserSubmission: publicProcedure
    .input(Yup.object({ user_id: Yup.string(), formType: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id, formType } = input;
        
        if (!user_id || user_id === "") {
          return { submission: null };
        }

        const { data: userFormSubmission, error: fetchSubmissionError } =
          await supabase
            .from("form_buffer")
            .select("submission")
            .eq("user_id", user_id)
            .eq("formType", formType);

        if (fetchSubmissionError) {
          console.error("Error fetching user submission:", fetchSubmissionError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch user submission",
          });
        }

        return {
          submission: userFormSubmission[0]?.submission,
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in fetchUserSubmission:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
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

        if (fetchSubmissionError) {
          console.error("Error fetching user matrimony submission:", fetchSubmissionError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch user matrimony submission",
          });
        }

        return {
          DB_submission_response: userFormSubmission,
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in fetchUserMatrimonySubmission:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),

  rejectUserApplication: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string(),
        formType: Yup.string(),
        to: Yup.string(),
        isPrevMember: Yup.boolean().required(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { user_id, formType, to, isPrevMember } = input;
        const { data: _, error: formBufferError } = await supabase
          .from("form_buffer")
          .update({ status: "REJECTED" })
          .eq("user_id", user_id)
          .eq("formType", formType);

        if (formBufferError) {
          console.error("Error rejecting user application:", formBufferError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to reject application",
          });
        }

        await sendDescisionMail({
          formType: formType ?? "",
          descision: false,
          to: to ?? "",
          isPrevMember: isPrevMember,
        });

        return {
          status: "Application Rejected",
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in rejectUserApplication:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),

  acceptUserApplication: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string(),
        formType: Yup.string(),
        to: Yup.string(),
        membership_id: Yup.string(),
        isPrevMember: Yup.boolean().required(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { formType, to, user_id, membership_id, isPrevMember } = input;
        const memberProperty = `${formType}_member`;

        const { data, error } = await supabase
          .from("general_accounts")
          .update({ [memberProperty]: true, membership_id: membership_id })
          .eq("id", user_id);

        if (error) {
          console.error("Error updating user membership status:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update user membership status",
          });
        }

        const { data: _, error: formBufferError } = await supabase
          .from("form_buffer")
          .update({ status: "APPROVED" })
          .eq("user_id", user_id)
          .eq("formType", formType);

        if (formBufferError) {
          console.error("Error approving user application in buffer:", formBufferError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update application status",
          });
        }

        await sendDescisionMail({
          membershipID: membership_id as string,
          descision: true,
          formType: formType ?? "",
          to: to ?? "",
          isPrevMember: isPrevMember,
        });

        return {
          server_response: data,
          user_id,
          to,
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in acceptUserApplication:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),

  fetchApplicantDOB: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: applicantDOB, error: ErrorFetchingDOB } = await supabase
          .from("general_accounts")
          .select("date_of_birth")
          .eq("id", user_id);

        if (ErrorFetchingDOB) {
          console.error("Error fetching applicant DOB:", ErrorFetchingDOB);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch applicant DOB",
          });
        }

        return {
          DB_response: applicantDOB,
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in fetchApplicantDOB:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
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
          .eq("user_id", user_id)
          .eq("formType", "MATRIMONY");

        if (formBufferError) {
          console.error("Error approving matrimony application in buffer:", formBufferError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update application status",
          });
        }

        const { error: matrimonyDataUploadError } = await supabase
          .from("matrimony_profiles")
          .insert([{ user_id: user_id, matrimony_id: matrimony_id as string }]);

        if (matrimonyDataUploadError) {
          console.error("Error inserting matrimony profile:", matrimonyDataUploadError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create matrimony profile",
          });
        }

        await sendMatrimonyDescisionMail({
          descision: true,
          to: to as string,
          matrimonyID: matrimony_id as string,
        });

        return {
          status: true,
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in acceptUserMatrimonyApplication:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
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

        if (formBufferError) {
          console.error("Error deleting matrimony application from buffer:", formBufferError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete application from buffer",
          });
        }

        await sendDescisionMail({
          descision: false,
          formType: formType ?? "",
          to: to ?? "",
        });

        return {
          message: "Applicant rejected",
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in rejectUserMatrimonyApplication:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
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
          .eq("status", "PENDING");

        if (fetchError) {
          console.error("Error verifying matrimony applicant:", fetchError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to verify applicant",
          });
        }

        console.log({ fetchedData });
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
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in verifyMatrimonyApplicant:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),

  deleteMatrimonyFormBufferData: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: DeleteResponseData, error: DeleteBufferError } =
          await supabase.from("form_buffer").delete().eq("user_id", user_id);

        if (DeleteBufferError) {
          console.error("Error deleting matrimony form buffer data:", DeleteBufferError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete buffer data",
          });
        }

        return DeleteResponseData;
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Unexpected error in deleteMatrimonyFormBufferData:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
});

export default formBufferData;
