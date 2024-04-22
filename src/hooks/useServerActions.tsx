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

  return {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    membershipBufferData,
    matrimonyBufferData,
  };
};

export default useServerActions;
