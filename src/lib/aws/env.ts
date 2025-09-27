export const AWS_DONATIONS_UPLOADER_ACCESS_KEY_ID = assertValue(
  process.env.AWS_DONATIONS_UPLOADER_ACCESS_KEY_ID,
  "Missing environment variable: AWS_DONATIONS_UPLOADER_ACCESS_KEY_ID"
);

export const AWS_DONATIONS_UPLOADER_SECRET_ACCESS_KEY = assertValue(
  process.env.AWS_DONATIONS_UPLOADER_SECRET_ACCESS_KEY,
  "Missing environment variable: AWS_DONATIONS_UPLOADER_SECRET_ACCESS_KEY"
);
export const AWS_DONATIONS_REVIEWER_ACCESS_KEY_ID = assertValue(
  process.env.AWS_DONATIONS_REVIEWER_ACCESS_KEY_ID,
  "Missing environment variable: AWS_DONATIONS_REVIEWER_ACCESS_KEY_ID"
);

export const AWS_DONATIONS_REVIEWER_SECRET_ACCESS_KEY = assertValue(
  process.env.AWS_DONATIONS_REVIEWER_SECRET_ACCESS_KEY,
  "Missing environment variable: AWS_DONATIONS_REVIEWER_SECRET_ACCESS_KEY"
);
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
