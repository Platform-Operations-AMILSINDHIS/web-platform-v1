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

  deleteProfile: publicProcedure
    .input(Yup.object({ user_id: Yup.string(), matrimony_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { matrimony_id, user_id } = input;
        const { data: ProfileData, error: VerifyError } = await supabase
          .from("matrimony_profiles")
          .select("*")
          .eq("user_id", user_id)
          .eq("matrimony_id", matrimony_id);

        if (VerifyError)
          throw new Error(`Error while Verifying: ${VerifyError}`);

        if (ProfileData.length < 0)
          return { status: true, statusText: "Invalid Mat ID" };

        const { error: WithdrawApplicationError } = await supabase
          .from("matrimony_profiles")
          .delete()
          .eq("user_id", user_id)
          .eq("matrimony_id", matrimony_id);

        if (WithdrawApplicationError)
          throw new Error(
            `Profile Deletion Failed : ${WithdrawApplicationError.message}`
          );

        const { error: DeleteBufferError } = await supabase
          .from("form_buffer")
          .delete()
          .eq("user_id", user_id)
          .eq("formType", "MATRIMONY");

        if (DeleteBufferError)
          throw new Error(
            `Buffer Deletion Failed: ${DeleteBufferError.message}`
          );

        return {
          status: true,
          statusText: "Application Withdrawn",
        };
      } catch (err) {
        console.log("Error while deleting profile", err);
        return {
          status: true,
          statusText: "Something went wrong",
        };
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

        console.log(loggedInProfile);

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

  fetchMatrimonyID: publicProcedure
    .input(Yup.object({ user_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        const { data: fetchIDResponse, error: fetchIDResponseError } =
          await supabase
            .from("matrimony_profiles")
            .select("matrimony_id")
            .eq("user_id", user_id);

        if (fetchIDResponseError) throw fetchIDResponseError;

        if (fetchIDResponse.length > 0) {
          console.log(fetchIDResponse);
          return {
            status: true,
            matrimony_id: fetchIDResponse[0]?.matrimony_id,
            message: "",
          };
        } else {
          return {
            status: false,
            matrimony_id: null,
            message: "Something Went wrong",
          };
        }
      } catch (err) {
        console.log(err);
      }
    }),

  fetchMatrimonyProfile: publicProcedure
    .input(Yup.object({ matrimony_id: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { matrimony_id } = input;
        const { data: matrimonyProfileData, error: FetchError } = await supabase
          .from("matrimony_profiles")
          .select("*")
          .eq("matrimony_id", matrimony_id);

        if (FetchError) throw FetchError;

        return {
          profile_data: matrimonyProfileData,
        };
      } catch (err) {
        console.log(err);
      }
    }),
});

export default matrimonyProfiles;
