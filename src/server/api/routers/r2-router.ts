import { env } from "~/env.mjs";

import * as Yup from "yup";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { r2 } from "~/server/r2";

export const r2Router = createTRPCRouter({
  getPresignedUrl: publicProcedure
    .input(Yup.object({ key: Yup.string() }))
    .mutation(async ({ ctx, input }) => {
      const { key } = input;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(r2, putObjectCommand);
    }),
});
