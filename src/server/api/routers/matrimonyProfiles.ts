import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

import * as Yup from "yup";

const matrimonyProfiles = createTRPCRouter({
  verifyMatID: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: verificationResponse, error: verificationError } =
          await supabase
            .from("matrimony_profiles")
            .select("*")
            .eq("user_id", user_id);

        if (verificationError) throw verificationError;

        if (verificationResponse.length > 0) {
          return {
            status: true,
          };
        } else {
          return {
            status: false,
          };
        }
      } catch (err) {
        console.log(err);
      }
    }),
});

export default matrimonyProfiles;
