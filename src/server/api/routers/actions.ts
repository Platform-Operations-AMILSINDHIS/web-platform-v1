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

        // Special handling for matrimony_image (supports up to 3 images)
        if (file_type === "matrimony_image") {
          // Verify user has approved matrimony profile
          const { data: matrimonyProfile, error: matrimonyError } =
            await supabase
              .from("matrimony_profiles")
              .select("*")
              .eq("user_id", user_id)
              .single();

          if (matrimonyError || !matrimonyProfile) {
            throw new Error(
              "Only approved matrimony applicants can upload matrimony images"
            );
          }

          // Check for existing row with this specific s3_key
          const { data: existingData, error: fetchError } = await supabase
            .from("application_s3_meta")
            .select("*")
            .eq("user_id", user_id)
            .eq("file_type", file_type)
            .eq("s3_key", s3_key)
            .maybeSingle();

          if (fetchError) {
            console.error("Error validating S3 File meta:", fetchError);
            throw new Error("Error while validating S3 File meta");
          }

          // If record exists, update it
          if (existingData) {
            const { data: updateData, error: updateError } = await supabase
              .from("application_s3_meta")
              .update({
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

          // Count existing matrimony images for this user
          const { data: existingImages, error: countError } = await supabase
            .from("application_s3_meta")
            .select("id")
            .eq("user_id", user_id)
            .eq("file_type", "matrimony_image");

          if (countError) {
            throw new Error("Failed to check existing matrimony images");
          }

          if (existingImages && existingImages.length >= 3) {
            throw new Error(
              "Maximum of 3 matrimony images allowed. Please delete an existing image first."
            );
          }

          // Insert new matrimony image
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
        }

        // Original logic for profile_image and document (single row per type)
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

  deleteMatrimonyImage: publicProcedure
    .input(
      Yup.object({
        user_id: Yup.string().uuid().required(),
        s3_key: Yup.string().required(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { user_id, s3_key } = input;

        // Verify user has approved matrimony profile
        const { data: matrimonyProfile, error: matrimonyError } =
          await supabase
            .from("matrimony_profiles")
            .select("*")
            .eq("user_id", user_id)
            .single();

        if (matrimonyError || !matrimonyProfile) {
          throw new Error(
            "Only approved matrimony applicants can delete matrimony images"
          );
        }

        // Find the metadata row
        const { data: metaData, error: fetchError } = await supabase
          .from("application_s3_meta")
          .select("*")
          .eq("user_id", user_id)
          .eq("s3_key", s3_key)
          .eq("file_type", "matrimony_image")
          .single();

        if (fetchError || !metaData) {
          throw new Error("Matrimony image not found");
        }

        // Delete from S3
        try {
          await userS3.send(
            new DeleteObjectCommand({
              Bucket: "kap-application-images",
              Key: s3_key,
            })
          );
          console.log(`Deleted S3 file: ${s3_key}`);
        } catch (s3Error) {
          console.error("Error deleting S3 file:", s3Error);
          // Continue anyway - we still want to delete the metadata
        }

        // Delete metadata row
        const { error: deleteError } = await supabase
          .from("application_s3_meta")
          .delete()
          .eq("id", metaData.id);

        if (deleteError) {
          throw new Error("Failed to delete image metadata");
        }

        return { success: true, message: "Matrimony image deleted successfully" };
      } catch (err) {
        console.error("Error in deleteMatrimonyImage:", err);
        throw new Error(
          err instanceof Error ? err.message : "Failed to delete matrimony image"
        );
      }
    }),
});

export default actions;
