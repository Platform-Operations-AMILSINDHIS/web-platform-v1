import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

import * as Yup from "yup";
import { string, z } from "zod";

const formBufferData = createTRPCRouter({
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

      return formMembershipBufferData; // Return the fetched data
    } catch (error: any) {
      // Handle errors here
      console.error(
        "Error fetching membership form buffer data:",
        error.message
      );
      throw new Error("Failed to fetch form buffer data");
    }
  }),

  fetchMatrimonyBuffer: publicProcedure.query(async () => {
    try {
      const {
        data: formMembershipBufferData,
        error: formMembershipBufferDataError,
      } = await supabase
        .from("form_buffer")
        .select("*")
        .in("formType", ["MATRIMONY"]);

      if (formMembershipBufferDataError) throw formMembershipBufferDataError;

      return formMembershipBufferData; // Return the fetched data
    } catch (error: any) {
      // Handle errors here
      console.error(
        "Error fetching membership form buffer data:",
        error.message
      );
      throw new Error("Failed to fetch form buffer data");
    }
  }),

  fetchUserMembershipSubmission: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: userFormSubmission, error: fetchSubmissionError } =
          await supabase
            .from("form_buffer")
            .select("submission")
            .eq("user_id", user_id);

        if (fetchSubmissionError) throw fetchSubmissionError;

        return {
          DB_submission_response: userFormSubmission,
        };
      } catch (err) {
        console.log(err);
      }
    }),
});

export default formBufferData;
