import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import supabase from "~/lib/supabase/client";

const profileRouter = createTRPCRouter({
  // Getting cumulative profile data for a user
  getProfileDetails: publicProcedure
    .input(Yup.object({ user_id: Yup.string().required() }))
    .mutation(async ({ input }) => {
      const { user_id } = input;

      if (!user_id) throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User ID is required",
      });
      // Query for all user DATA
      const { data, error } = await supabase
        .from("general_accounts")
        .select(
          `
          email_id,
          account_name,
          first_name,
          last_name,
          gender,
          date_of_birth,
          membership_id,
          created_at,
          application_s3_meta (
            s3_key,
            file_type,
            file_name,
            content_type
          ),
          form_buffer (
            formType,
            submission,
            isMember,
            status,
            created_at
          )
        `
        )
        .eq("id", user_id)
        .single(); // expects only one row
      if (error) {
        console.error("Error fetching profile details:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      return data;
    }),

  // Update general_accounts fields — email is explicitly excluded for safety
  updateProfile: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string().required("User ID is required"),
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        account_name: Yup.string().required("Account name is required"),
        gender: Yup.string().required("Gender is required"),
        date_of_birth: Yup.string()
          .required("Date of birth is required"),
      })
    )
    .mutation(async ({ input }) => {
      const { user_id, first_name, last_name, account_name, gender, date_of_birth } =
        input;

      const { error } = await supabase
        .from("general_accounts")
        .update({
          first_name,
          last_name,
          account_name,
          gender,
          date_of_birth,
        })
        .eq("id", user_id);

      if (error) {
        console.error("Error updating profile:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      return { success: true };
    }),
});

export default profileRouter;
