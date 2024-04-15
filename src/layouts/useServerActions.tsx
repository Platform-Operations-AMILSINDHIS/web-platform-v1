import { useState } from "react";
import { api } from "~/utils/api";

const useServerActions = () => {
  const [membershipBufferData, setMembershipBufferData] = useState<any[]>([]);
  const { refetch: fetchAllResponses } =
    api.formBuffer.fetchMembershipBuffer.useQuery(undefined, {
      enabled: false,
    });

  const handleFetch = async () => {
    const data = await fetchAllResponses();
    console.log(data.data);
  };

  return { handleFetch };
};

export default useServerActions;
