import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

// S3 CLIENT (MASTER SEED USER)
const masterS3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_WMRIK_AKI!,
    secretAccessKey: process.env.AWS_WMRIK_SAK!,
  },
});

const adminS3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_KAIK_AKI!,
    secretAccessKey: process.env.AWS_KAIK_SAK!,
  },
});
