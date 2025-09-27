import { S3Client } from "@aws-sdk/client-s3";
import {
  AWS_DONATIONS_UPLOADER_ACCESS_KEY_ID,
  AWS_DONATIONS_UPLOADER_SECRET_ACCESS_KEY,
  AWS_DONATIONS_REVIEWER_ACCESS_KEY_ID,
  AWS_DONATIONS_REVIEWER_SECRET_ACCESS_KEY,
} from "./env";

const donationUploaderS3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: AWS_DONATIONS_UPLOADER_ACCESS_KEY_ID,
    secretAccessKey: AWS_DONATIONS_UPLOADER_SECRET_ACCESS_KEY,
  },
});

const donationReviewerS3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: AWS_DONATIONS_REVIEWER_ACCESS_KEY_ID,
    secretAccessKey: AWS_DONATIONS_REVIEWER_SECRET_ACCESS_KEY,
  },
});

export { donationUploaderS3Client, donationReviewerS3Client };
