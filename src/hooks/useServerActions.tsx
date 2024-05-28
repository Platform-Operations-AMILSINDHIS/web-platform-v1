import { useState } from "react";
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

  const fetchUserSubmissionMut =
    api.formBuffer.fetchUserMembershipSubmission.useMutation();

  const acceptUserApplicationMut =
    api.formBuffer.acceptUserApplication.useMutation();

  const acceptUserMatrimonyApplicationMut =
    api.formBuffer.acceptUserMatrimonyApplication.useMutation();

  const rejectUserMatrimonyApplicationMut =
    api.formBuffer.rejectUserMatrimonyApplication.useMutation();

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
    user_id: string
  ) => {
    const data = await acceptUserApplicationMut.mutateAsync({
      formType: formType,
      to,
      user_id: user_id,
    });

    console.log(user_id);
    console.log(data?.user_id);
  };

  const handleAcceptingUserMatrimonyApplication = async (user_id: string) => {
    const data = await acceptUserMatrimonyApplicationMut.mutateAsync({
      user_id: user_id,
    });

    console.log(data);
  };

  const handleRejectingUserMatrimonyApplication = async (user_id: string) => {
    const data = await rejectUserMatrimonyApplicationMut.mutateAsync({
      user_id: user_id,
    });

    console.log(data);
  };

  return {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    handleFetchUserSubmission,
    handleAcceptingUserApplication,
    handleAcceptingUserMatrimonyApplication,
    handleRejectingUserMatrimonyApplication,
    membershipBufferData,
    matrimonyBufferData,
  };
};

export default useServerActions;
