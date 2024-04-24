import { useState } from "react";
import { KAPMembershipFormPDFValues } from "~/types/pdfs/kap-membership";
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
  const [userMembershipSubmission, setUserMembershipSubission] =
    useState<KAPMembershipFormPDFValues>();

  const fetchUserSubmissionMut =
    api.formBuffer.fetchUserMembershipSubmission.useMutation();

  const acceptUserApplicationMut =
    api.formBuffer.acceptUserApplication.useMutation();

  const { refetch: fetchAllMemberResponses } =
    api.formBuffer.fetchMembershipBuffer.useQuery(undefined, {
      enabled: false,
    });
  const { refetch: fetchAllMatrimonyResponses } =
    api.formBuffer.fetchMatrimonyBuffer.useQuery(undefined, {
      enabled: false,
    });

  const handleMemberBufferFetch = async () => {
    const data = await fetchAllMemberResponses();
    await setMembershipBufferData([...(data.data ?? [])]);
  };

  const handleMatrimonyBufferFetch = async () => {
    const data = await fetchAllMatrimonyResponses();
    await setMatrimonyBufferData([...(data.data ?? [])]);
  };

  const handleFetchUserSubmission = async (
    user_id: string,
    formType: string
  ) => {
    const data = await fetchUserSubmissionMut.mutateAsync({
      user_id: user_id,
      formType: formType,
    });
    const response = await data?.DB_submission_response;
    return response;
  };

  const handleAcceptingUserApplication = async (
    formType: string,
    to: string,
    user_id: string
  ) => {
    const data = await acceptUserApplicationMut.mutateAsync({
      formType,
      to,
      user_id,
    });
    console.log(data);
  };

  return {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    handleFetchUserSubmission,
    handleAcceptingUserApplication,
    membershipBufferData,
    matrimonyBufferData,
  };
};

export default useServerActions;
