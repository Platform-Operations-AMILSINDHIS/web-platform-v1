import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";
import { TRPCError } from "@trpc/server";

const recoveryRouter = createTRPCRouter({
  sendRecoveryURL: publicProcedure
    .input(Yup.object({ email: Yup.string().email().min(1) }))
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
        console.log(email);
        const { error: ErrorInRecoverURL } =
          await supabase.auth.resetPasswordForEmail(email ?? "", {
            redirectTo: "https://amilsindhis.org/recovery",
          });

        if (ErrorInRecoverURL) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `${ErrorInRecoverURL.message}`,
          });
        }

        return {
          message:
            "A recovery URL has been sent to your email, Expires in one minute",
          toastType: "success",
        };
      } catch (err) {
        console.log("Error while sending recovery URL", err);
        return {
          message:
            "An error occurred while sending the recovery URL. Please try again later.",
          toastType: "error",
        };
      }
    }),

  updateUserPassword: publicProcedure
    .input(
      Yup.object({
        email: Yup.string(),
        new_password: Yup.string(),
        access_token: Yup.string(),
        refresh_token: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { new_password, access_token, refresh_token } = input;
        // re authenticate user to create an auth session to allow password reset
        const { error: setSessionError } = await supabase.auth.setSession({
          access_token: access_token!,
          refresh_token: refresh_token!,
        });

        if (setSessionError)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Error when creating session try sending another reset link to your email",
          });

        const { error: ResetPwdError } = await supabase.auth.updateUser({
          password: new_password,
        });
        if (ResetPwdError)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `${ResetPwdError.message}`,
          });

        return {
          message: "Password updated, login to your account again",
          toastType: "success",
        };
      } catch (err) {
        console.log("Error while reseting password", err);
        return {
          message: "Failed to update password",
          toastType: "error",
        };
      }
    }),
});

export default recoveryRouter;
