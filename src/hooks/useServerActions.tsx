/* eslint-disable */
import {
  DeleteResponseType,
  FetchMembershipSubmissionResponse,
  FetchProfileResponse,
  FormBufferDataFetch,
  MatrimonyFormBufferDataFetch,
  MatrimonyIdFetchResponse,
  MatrimonyLoginResponse,
  MatrimonyProfileResponse,
  MatrimonyProfilesFetchResponse,
  MatrimonySubmissionApprovalVerificationResponse,
  MatrimonySubmissionVerificationServerResponse,
  MembershipFormBufferDataFetch,
  ProfileRequestsFetchResponse,
  RequestResponse,
} from "~/types/api";
import { MatrimonyFormValues } from "~/types/forms/matrimony";

import { api } from "~/utils/api";

const useServerActions = () => {
  const generateMembershipID = api.actions.generateMembershipID.useMutation();
  const generateMatrimonyID = api.actions.generateMatrimonyID.useMutation();

  // uncomment to use isMember boolean and verify through that

  // const verifyMembershipMut =
  //   api.matrimonyProfiles.verifyMemberStatus.useMutation();

  const uploadUserProfilePicMut = api.actions.saveProfilePicture.useMutation();

  const fetchUserProfileMut =
    api.profileRequests.fetchProfileDetails.useMutation();

  const fetchProfileImage = api.aws.getS3ProfilePicture.useMutation();

  const fetchUserSubmissionMut =
    api.formBuffer.fetchUserSubmission.useMutation();

  const fetchMatrimonyProfileMut =
    api.matrimonyProfiles.fetchMatrimonyProfile.useMutation();

  const acceptUserApplicationMut =
    api.formBuffer.acceptUserApplication.useMutation();

  const rejectUserApplicationMut =
    api.formBuffer.rejectUserApplication.useMutation();

  const acceptUserMatrimonyApplicationMut =
    api.formBuffer.acceptUserMatrimonyApplication.useMutation();

  const rejectUserMatrimonyApplicationMut =
    api.formBuffer.rejectUserMatrimonyApplication.useMutation();

  const verifyUserMatrimonyApplicationMut =
    api.formBuffer.verifyMatrimonyApplicant.useMutation();

  const verifyIfApprovedUserMatrimonyApplicationMut =
    api.matrimonyProfiles.verifyIfApproved.useMutation();

  const matrimonyLoginMut = api.matrimonyProfiles.login.useMutation();

  const matrimonyProfileRequestMut =
    api.profileRequests.addRequest.useMutation();

  const fetchMatrimonyIdMut =
    api.matrimonyProfiles.fetchMatrimonyID.useMutation();

  const matrimonyProfileRequestDeclineMut =
    api.profileRequests.declineRequest.useMutation();

  const matrimonyProfileRequestAcceptMut =
    api.profileRequests.acceptRequest.useMutation();

  const deleteMatrimonyProfileMut =
    api.matrimonyProfiles.deleteProfile.useMutation();

  const fetchMatProfileRequestsMut =
    api.profileRequests.fetchAllRequests.useMutation();

  const { refetch: fetchAllBufferResponse } =
    api.formBuffer.fetchAllBuffer.useQuery(undefined, {
      enabled: false,
    });

  const { refetch: fetchAllMemberResponses } =
    api.formBuffer.fetchMembershipBuffer.useQuery(undefined, {
      enabled: false,
    });
  const { refetch: fetchAllMatrimonyResponses } =
    api.formBuffer.fetchMatrimonyBuffer.useQuery(undefined, {
      enabled: false,
    });

  const { refetch: fetchApprovedMatrimonyApplications } =
    api.formBuffer.fetchApprovedMatrimonyApplicants.useQuery(undefined, {
      enabled: false,
    });

  const handleMemberBufferFetch = async (): Promise<
    MembershipFormBufferDataFetch[]
  > => {
    const { data } = await fetchAllMemberResponses();
    const membershipFormBufferData = data?.membership_formbuffer;
    return membershipFormBufferData as MembershipFormBufferDataFetch[];
  };

  const handleMatrimonyProfileFetch = async (
    matrimony_id: string
  ): Promise<MatrimonyProfileResponse[]> => {
    const data = await fetchMatrimonyProfileMut.mutateAsync({
      matrimony_id: matrimony_id,
    });
    const matrimony_profile = data?.profile_data;
    return matrimony_profile as MatrimonyProfileResponse[];
  };

  const handleMatrimonyBufferFetch = async (): Promise<
    MatrimonyFormBufferDataFetch[]
  > => {
    const { data } = await fetchAllMatrimonyResponses();
    const matrimonyFormBufferData = data?.matrimony_formbuffer;
    return matrimonyFormBufferData as MatrimonyFormBufferDataFetch[];
  };

  const handleFetchFormBufferData = async (): Promise<
    FormBufferDataFetch[]
  > => {
    const { data } = await fetchAllBufferResponse();
    const formBufferData = data?.form_buffer;
    return formBufferData as FormBufferDataFetch[];
  };

  // In ProfilePicture.tsx, add this handler function

  const handleSaveUserProfilePicture = async (
    userId: string,
    s3_key: string,
    file: File
  ) => {
    try {
      await uploadUserProfilePicMut.mutateAsync({
        user_id: userId,
        s3_key: s3_key,
        file_type: "profile_image",
        file_name: file.name,
        content_type: file.type,
        file_size: file.size,
      });

      console.log("Profile picture metadata saved to database ✔");
      return true;
    } catch (error) {
      console.error("Error saving profile metadata:", error);
      throw new Error("Failed to save profile picture metadata");
    }
  };

  const handleFetchUserSubmission = async (
    user_id: string,
    formType: string
  ): Promise<FetchMembershipSubmissionResponse> => {
    const response = await fetchUserSubmissionMut.mutateAsync({
      user_id: user_id,
      formType: formType,
    });
    return response as FetchMembershipSubmissionResponse;
  };

  const handleFetchProfileDetails = async (
    user_id: string,
    is_admin: boolean
  ): Promise<{
    profileData: FetchProfileResponse;
    profileImageURL: string | null;
  }> => {
    // Fetch profile details
    const response = await fetchUserProfileMut.mutateAsync({ user_id });

    if (!response || !response.profileData || !response.profileData[0]) {
      throw new Error("Could not fetch profile data");
    }

    const profile = response.profileData[0];
    const s3Key = profile.application_s3_meta?.[0]?.s3_key ?? null;

    // Initialize image URL
    let profileImageURL: string | null = null;

    // If S3 key exists → fetch signed URL
    if (s3Key) {
      try {
        const awsS3Response = await fetchProfileImage.mutateAsync({
          is_admin,
          s3_key: s3Key,
        });

        profileImageURL = awsS3Response?.profilePictureSignedUrl ?? null;
      } catch (err) {
        console.log("⚠️ Error fetching signed URL:", err);
        // Leave profileImageURL = null (fallback)
      }
    }

    console.log({ "Profile data": profile });

    // Return unified structure
    return {
      profileData: profile,
      profileImageURL,
    };
  };

  const handleAcceptingUserApplication = async (
    formType: string,
    to: string,
    user_id: string,
    isPrevMember: boolean,
    setIsGeneratingID: (state: boolean) => void,
    setIsSendingMail: (state: boolean) => void,
    setIsApprovingApplication: (state: boolean) => void
  ) => {
    setIsApprovingApplication(true);
    setIsGeneratingID(true);
    const generatedMembershipID = await generateMembershipID.mutateAsync({
      formType: formType,
    });
    setIsGeneratingID(false);
    setIsSendingMail(true);
    const data = await acceptUserApplicationMut.mutateAsync({
      membership_id: generatedMembershipID,
      formType: formType,
      to,
      user_id: user_id,
      isPrevMember: isPrevMember,
    });
    setIsSendingMail(false);
    setIsApprovingApplication(false);
    window.location.href = "/admin";
  };

  const handleRejectingUserApplication = async (
    formType: string,
    to: string,
    user_id: string,
    isPrevMember: boolean,
    setIsSendingMail: (state: boolean) => void,
    setIsRejectingApplication: (state: boolean) => void
  ) => {
    setIsRejectingApplication(true);
    setIsSendingMail(true);
    const data = await rejectUserApplicationMut.mutateAsync({
      formType: formType,
      to,
      user_id: user_id,
      isPrevMember: isPrevMember,
    });
    setIsSendingMail(false);
    setIsRejectingApplication(false);
    window.location.href = "/admin";
  };

  const handleAcceptingUserMatrimonyApplication = async (
    user_id: string,
    to: string,
    setIsGeneratingID: (state: boolean) => void,
    setIsSendingMail: (state: boolean) => void,
    setIsApprovingApplication: (state: boolean) => void
  ) => {
    setIsApprovingApplication(true);
    setIsGeneratingID(true);
    const generatedMatrimonyID = await generateMatrimonyID.mutateAsync();
    setIsGeneratingID(false);
    setIsSendingMail(true);
    const data = await acceptUserMatrimonyApplicationMut.mutateAsync({
      to: to,
      matrimony_id: generatedMatrimonyID,
      user_id: user_id,
    });
    setIsSendingMail(false);
    setIsApprovingApplication(false);
    window.location.href = "/admin";
    console.log(data);
  };

  const handleRejectingUserMatrimonyApplication = async (
    to: string,
    user_id: string,
    setIsSendingMail: (state: boolean) => void,
    setIsRejectingApplication: (state: boolean) => void
  ) => {
    setIsRejectingApplication(true);
    setIsSendingMail(true);
    const data = await rejectUserMatrimonyApplicationMut.mutateAsync({
      user_id: user_id,
    });

    setIsSendingMail(false);
    setIsRejectingApplication(false);
    window.location.href = "/admin";
    console.log(data);
  };

  const handleUserMatrimonySubmissionVerification = async (
    user_id: string
  ): Promise<MatrimonySubmissionVerificationServerResponse> => {
    const data = await verifyUserMatrimonyApplicationMut.mutateAsync({
      user_id: user_id,
    });

    return data as MatrimonySubmissionVerificationServerResponse;
  };

  const handleUserMatrimonyApprovalVerification = async (
    user_id: string
  ): Promise<MatrimonySubmissionApprovalVerificationResponse> => {
    const data = await verifyIfApprovedUserMatrimonyApplicationMut.mutateAsync({
      user_id: user_id,
    });

    return data as MatrimonySubmissionApprovalVerificationResponse;
  };

  const handleMatrimonyLogin = async (
    matrimony_id: string,
    user_id: string
  ): Promise<MatrimonyLoginResponse> => {
    const data = await matrimonyLoginMut.mutateAsync({
      matrimony_id: matrimony_id,
      user_id: user_id,
    });

    return data as MatrimonyLoginResponse;
  };

  const handleMatrimonyProfilesFetch = async (): Promise<
    MatrimonyProfilesFetchResponse[]
  > => {
    const { data: approvedMatProfiles } =
      await fetchApprovedMatrimonyApplications();

    return approvedMatProfiles as MatrimonyProfilesFetchResponse[];
  };

  const handleMatrimonyIdFetch = async (
    user_id: string
  ): Promise<MatrimonyIdFetchResponse> => {
    const data = await fetchMatrimonyIdMut.mutateAsync({ user_id: user_id });

    return data as MatrimonyIdFetchResponse;
  };

  const handleMatrimonyRequestProfile = async (
    requestee_name: string,
    requestee_id: string,
    requested_name: string,
    requested_id: string,
    email_id: string
  ) => {
    const data = await matrimonyProfileRequestMut.mutateAsync({
      requestee_name: requestee_name,
      requestee_id: requestee_id,
      requested_name: requested_name,
      requested_id: requested_id,
      email_id: email_id,
    });

    console.log(data);
  };

  const handleFetchProfileRequests = async (
    email_id: string
  ): Promise<ProfileRequestsFetchResponse[]> => {
    const data = await fetchMatProfileRequestsMut.mutateAsync({
      email_id: email_id,
    });
    const profileRequests = data?.requests;
    return profileRequests as ProfileRequestsFetchResponse[];
  };

  const handleAcceptMatrimonyProfileRequest = async (
    submission: MatrimonyFormValues,
    email_id: string,
    id: number,
    requested_id: string,
    requested_name: string
  ): Promise<RequestResponse> => {
    const acceptRequestResponse =
      await matrimonyProfileRequestAcceptMut.mutateAsync({
        submission,
        email_id,
        id,
        requested_id,
        requested_name,
      });
    return acceptRequestResponse as RequestResponse;
  };

  const handleDeclineMatrimonyProfileRequest = async (
    email_id: string,
    id: number,
    requested_id: string,
    requested_name: string
  ): Promise<RequestResponse> => {
    const declineRequestResponse =
      await matrimonyProfileRequestDeclineMut.mutateAsync({
        email_id,
        id,
        requested_id,
        requested_name,
      });
    return declineRequestResponse as RequestResponse;
  };

  const handleDeleteMatrimonyProfile = async (
    name: string,
    user_id: string,
    matrimony_id: string
  ): Promise<DeleteResponseType> => {
    const deleteProfileResponse = await deleteMatrimonyProfileMut.mutateAsync({
      name,
      matrimony_id,
      user_id,
    });

    return deleteProfileResponse as unknown as DeleteResponseType;
  };

  // uncomment to use isMember boolean and verify through that

  // const handleIsMemberVerifiedCheck = async (
  //   user_id: string
  // ): Promise<verifyMemberStatusResponse> => {
  //   const verification_response = await verifyMembershipMut.mutateAsync({
  //     user_id,
  //   });
  //   return verification_response as verifyMemberStatusResponse;
  // };

  return {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    handleMatrimonyProfileFetch,
    handleSaveUserProfilePicture,
    handleFetchProfileDetails,
    handleFetchFormBufferData,
    handleFetchUserSubmission,
    handleAcceptingUserApplication,
    handleRejectingUserApplication,
    handleAcceptingUserMatrimonyApplication,
    handleRejectingUserMatrimonyApplication,
    handleUserMatrimonySubmissionVerification,
    handleUserMatrimonyApprovalVerification,
    handleMatrimonyLogin,
    handleMatrimonyProfilesFetch,
    handleMatrimonyIdFetch,
    handleMatrimonyRequestProfile,
    handleFetchProfileRequests,
    handleAcceptMatrimonyProfileRequest,
    handleDeclineMatrimonyProfileRequest,
    handleDeleteMatrimonyProfile,
    // uncomment to use isMember boolean and verify through that
    // handleIsMemberVerifiedCheck,
  };
};

export default useServerActions;
