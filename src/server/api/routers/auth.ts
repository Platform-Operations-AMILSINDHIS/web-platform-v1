/* eslint-disable */
import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";
import { TRPCError } from "@trpc/server";

const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const { data: LoginData, error: LoginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (LoginError) {
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Couldn't fetch account details",
        });
      }
      // eslint-disable-next-line no-unsafe-assignment
      return { userData, message: "signed in :)", LoginData };
    }),
});

export default authRouter;
