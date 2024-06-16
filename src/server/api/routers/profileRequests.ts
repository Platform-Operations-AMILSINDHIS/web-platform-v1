import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as Yup from "yup";

const profilRequests = createTRPCRouter({
  addRequest: publicProcedure
    .input(
      Yup.object({
        requestee_name: Yup.string(),
        requestee_id: Yup.string(),
        requested_name: Yup.string(),
        requested_id: Yup.string(),
        email_id: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const {
          requested_id,
          requested_name,
          requestee_id,
          requestee_name,
          email_id,
        } = input;

        const { data, error } = await supabase.from("profile_requests").insert([
          {
            requested_id: requested_id,
            requested_name: requested_name,
            requestee_name: requestee_name,
            requestee_id: requestee_id,
            email_id: email_id,
          },
        ]);

        if (error) throw error;

        return { status: true };
      } catch (err) {
        console.log(err);
      }
    }),

  fetchAllRequests: publicProcedure.query(async () => {
    try {
      const { data: RequestData, error: FetchError } = await supabase
        .from("profile_requests")
        .select("*");

      if (FetchError) throw FetchError;

      return {
        requests: RequestData,
      };
    } catch (err) {
      console.log(err);
    }
  }),

  acceptRequest: publicProcedure
    .input(Yup.object({ id: Yup.number() }))
    .mutation(async ({ input }) => {
      try {
        const { id } = input;
        const { error: rowTerminationError } = await supabase
          .from("profile_requests")
          .delete()
          .eq("id", id);

        if (rowTerminationError) throw rowTerminationError;
      } catch (err) {
        console.log("Error while accepting or declining request", err);
        throw new Error("Unable to process request");
      }
    }),

  acceptAllRequests: publicProcedure.mutation(async () => {
    try {
      const { error: TerminationError } = await supabase
        .from("profile_requests")
        .delete();

      if (TerminationError) throw TerminationError;
    } catch (err) {
      console.log("Error while accepting all requests", err);
      throw new Error("Unable to process request");
    }
  }),
});

export default profilRequests;
