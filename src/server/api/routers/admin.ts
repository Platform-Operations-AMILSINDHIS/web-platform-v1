/* eslint-disable */
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import supabase from "~/pages/api/auth/supabase";
import { TRPCError } from "@trpc/server";
import { sendAdminEntryMail } from "~/server/mail";

const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(Yup.object({ email: Yup.string().required(), password: Yup.string().required() }))
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
        const { data: FetchedAdmin, error: LoginError } = await supabase
          .from("admin_accounts")
          .select("*")
          .eq("admin_email", email);

        if (LoginError) {
          console.error("Database error during admin login:", LoginError);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Database error during login",
          });
        }

        if (FetchedAdmin && FetchedAdmin.length > 0) {
          const isPasswordValid = await bcrypt.compare(
            password,
            FetchedAdmin[0].admin_password
          );
          if (isPasswordValid) {
            return {
              loginStatus: true,
              message: "Login successful",
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
      } catch (err) {
        console.error("Admin Login Error:", err);
        if (err instanceof TRPCError) throw err;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err instanceof Error ? err.message : "An unexpected error occurred",
        });
      }
    }),

  forgotPasswordAdmin: publicProcedure
    .input(
      Yup.object({
        email: Yup.string().required(),
        new_password: Yup.string().required(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email, new_password } = input;
        const hashed_new_password = await bcrypt.hash(new_password, 10);

        const { data: UpdateAdminPwdData, error: ErrorUpdateAdminPwd } =
          await supabase
            .from("admin_accounts")
            .update({ admin_password: hashed_new_password })
            .eq("admin_email", email);
        if (ErrorUpdateAdminPwd) {
          console.error("Error updating admin password:", ErrorUpdateAdminPwd);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error while updating password",
          });
        }

        return {
          success: true,
          message: `Password updated for ${email}. Please sign in again.`,
        };
      } catch (err) {
        console.error("Forgot Password Admin Error:", err);
        if (err instanceof TRPCError) throw err;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err instanceof Error ? err.message : "An unexpected error occurred",
        });
      }
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
          console.error("Error adding admin account:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error adding admin account",
          });
        }

        return {
          success: true,
          message: "Admin account created successfully",
        };
      } catch (err) {
        console.error("Add Admin Error:", err);
        if (err instanceof TRPCError) throw err;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err instanceof Error ? err.message : "An unexpected error occurred",
        });
      }
    }),
});

export default adminRouter;
