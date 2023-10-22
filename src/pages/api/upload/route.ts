import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { r2 } from "../../../utils/r2";

export async function POST(request: Request) {
  try {
    console.log("Generating an upload URL!");

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `filename.pdf`,
      }),
      { expiresIn: 60 }
    );

    console.log("Success generating upload URL!");

    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.log("error");
  }
}
