import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

// S3 CLIENT (MASTER USER)
const masterS3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_WMRIK_AKI!,
    secretAccessKey: process.env.AWS_WMRIK_SAK!,
  },
});

// S3 CLIENT (ADMIN USER)
const adminS3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_KAIK_AKI!,
    secretAccessKey: process.env.AWS_KAIK_SAK!,
  },
});

const userS3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_UIK_AKI!,
    secretAccessKey: process.env.AWS_UIK_SAK!,
  },
});

export { masterS3, adminS3, userS3 };
