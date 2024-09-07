import { SetStateAction } from "jotai";
import { Dispatch } from "react";
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
    password: string,
    setReseting: Dispatch<SetStateAction<boolean>>
  ): Promise<UpdatePasswordResponse> => {
    setReseting(true);
    const response = await updatePasswordMut.mutateAsync({
      email,
      new_password: password,
    });
    setReseting(false);
    return response as UpdatePasswordResponse;
  };
  return { handleSendRecoveryURL, handleUpdatePassword };
};

export default useRecovery;
