import { SetStateAction } from "jotai";
import { Dispatch, useState } from "react";
import { api } from "~/utils/api";

// Hook for profile actions
interface ProfileData {
  email_id: string;
  account_name: string;
  first_name: string;
  last_name: string;
  membership_id: string | null;

  // From application_s3_meta
  application_s3_meta: {
    s3_key: string;
    file_type: string;
    file_name: string;
    content_type: string;
  }[];

  // From form_buffer
  form_buffer: {
    formType: any;
    submission: any;
    isMember: any;
    status: string;
  }[];
}

const useProfile = () => {
  const fetchUserProfileDataMut = api.profile.getProfileDetails.useMutation();
  const [isLoadingProfileData, setIsLoadingProfileData] =
    useState<boolean>(false);

  const handleFetchUserProfile = async (
    user_id: string,
    setErrorMessage: Dispatch<SetStateAction<string>>
  ): Promise<ProfileData | null> => {
    try {
      setIsLoadingProfileData(true);
      const data = await fetchUserProfileDataMut.mutateAsync({
        user_id: user_id,
      });

      if (!data) {
        setErrorMessage("No profile data found for this user.");
        return null;
      }

      return data as ProfileData;
    } catch (err: any) {
      console.log(err);
      setErrorMessage("Failed to fetch profile data.");
      return null;
    } finally {
      setIsLoadingProfileData(false);
    }
  };

  return { handleFetchUserProfile };
};

export default useProfile;
