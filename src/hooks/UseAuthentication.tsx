import { api } from "~/utils/api";

const useAuthentication = () => {
  const recoveryMut = api.recovery.testMutation.useMutation();
  const handleRecovery = async (email: string): Promise<string> => {
    const response = await recoveryMut.mutateAsync({ email });
    return response as string;
  };
  return {
    handleRecovery,
  };
};

export default useAuthentication;
