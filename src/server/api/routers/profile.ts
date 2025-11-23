import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import supabase from "~/lib/supabase/client";

const profileRouter = createTRPCRouter({
  // Getting cumulative profile data for a user
  getProfileDetails: publicProcedure
    .input(Yup.object({ user_id: Yup.string().required() }))
    .mutation(async ({ input }) => {
      const { user_id } = input;

      if (!user_id) throw new TRPCClientError("User ID is required");
      // Query for all user DATA
      const { data, error } = await supabase
        .from("general_accounts")
        .select(
          `
          email_id,
          account_name,
          first_name,
          last_name,
          membership_id,
          application_s3_meta (
            s3_key,
            file_type,
            file_name,
            content_type
          ),
          form_buffer (
            formType,
            submission,
            isMember
          )
        `
        )
        .eq("id", user_id)
        .single(); // expects only one row
      if (error) throw new TRPCClientError(error.message);
      return data;
    }),
});

export default profileRouter;
