/* eslint-disable */
import * as Yup from "yup";
import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";
import { TRPCClientError } from "@trpc/client";
import { sendAdminEntryMail } from "~/server/mail";

const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(Yup.object({ email: Yup.string(), password: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
        const { data: FetchedAdmin, error: LoginError } = await supabase
          .from("admin_accounts")
          .select("*")
          .eq("admin_email", email);

        if (LoginError) throw new Error("Error during login");

        if (FetchedAdmin.length > 0) {
          const isPasswordValid = await bcrypt.compare(
            password ?? "",
            FetchedAdmin[0].admin_password
          );
          if (isPasswordValid) {
            return {
              loginStatus: true,
              message: "",
              redirect: "/admin",
              admin: FetchedAdmin[0],
            };
          } else {
            return {
              loginStatus: false,
              message: "Invalid credentials",
              redirect: "",
              admin: null,
            };
          }
        } else {
          return {
            loginStatus: false,
            message: "Account doesn't exist",
            redirect: "",
            admin: null,
          };
        }
      } catch (err) {}
    }),

  addAdmin: publicProcedure
    .input(
      Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        username: Yup.string().required(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email, password, username } = input;

        // Check if the email already exists
        const { data: existingAdmin, error: fetchError } = await supabase
          .from("admin_accounts")
          .select("*")
          .eq("admin_email", email);

        if (fetchError) throw new Error("Error checking existing admin");

        if (existingAdmin.length > 0)
          return {
            success: false,
            message: "Email ID already associated with an admin account",
          };

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add new admin with hashed password
        const { data, error } = await supabase.from("admin_accounts").insert([
          {
            admin_email: email,
            admin_password: hashedPassword,
            admin_username: username,
          },
        ]);

        await sendAdminEntryMail({
          to: email,
          password: password,
          username: username,
        });

        if (error) {
          throw new TRPCClientError("Error adding admin account");
        }

        return {
          success: true,
          message: "Admin account created successfully",
        };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          message: `An error occurred while adding the admin`,
        };
      }
    }),
});

export default adminRouter;
