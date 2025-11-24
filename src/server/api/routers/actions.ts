/* eslint-disable */
import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as Yup from "yup";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { userS3 } from "~/lib/aws/s3";

const actions = createTRPCRouter({
  generateMembershipID: publicProcedure
    .input(Yup.object({ formType: Yup.string().required() }))
    .mutation(async ({ input }) => {
      const { formType } = input;
      const prefix = formType.toUpperCase() + "#";

      try {
        // Fetch all unique IDs
        const { data, error } = await supabase
          .from("general_accounts")
          .select("membership_id");

        if (error) throw error;

        // Filter IDs with matching prefix
        const matchingIds = data?.filter((item) => {
          const membership_id = item.membership_id;
          return membership_id && membership_id.indexOf(prefix) === 0;
        });

        // Extract sequence numbers and find the maximum
        const maxSequenceNumber = matchingIds.reduce((max, item) => {
          const membership_id = item.membership_id;
          const numberPart = parseInt(
            membership_id.substring(prefix.length),
            10
          );
          return numberPart > max ? numberPart : max;
        }, 0);

        // Generate next sequence number
        const suffix = (maxSequenceNumber + 1).toString().padStart(4, "0");

        return prefix + suffix;
      } catch (err) {
        console.error("Error generating membership ID:", err);
        throw err; // Re-throw for handling at the call site
      }
    }),

  generateMatrimonyID: publicProcedure.mutation(async () => {
    try {
      const prefix = "MAT#";
      // Fetch all unique IDs
      const { data, error } = await supabase
        .from("matrimony_profiles")
        .select("matrimony_id");

      if (error) throw error;

      // Filter IDs with matching prefix
      const matchingIds = data?.filter((item) => {
        const matrimony_id = item.matrimony_id;
        return matrimony_id && matrimony_id.indexOf(prefix) === 0;
      });

      // Extract sequence numbers and find the maximum
      const maxSequenceNumber = matchingIds.reduce((max, item) => {
        const matrimony_id = item.matrimony_id;
        const numberPart = parseInt(matrimony_id.substring(prefix.length), 10);
        return numberPart > max ? numberPart : max;
      }, 0);

      // Generate next sequence number
      const suffix = (maxSequenceNumber + 1).toString().padStart(4, "0");

      return prefix + suffix;
    } catch (err) {
      console.error("Error generating matrimony ID:", err);
      throw err; // Re-throw for handling at the call site
    }
  }),

  saveProfilePicture: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string().uuid().required(),
        s3_key: Yup.string().required(),
        file_type: Yup.string()
          .oneOf(["profile_image", "matrimony_image", "document"])
          .required(),
        file_name: Yup.string().required(),
        content_type: Yup.string().required(),
        file_size: Yup.number().positive().required(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const {
          user_id,
          s3_key,
          file_type,
          file_name,
          content_type,
          file_size,
        } = input;

        // Check for existing row for this file type
        const { data: existingData, error: fetchError } = await supabase
          .from("application_s3_meta")
          .select("*")
          .eq("user_id", user_id)
          .eq("file_type", file_type)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          // PGRST116 = no rows returned, which is fine
          console.error("Error validating S3 File meta:", fetchError);
          throw new Error("Error while validating S3 File meta");
        }

        // If record exists, delete old S3 file and update row
        if (existingData) {
          const oldS3Key = existingData.s3_key;

          // Delete old file from S3 (only if it's different from new one)
          if (oldS3Key !== s3_key) {
            try {
              await userS3.send(
                new DeleteObjectCommand({
                  Bucket: "kap-application-images",
                  Key: oldS3Key,
                })
              );
              console.log(`Deleted old S3 file: ${oldS3Key}`);
            } catch (s3Error) {
              console.error("Error deleting old S3 file:", s3Error);
              // Continue anyway - don't fail the whole operation
            }
          }

          // Update existing record
          const { data: updateData, error: updateError } = await supabase
            .from("application_s3_meta")
            .update({
              s3_key,
              file_name,
              content_type,
              file_size,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingData.id)
            .select()
            .single();

          if (updateError) {
            console.error("Error updating S3 metadata:", updateError);
            throw new Error("Failed to update file metadata");
          }

          return { success: true, data: updateData, action: "updated" };
        }

        // No existing record - insert new one
        const { data: insertData, error: insertError } = await supabase
          .from("application_s3_meta")
          .insert({
            user_id,
            s3_key,
            file_type,
            file_name,
            content_type,
            file_size,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Error saving S3 metadata:", insertError);
          throw new Error("Failed to save file metadata");
        }

        return { success: true, data: insertData, action: "created" };
      } catch (err) {
        console.error("Error in saveProfilePicture:", err);
        throw new Error("Failed to save profile picture metadata");
      }
    }),
});

export default actions;
