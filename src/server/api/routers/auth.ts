import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";

const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(Yup.object({ email: Yup.string(), password: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
        const { data: LoginData, error: LoginError } =
          await supabase.auth.signInWithPassword({
            email: email as string,
            password: password as string,
          });

        if (LoginError) throw new Error("Invalid Login Credentials");

        console.log(LoginData);

        const { data: userData, error: fetchError } = await supabase
          .from("general_accounts")
          .select("*")
          .eq("email_id", LoginData.user?.email);

        if (fetchError) throw new Error("Couldn't fetch account details");

        return { userData, message: "signed in :)" };
      } catch (err) {
        console.log(err);
      }
    }),
});

export default authRouter;
