import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
        const donarId = `donar-${Date.now()}`; // or use authenticated user ID
        const panFileName = `${donarId}/pan-${Date.now()}-${
          input.panCardFile.fileName
        }`;
        const addressFileName = `${donarId}/address-${Date.now()}-${
          input.addressProofFile.fileName
        }`;

        // Convert B64 to Buffer (Ready for S3)
        const panFileBuffer = Buffer.from(panCardFile.data, "base64");
        const addressProofFileBuffer = Buffer.from(
          addressProofFile.data,
          "base64"
        );

        // Upload to S3
      } catch (err) {}
    }),
});
