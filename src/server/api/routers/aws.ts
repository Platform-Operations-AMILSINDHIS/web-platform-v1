// Router for aws resource access + maipulations
import * as Yup from "yup";
import { GetObjectCommand } from "@aws-sdk/client-s3";
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

        const signedURL = getSignedUrl(
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
});

export default awsRouter;
