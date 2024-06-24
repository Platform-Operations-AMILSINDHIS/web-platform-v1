/* eslint-disable */
import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";

const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(Yup.object({ email: Yup.string(), password: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
        const { data: FetchedAdmin, error: LoginError } = await supabase
          .from("admin_accounts")
          .select("*")
          .eq("admin_email", email)
          .eq("admin_password", password);

        if (LoginError) throw new Error("Error during login");

        if (FetchedAdmin.length > 0) {
          return {
            loginStatus: true,
            message: "",
            redirect: "/admin",
            admin: FetchedAdmin[0],
          };
        } else {
          return {
            loginStatus: false,
            message: "Invalid credentials or Account doesn't exist",
            redirect: "",
            admin: null,
          };
        }
      } catch (err) {}
    }),
});

export default adminRouter;
