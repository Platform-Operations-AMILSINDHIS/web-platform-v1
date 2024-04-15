import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
});

export default formBufferData;
