import { SendRecoveryURLResponse, UpdatePasswordResponse } from "~/types/api";
import { api } from "~/utils/api";

const useRecovery = () => {
  const sendRecoveryURLMut = api.recovery.sendRecoveryURL.useMutation();
  const updatePasswordMut = api.recovery.updateUserPassword.useMutation();

  const handleSendRecoveryURL = async (
    email: string
  ): Promise<SendRecoveryURLResponse> => {
    const response = await sendRecoveryURLMut.mutateAsync({ email });
    return response as SendRecoveryURLResponse;
  };

  const handleUpdatePassword = async (
    email: string,
    new_password: string,
    access_token: string,
    refresh_token: string
  ): Promise<UpdatePasswordResponse> => {
    const response = await updatePasswordMut.mutateAsync({
      email,
      new_password,
      access_token,
      refresh_token,
    });
    return response as UpdatePasswordResponse;
  };
  return { handleSendRecoveryURL, handleUpdatePassword };
};

export default useRecovery;
