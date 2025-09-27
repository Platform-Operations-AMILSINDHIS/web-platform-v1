import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { donationUploaderS3Client } from "~/lib/aws/s3-client";
import { AWS_DONOR_DOCUMENTS_BUCKET_NAME } from "~/lib/aws/env";

const donationRouter = createTRPCRouter({
  uploadDonation: publicProcedure
    .input(
      z.object({
        // Form data
        donorName: z.string().min(1, "Donor name is required"),
        contactNumber: z.string().min(10, "Valid contact number required"),
        email: z.string().email("Valid email required"),
        amount: z.number().positive("Amount must be positive"),
        paymentTransactionId: z.string().min(1, "Transaction ID required"),

        // File data (base64 or buffer)
        panCardFile: z.object({
          data: z.string(), // base64 encoded file data
          fileName: z.string(),
          contentType: z.string(),
        }),
        addressProofFile: z.object({
          data: z.string(), // base64 encoded file data
          fileName: z.string(),
          contentType: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const {
          addressProofFile,
          amount,
          contactNumber,
          donorName,
          email,
          panCardFile,
          paymentTransactionId,
        } = input;

        // Generating Unique file names for upload
        const donorId = `donor-${Date.now()}`; // or use authenticated user ID
        const panFileName = `${donorId}/pan-${Date.now()}-${
          input.panCardFile.fileName
        }`;
        const addressFileName = `${donorId}/address-${Date.now()}-${
          input.addressProofFile.fileName
        }`;

        // Convert B64 to Buffer (Ready for S3)
        const panFileBuffer = Buffer.from(panCardFile.data, "base64");
        const addressProofFileBuffer = Buffer.from(
          addressProofFile.data,
          "base64"
        );

        // Declare Put commands to S3
        const PanCardS3Upload = new PutObjectCommand({
          Bucket: AWS_DONOR_DOCUMENTS_BUCKET_NAME,
          Key: panFileName,
          Body: panFileBuffer,
          ContentType: panCardFile.contentType,
          ServerSideEncryption: "AES256",
        });

        const AddressProofS3Upload = new PutObjectCommand({
          Bucket: AWS_DONOR_DOCUMENTS_BUCKET_NAME,
          Key: addressFileName,
          Body: addressProofFileBuffer,
          ContentType: addressProofFile.contentType,
          ServerSideEncryption: "AES256",
        });

        // Concurrent Upload
        await Promise.all([
          donationUploaderS3Client.send(PanCardS3Upload),
          donationUploaderS3Client.send(AddressProofS3Upload),
        ]);

        console.log(`Donation documents uploaded for donor: ${donorName}`);

        // Upload to S3
      } catch (err) {}
    }),
});
