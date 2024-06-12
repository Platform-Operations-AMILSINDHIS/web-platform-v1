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
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { requested_id, requested_name, requestee_id, requestee_name } =
          input;

        const { data, error } = await supabase.from("profile_requests").insert([
          {
            requested_id: requested_id,
            requested_name: requested_name,
            requestee_name: requestee_name,
            requestee_id: requestee_id,
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
});

export default profilRequests;
