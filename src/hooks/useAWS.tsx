import { api } from "~/utils/api";

// Hook for AWS actions
const useAWS = () => {
  const uploadImageSignedURL = api.aws.getS3UploadURL.useMutation();

  // upload image
  const handleUploadImageToS3 = async (file: File, s3_key: string) => {
    try {
      const awsS3uploadURLResponse = await uploadImageSignedURL.mutateAsync({
        content_type: file.type,
        s3_key: s3_key,
      });

      const uploadURL = await awsS3uploadURLResponse.uploadUrl;
      // upload directly, by using signed URL
      console.log("Uploading image....");
      await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
    } catch (err) {
      console.log("Error while uploading file to S3", err);
      throw new Error(
        "Something went wrong uploading your image file please try again"
      );
    }
  };

  return { handleUploadImageToS3 };
};
