import fs from "fs";
import path from "path";
import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import supabase from "~/lib/supabase/client";

// STATIC FILE → USER MAPPING, Make dynamic later if needed
const fileToUidArr = [
  {
    file_name: "",
    uid: "",
  },
];

if (!process.env.AWS_WMRIK_AKI || !process.env.AWS_WMRIK_SAK) {
  console.error("❌ Missing AWS_WMRIK_AKI or AWS_WMRIK_SAK");
  process.exit(1);
}

const BUCKET = "kap-application-images";
const REGION = "us-east-1";

// S3 CLIENT (MASTER SEED USER)
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_WMRIK_AKI!,
    secretAccessKey: process.env.AWS_WMRIK_SAK!,
  },
});

function getMimeType(file: string) {
  const ext = file.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    heic: "image/heic",
    webp: "image/webp",
  };
  return map[ext!] || "application/octet-stream";
}

// Run Script
async function run() {
  const folder = path.join(process.cwd(), "image_download");

  console.log("\n🚀 Starting seed upload...\n");

  for (const entry of fileToUidArr) {
    const localPath = path.join(folder, entry.file_name);

    if (!fs.existsSync(localPath)) {
      console.error(`❌ File not found: ${localPath}`);
      continue;
    }

    // read image into buffer
    const bytes = fs.readFileSync(localPath);

    // S3 key location
    const Key = `users/${entry.uid}/profile/profile.jpg`;

    console.log(`⬆️  Uploading ${entry.file_name} → s3://${BUCKET}/${Key}`);

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key,
          Body: bytes,
          ContentType: getMimeType(entry.file_name),
        })
      );

      console.log(`✅ Uploaded for UID: ${entry.uid}\n`);
      console.log(`🗃️ Uploading to DB`);

      const { data, error } = await supabase
        .from("application_s3_meta")
        .insert([
          {
            user_id: entry.uid,
            s3_key: Key,
            file_type: "profile_image",
            file_name: entry.file_name,
            content_type: getMimeType(entry.file_name),
            file_size: bytes.length,
          },
        ])
        .select();

      if (error) {
        throw new Error(`Error inserting into supabase --> ${error.message}`);
      }

      console.log(`🗄️ DB Insert successful for UID: ${entry.uid}`);
    } catch (err) {
      console.error(`❌ Upload failed for ${entry.file_name}`, err);
    }
  }

  console.log("🎉 DONE SEEDING IMAGES");
}

run().catch((err) => {
  console.error("❌ Script crashed:", err);
});
