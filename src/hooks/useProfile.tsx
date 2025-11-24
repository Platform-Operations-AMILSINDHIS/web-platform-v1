/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
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

  // Extract fetch logic into a separate function so it can be reused
  const handleFetchUserProfile = async (): Promise<void> => {
    if (!user_id) return;
    try {
      setProfileFetchError("");
      setIsLoadingProfileData(true);
      const data = await fetchUserProfileDataMut.mutateAsync({
        user_id: user_id as string,
      });

      if (!data) {
        setProfileFetchError("No profile data found for this user.");
        setProfileData(null);
      } else {
        setProfileData(data);
      }
    } catch (err: any) {
      console.log(err);
      setProfileFetchError("Failed to fetch profile data.");
    } finally {
      setIsLoadingProfileData(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    void handleFetchUserProfile();
  }, [user_id]);

  // Refetch function that can be called manually
  const refetch = () => {
    void handleFetchUserProfile();
  };

  return { profileData, profileFetchError, isLoadingProfileData, refetch };
};

export default useProfile;
