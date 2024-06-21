import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";

const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(Yup.object({ email: Yup.string(), password: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
        const { data: FetchedUser, error: LoginError } = await supabase
          .from("admin_accounts")
          .select("*")
          .eq("admin_id", email)
          .eq("admin_password", password);

        if (LoginError) throw new Error("Error during login");

        if (FetchedUser.length > 0) {
          return {
            login: true,
            message: "",
            redirect: "/admin",
          };
        } else {
          return {
            login: false,
            message: "Invalid credentials or Account doesn't exist",
            redirect: "",
          };
        }
      } catch (err) {}
    }),
});

export default adminRouter;
