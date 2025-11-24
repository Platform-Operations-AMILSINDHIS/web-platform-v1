import { useEffect, useState } from "react";
import { api } from "~/utils/api";

// Props are optional, and I only use them for when the hook returns data straight for UI
interface useAWSProps {
  s3_key: string;
}

// Hook for AWS actions
const useAWS = (props?: Partial<useAWSProps>) => {
  const { s3_key } = props ?? {};

  const uploadImageSignedURL = api.aws.getS3UploadURL.useMutation();
  const fetchImageSignedURL = api.aws.getS3ProfilePicture.useMutation();

  const [profileImageSignedURL, setProfileImageSignedURL] =
    useState<string>("");
  const [fetchingPorfileImageError, setFetchingProfileImageError] =
    useState<string>("");
  const [isFetchingProfileImage, setIsFetchingProfileImage] =
    useState<boolean>(false);

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

  // fetch profile image URL
  useEffect(() => {
    const handleFetchProfileImageURL = async () => {
      if (!s3_key) return;
      try {
        setFetchingProfileImageError("");
        setIsFetchingProfileImage(false);
        const { profilePictureSignedUrl } =
          await fetchImageSignedURL.mutateAsync({
            is_admin: false,
            s3_key: s3_key,
          });
        if (!uploadImageSignedURL) {
          setFetchingProfileImageError(
            "Could Not retrieve Profile Image details"
          );
        }

        setProfileImageSignedURL(profilePictureSignedUrl);
      } catch (err) {
        console.log("Error while uploading file to S3", err);
        setFetchingProfileImageError(
          "Could Not retrieve Profile Image details"
        );
        return false;
      } finally {
        setIsFetchingProfileImage(false);
      }
    };

    handleFetchProfileImageURL();
  }, [s3_key]);

  return {
    // Handlers
    handleUploadImageToS3,

    // Profile Image
    isFetchingProfileImage,
    fetchingPorfileImageError,
    profileImageSignedURL,
  };
};

export default useAWS;
