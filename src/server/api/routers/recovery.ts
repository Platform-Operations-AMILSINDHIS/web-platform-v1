import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";

const recoveryRouter = createTRPCRouter({
  sendRecoveryURL: publicProcedure
    .input(Yup.object({ email: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
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
});

export default recoveryRouter;
