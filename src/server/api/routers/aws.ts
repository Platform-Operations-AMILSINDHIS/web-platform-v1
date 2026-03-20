// Router for aws resource access + maipulations
import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";

import {
  GetObjectCommand,
  PutObjectAclCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { adminS3, userS3 } from "~/lib/aws/s3";

import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "~/lib/aws/ses";

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

  sendSESEmail: publicProcedure
    .input(
      Yup.object({
        source: Yup.string().required("Source email is required"), // controls sub domain, like yac / kap / matrimony and all that
        to: Yup.string()
          .email("Must be a valid email")
          .required("Recipient email is required"),
        subject: Yup.string().required("Subject is required"),
        body: Yup.string().required("Body is required"),
        html: Yup.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { body, source, subject, to, html } = input;
      try {
        // declaring SES command
        const command = new SendEmailCommand({
          Source: `${source}@amilsindhis.org`, // must match your verified SES domain
          Destination: {
            ToAddresses: [to],
          },
          Message: {
            Subject: {
              Data: subject,
              Charset: "UTF-8",
            },
            Body: {
              Text: {
                Data: body,
                Charset: "UTF-8",
              },
              Html: html
                ? {
                    Data: html,
                    Charset: "UTF-8",
                  }
                : undefined,
            },
          },
        });
        return sesClient.send(command);
      } catch (err) {
        console.log("Error Sending Email through AWS SES", err);
        throw new Error(
          `Something went wrong while sending the email, inform user for ${to} Manually`
        );
      }
    }),
});

export default awsRouter;
