// Router for aws resource access + maipulations
import * as Yup from "yup";
import {
  GetObjectCommand,
  PutObjectAclCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { adminS3, userS3 } from "~/lib/aws/s3";
import { createTRPCRouter, publicProcedure } from "../trpc";

const awsRouter = createTRPCRouter({
  getS3ProfilePicture: publicProcedure
    .input(
      Yup.object({
        s3_key: Yup.string().required(),
        is_admin: Yup.boolean().required(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { is_admin, s3_key } = input;
        const activeClient = is_admin ? adminS3 : userS3;

        const signedURL = await getSignedUrl(
          activeClient,
          new GetObjectCommand({
            Bucket: "kap-application-images",
            Key: s3_key,
          }),
          { expiresIn: 60 * 30 }
        );

        // returning signed URL
        return { profilePictureSignedUrl: signedURL };
      } catch (err) {
        console.log("Error generating signed URL:", err);
        throw new Error("Could not generate signed URL");
      }
    }),

  // Upload is strictly for users as of now
  getS3UploadURL: publicProcedure
    .input(
      Yup.object({
        s3_key: Yup.string().required(),
        content_type: Yup.string().required(), // e.g., 'image/jpeg', 'image/png'
        file_size: Yup.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { content_type, s3_key, file_size } = input;

        // Generate signed URL
        const signedURL = await getSignedUrl(
          userS3,
          new PutObjectCommand({
            Bucket: "kap-application-images",
            Key: s3_key,
            ContentType: content_type,
          }),
          { expiresIn: 60 * 10 } // 10 mins  to upload
        );

        return { uploadURL: signedURL };
      } catch (err) {
        console.log("Error generating upload URL:", err);
        throw new Error("Could not generate upload URL");
      }
    }),
});

export default awsRouter;
