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

  const handleResetPassword = async (
    email: string,
    password: string
  ): Promise<UpdatePasswordResponse> => {
    const response = await updatePasswordMut.mutateAsync({
      email,
      new_password: password,
    });
    return response as UpdatePasswordResponse;
  };
  return { handleSendRecoveryURL, handleResetPassword };
};

export default useRecovery;
