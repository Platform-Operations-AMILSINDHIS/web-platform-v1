/* eslint-disable */
import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";
import { TRPCError } from "@trpc/server";

const authRouter = createTRPCRouter({
  login: publicProcedure
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;

        const { data: LoginData, error: LoginError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (LoginError) {
          // Validate and check for not confirmed accounts, RESEND CONFIRM EMAIL
          const { code } = LoginError;
          if (code === "email_not_confirmed") {
            await supabase.auth.resend({
              type: "signup",
              email: email,
            });
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message:
                "You have not confirmed your email, please CHECK YOUR EMAIL ACCOUNT and click the confirmation link",
            });
          }
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid Login Credentials",
          });
        }
        // eslint-disable-next-line no-unsafe-assignment
        const { data: userData, error: fetchError } = await supabase
          .from("general_accounts")
          .select("*")
          .eq("email_id", LoginData.user?.email)
          .single();

        if (fetchError) {
          console.error("Error fetching user data after login:", fetchError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Couldn't fetch account details",
          });
        }
        // eslint-disable-next-line no-unsafe-assignment
        return { userData, message: "signed in :)", LoginData };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        console.error("Auth Login Error:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err instanceof Error ? err.message : "An unexpected error occurred",
        });
      }
    }),
});

export default authRouter;
