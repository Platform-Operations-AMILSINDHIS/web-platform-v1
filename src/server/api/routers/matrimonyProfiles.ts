import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

import * as Yup from "yup";

const matrimonyProfiles = createTRPCRouter({
  verifyIfApproved: publicProcedure
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

  login: publicProcedure
    .input(Yup.object({ matrimony_id: Yup.string(), user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { matrimony_id, user_id } = input;

        const { data: loggedInProfile, error: ErrorInLoggingIn } =
          await supabase
            .from("matrimony_profiles")
            .select("*")
            .eq("matrimony_id", matrimony_id)
            .eq("user_id", user_id);

        if (ErrorInLoggingIn) throw ErrorInLoggingIn;

        if (loggedInProfile.length > 0) {
          return {
            loggedIn: true,
            message: "",
          };
        } else {
          return {
            loggedIn: false,
            message: "Invalid credentials or Account does not exist",
          };
        }
      } catch (err) {
        console.log(err);
      }
    }),

  fetchProfiles: publicProcedure
    .input(Yup.object({ matrimony_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { matrimony_id } = input;

        const { data: ProfilesData, error: ProfilesFetchError } = await supabase
          .from("matrimony_profiles")
          .select("*")
          .not("matrimony_id", "eq", matrimony_id);

        if (ProfilesFetchError) throw ProfilesFetchError;

        return {
          data: ProfilesData,
        };
      } catch (err) {
        console.log(err);
      }
    }),
});

export default matrimonyProfiles;
