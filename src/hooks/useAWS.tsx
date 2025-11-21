import { api } from "~/utils/api";

// Hook for AWS actions
const useAWS = () => {
  const uploadImageSignedURL = api.aws.getS3UploadURL.useMutation();

  // upload image
  const handleUploadImageToS3 = async (file: File, s3_key: string) => {
    try {
      // Create signed URL for upload
      const { uploadURL } = await uploadImageSignedURL.mutateAsync({
        content_type: file.type,
        s3_key: s3_key,
      });
      if (!uploadURL) {
        throw new Error("Failed to get upload URL");
      }

      // upload directly, by using signed URL
      console.log("Uploading image....");
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      // Validate response
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      console.log("Upload complete ✔");
      return true;
    } catch (err) {
      console.log("Error while uploading file to S3", err);
      return false;
    }
  };

  return { handleUploadImageToS3 };
};

export default useAWS;
