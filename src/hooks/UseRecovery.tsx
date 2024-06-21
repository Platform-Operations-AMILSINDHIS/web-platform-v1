import { SendRecoveryURLResponse } from "~/types/api";
import { api } from "~/utils/api";

const useRecovery = () => {
  const sendRecoveryURLMut = api.recovery.sendRecoveryURL.useMutation();

  const handleSendRecoveryURL = async (
    email: string
  ): Promise<SendRecoveryURLResponse> => {
    const response = await sendRecoveryURLMut.mutateAsync({ email });
    return response as SendRecoveryURLResponse;
  };
  return { handleSendRecoveryURL };
};

export default useRecovery;
