import "dotenv/config";
import { SESClient } from "@aws-sdk/client-ses";

// SES Client
const sesClient = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_SES_AKI!,
    secretAccessKey: process.env.AWS_SES_SAK!,
  },
});

export { sesClient };
