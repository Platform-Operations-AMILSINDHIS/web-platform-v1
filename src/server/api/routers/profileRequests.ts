/* eslint-disable */
import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as Yup from "yup";
import {
  sendDeclineRequestMail,
  sendMatrimonyProfileMail,
} from "~/server/mail";
import { matrimonyFormValuesSchema } from "~/utils/schemas";

const profilRequests = createTRPCRouter({
  addRequest: publicProcedure
    .input(
      Yup.object({
        requestee_name: Yup.string(),
        requestee_id: Yup.string(),
        requested_name: Yup.string(),
        requested_id: Yup.string(),
        email_id: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const {
          requested_id,
          requested_name,
          requestee_id,
          requestee_name,
          email_id,
        } = input;

        const { data, error } = await supabase.from("profile_requests").insert([
          {
            requested_id: requested_id,
            requested_name: requested_name,
            requestee_name: requestee_name,
            requestee_id: requestee_id,
            email_id: email_id,
          },
        ]);

        if (error) throw error;

        return { status: true };
      } catch (err) {
        console.log(err);
      }
    }),

  fetchAllRequests: publicProcedure.query(async () => {
    try {
      const { data: RequestData, error: FetchError } = await supabase
        .from("profile_requests")
        .select("*");

      if (FetchError) throw FetchError;

      return {
        requests: RequestData,
      };
    } catch (err) {
      console.log(err);
    }
  }),

  fetchProfileDetails: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { user_id } = input;
        if (user_id && user_id.length !== 0) {
          const { data: ProfileFetchData, error: ProfileFetchError } =
            await supabase
              .from("general_accounts")
              .select(
                "account_name,first_name,last_name,age,gender,email_id,created_at,membership_id, KAP_member,YAC_member"
              )
              .eq("id", user_id);

          if (ProfileFetchError) throw new Error(ProfileFetchError.details);

          return {
            profileData: ProfileFetchData,
          };
        } else {
          throw new Error("Invalid User Id provided");
        }
      } catch (err) {
        console.log(err);
      }
    }),

  acceptRequest: publicProcedure
    .input(
      Yup.object({
        id: Yup.number(),
        requested_id: Yup.string(),
        requested_name: Yup.string(),
        email_id: Yup.string(),
        submission: matrimonyFormValuesSchema,
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { id, submission, email_id, requested_id, requested_name } =
          input;
        const { error: rowTerminationError } = await supabase
          .from("profile_requests")
          .delete()
          .eq("id", id);

        if (rowTerminationError) throw rowTerminationError;

        await sendMatrimonyProfileMail(
          email_id ?? "",
          submission as any,
          requested_name ?? "",
          requested_id ?? ""
        );

        return {
          message: `Profile Request for ${requested_name},${requested_id} Accepted`,
          toastType: "success",
        };
      } catch (err) {
        console.log("Error while accepting or declining request", err);
        throw new Error("Unable to process request");
      }
    }),

  declineRequest: publicProcedure
    .input(
      Yup.object({
        id: Yup.number(),
        requested_id: Yup.string(),
        requested_name: Yup.string(),
        email_id: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { requested_id, requested_name, email_id, id } = input;
        const { error: rowTerminationError } = await supabase
          .from("profile_requests")
          .delete()
          .eq("id", id);

        if (rowTerminationError) throw rowTerminationError;

        await sendDeclineRequestMail({
          to: email_id ?? "",
          requested_MatID: requested_id ?? "",
          requested_name: requested_name ?? "",
        });

        return {
          message: `Profile Request for ${requested_name},${requested_id} Declined`,
          toastType: "success",
        };
      } catch (err) {
        console.log("Err while processing request", err);
        throw new Error("Error while decining request");
      }
    }),

  DeclineAllRequests: publicProcedure.mutation(async () => {
    try {
      const { error: TerminationError } = await supabase
        .from("profile_requests")
        .delete();

      if (TerminationError) throw TerminationError;
    } catch (err) {
      console.log("Error while accepting all requests", err);
      throw new Error("Unable to process request");
    }
  }),
});

export default profilRequests;
