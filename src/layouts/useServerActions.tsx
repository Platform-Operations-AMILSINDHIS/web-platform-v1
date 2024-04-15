import { api } from "~/utils/api";

const useServerActions = () => {
  const { refetch: fetchAllResponses } =
    api.formBuffer.fetchMembershipBuffer.useQuery(undefined, {
      enabled: false,
    });

  const handleFetch = async () => {
    const data = await fetchAllResponses();
    console.log({ data });
  };

  return { handleFetch };
};

export default useServerActions;
