import { useState } from "react";
import {
  MatrimonyLoginResponse,
  MatrimonySubmissionApprovalVerificationResponse,
  MatrimonySubmissionVerificationServerResponse,
} from "~/types/api";
import {
  MatrimonyBufferDataType,
  MembershipBufferDataType,
} from "~/types/tables/dataBuffer";
import { api } from "~/utils/api";

const useServerActions = () => {
  const [membershipBufferData, setMembershipBufferData] = useState<
    MembershipBufferDataType[]
  >([]);
  const [matrimonyBufferData, setMatrimonyBufferData] = useState<
    MatrimonyBufferDataType[]
  >([]);

  const generateMembershipID = api.actions.generateMembershipID.useMutation();
  const generateMatrimonyID = api.actions.generateMatrimonyID.useMutation();

  const fetchUserSubmissionMut =
    api.formBuffer.fetchUserMembershipSubmission.useMutation();

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

  const handleMemberBufferFetch = async () => {
    const data = await fetchAllMemberResponses();
    setMembershipBufferData(data.data ?? []);
    console.log(membershipBufferData);
  };

  const handleMatrimonyBufferFetch = async () => {
    const data = await fetchAllMatrimonyResponses();
    if (data.data && data.data.length > 0) {
      setMatrimonyBufferData(data.data);
    }
  };

  const handleFetchUserSubmission = async (
    user_id: string,
    formType: string
  ) => {
    const data = await fetchUserSubmissionMut.mutateAsync({
      user_id: user_id,
      formType: formType,
    });
    const response = data?.DB_submission_response;
    return response;
  };

  const handleAcceptingUserApplication = async (
    formType: string,
    to: string,
    user_id: string,
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
    });
    setIsSendingMail(false);
    setIsApprovingApplication(false);
    window.location.href = "/admin";
  };

  const handleRejectingUserApplication = async (
    formType: string,
    to: string,
    user_id: string,
    setIsSendingMail: (state: boolean) => void,
    setIsRejectingApplication: (state: boolean) => void
  ) => {
    setIsRejectingApplication(true);
    setIsSendingMail(true);
    const data = await rejectUserApplicationMut.mutateAsync({
      formType: formType,
      to,
      user_id: user_id,
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
    matrimony_id: string
  ): Promise<MatrimonyLoginResponse> => {
    const data = await matrimonyLoginMut.mutateAsync({
      matrimony_id: matrimony_id,
    });

    return data as MatrimonyLoginResponse;
  };

  return {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    handleFetchUserSubmission,
    handleAcceptingUserApplication,
    handleRejectingUserApplication,
    handleAcceptingUserMatrimonyApplication,
    handleRejectingUserMatrimonyApplication,
    handleUserMatrimonySubmissionVerification,
    handleUserMatrimonyApprovalVerification,
    handleMatrimonyLogin,
    membershipBufferData,
    matrimonyBufferData,
  };
};

export default useServerActions;
