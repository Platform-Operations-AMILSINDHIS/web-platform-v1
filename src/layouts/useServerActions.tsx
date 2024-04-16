import { useState } from "react";
import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "~/types/forms/membership";
import { api } from "~/utils/api";

const useServerActions = () => {
  const [membershipBufferData, setMembershipBufferData] = useState<
    KAPMembershipFormValues[] | YACMembershipFormValues[]
  >([]);
  const [matrimonyBufferData, setMatrimonyBufferData] = useState<any[]>([]);

  const [isLoadingMemBuf, setIsLoadingMemBuf] = useState<boolean>(false);

  const { refetch: fetchAllMemberResponses } =
    api.formBuffer.fetchMembershipBuffer.useQuery(undefined, {
      enabled: false,
    });
  const { refetch: fetchAllMatrimonyResponses } =
    api.formBuffer.fetchMatrimonyBuffer.useQuery(undefined, {
      enabled: false,
    });

  const handleMemberBufferFetch = async () => {
    setIsLoadingMemBuf(true);
    const data = await fetchAllMemberResponses();
    await setMembershipBufferData([...(data.data ?? [])]);
    console.log(membershipBufferData);
    setIsLoadingMemBuf(false);
  };

  const handleMatrimonyBufferFetch = async () => {
    const data = await fetchAllMatrimonyResponses();
    console.log(data?.data);
  };

  return {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    isLoadingMemBuf,
  };
};

export default useServerActions;
