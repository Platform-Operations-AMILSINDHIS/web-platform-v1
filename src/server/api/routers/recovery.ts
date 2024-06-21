import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";
import hasher from "~/utils/hasher";

const recoveryRouter = createTRPCRouter({
  sendRecoveryURL: publicProcedure
    .input(Yup.object({ email: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
        console.log(email);
        const { error: ErrorInRecoverURL } =
          await supabase.auth.resetPasswordForEmail(email ?? "", {
            redirectTo: "http://localhost:3000/recovery",
          });

        if (ErrorInRecoverURL) {
          throw new Error(`Supabase error: ${ErrorInRecoverURL.message}`);
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
    .input(Yup.object({ email: Yup.string(), new_password: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email, new_password } = input;
        const { data, error: ResetPwdError } = await supabase.auth.updateUser({
          email: email,
          password: new_password,
        });
        if (ResetPwdError)
          throw new Error(
            `Supabase user updation error: ${ResetPwdError.message}`
          );

        if (data.user) {
          const hashed_password = await hasher(new_password ?? "");
          const { error: UpdateDBError } = await supabase
            .from("general_accounts")
            .update({ password: hashed_password })
            .eq("email_id", email);

          if (UpdateDBError)
            throw new Error(
              `Supabase user updation error: ${UpdateDBError.message}`
            );
          return {
            message: "Password updated, login again",
            toastType: "success",
          };
        }
      } catch (err) {
        console.log("Error while reseting password", err);
        return {
          message:
            "An error occurred while resetting password. Please try again later.",
          toastType: "error",
        };
      }
    }),
});

export default recoveryRouter;
