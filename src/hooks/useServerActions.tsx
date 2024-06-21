import { useState } from "react";
import {
  DeleteResponseType,
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

  const { refetch: fetchMatProfileRequests } =
    api.profileRequests.fetchAllRequests.useQuery(undefined, {
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

  const handleFetchProfileRequests = async (): Promise<
    ProfileRequestsFetchResponse[]
  > => {
    const { data } = await fetchMatProfileRequests();
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
    user_id: string,
    matrimony_id: string
  ) => {
    const deleteProfileResponse = await deleteMatrimonyProfileMut.mutateAsync({
      matrimony_id,
      user_id,
    });

    console.log(deleteProfileResponse);
  };

  return {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    handleMatrimonyProfileFetch,
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
  };
};

export default useServerActions;
