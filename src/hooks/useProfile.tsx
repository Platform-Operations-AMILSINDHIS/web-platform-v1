import { SetStateAction } from "jotai";
import React, { useEffect, useState } from "react";
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

interface useProfileHookProps {
  user_id: string | string[] | undefined; // defined by slug
}

const useProfile = ({ user_id }: useProfileHookProps) => {
  const fetchUserProfileDataMut = api.profile.getProfileDetails.useMutation();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileFetchError, setProfileFetchError] = useState<string>("");
  const [isLoadingProfileData, setIsLoadingProfileData] =
    useState<boolean>(false);

  useEffect(() => {
    if (!user_id) return;
    const handleFetchUserProfile = async (): Promise<void> => {
      try {
        setProfileFetchError("");
        setIsLoadingProfileData(true);
        const data = await fetchUserProfileDataMut.mutateAsync({
          user_id: user_id as string,
        });

        if (!data) {
          setProfileFetchError("No profile data found for this user.");
          setProfileData(null);
        }

        setProfileData(data);
      } catch (err: any) {
        console.log(err);
        setProfileFetchError("Failed to fetch profile data.");
      } finally {
        setIsLoadingProfileData(false);
      }
    };

    handleFetchUserProfile();
  }, [user_id]);

  return { profileData, profileFetchError, isLoadingProfileData };
};

export default useProfile;
