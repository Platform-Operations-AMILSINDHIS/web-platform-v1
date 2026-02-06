/* eslint-disable */
import * as Yup from "yup";
import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";
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

  fetchAllRequests: publicProcedure
    .input(
      Yup.object({
        email_id: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email_id } = input;
        const { data: RequestData, error: FetchError } = await supabase
          .from("profile_requests")
          .select("*")
          .eq("email_id", email_id);

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
                `
                  id,
                  account_name,
                  first_name,
                  last_name,
                  age,
                  gender,
                  email_id,
                  created_at,
                  membership_id,
                  KAP_member,
                  YAC_member,

                  application_s3_meta (
                    s3_key,
                    file_type,
                    file_name,
                    content_type,
                    file_size
                  )
                `
              )
              .eq("id", user_id)
              .eq("application_s3_meta.file_type", "profile_image")
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

  fetchAllRequestsWithAvatars: publicProcedure
    .input(
      Yup.object({
        email_id: Yup.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email_id } = input;

        // Fetch all profile requests
        const { data: RequestData, error: FetchError } = await supabase
          .from("profile_requests")
          .select("*")
          .eq("email_id", email_id);

        if (FetchError) throw FetchError;

        if (!RequestData || RequestData.length === 0) {
          return { requests: [] };
        }

        // Collect all unique matrimony IDs
        const matrimonyIds = new Set<string>();
        RequestData.forEach((req) => {
          if (req.requestee_id) matrimonyIds.add(req.requestee_id);
          if (req.requested_id) matrimonyIds.add(req.requested_id);
        });

        // Fetch matrimony_profiles to map matrimony_id -> user_id
        const { data: matrimonyProfiles, error: matrimonyError } =
          await supabase
            .from("matrimony_profiles")
            .select("matrimony_id, user_id")
            .in("matrimony_id", Array.from(matrimonyIds));

        if (matrimonyError) throw matrimonyError;

        // Create matrimony_id -> user_id map
        const matrimonyIdToUserId = new Map<string, string>();
        matrimonyProfiles?.forEach((profile) => {
          matrimonyIdToUserId.set(profile.matrimony_id, profile.user_id);
        });

        // Collect all user_ids
        const userIds = Array.from(
          new Set(matrimonyProfiles?.map((p) => p.user_id) || [])
        );

        // Fetch profile images for all users
        const { data: s3MetaData, error: s3Error } = await supabase
          .from("application_s3_meta")
          .select("user_id, s3_key, file_type")
          .in("user_id", userIds)
          .eq("file_type", "profile_image");

        if (s3Error) throw s3Error;

        // Create user_id -> s3_key map
        const userIdToS3Key = new Map<string, string>();
        s3MetaData?.forEach((meta) => {
          userIdToS3Key.set(meta.user_id, meta.s3_key);
        });

        // Enrich request data with avatar s3_keys
        const enrichedRequests = RequestData.map((request) => {
          const requesteeUserId = matrimonyIdToUserId.get(
            request.requestee_id
          );
          const requestedUserId = matrimonyIdToUserId.get(
            request.requested_id
          );

          return {
            ...request,
            requestee_user_id: requesteeUserId || null,
            requested_user_id: requestedUserId || null,
            requestee_profile_s3_key: requesteeUserId
              ? userIdToS3Key.get(requesteeUserId) || null
              : null,
            requested_profile_s3_key: requestedUserId
              ? userIdToS3Key.get(requestedUserId) || null
              : null,
          };
        });

        return {
          requests: enrichedRequests,
        };
      } catch (err) {
        console.log("Error fetching requests with avatars:", err);
        throw new Error("Failed to fetch profile requests with avatars");
      }
    }),
});

export default profilRequests;
