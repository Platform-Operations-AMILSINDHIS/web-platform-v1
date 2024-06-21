import { AdminLoginResponse } from "~/types/api";
import { api } from "~/utils/api";

const useAdminAuth = () => {
  const adminLoginMut = api.admin.login.useMutation();

  const handleAdminLogin = async (
    email: string,
    password: string
  ): Promise<AdminLoginResponse> => {
    const login_response = await adminLoginMut.mutateAsync({ email, password });
    return login_response as AdminLoginResponse;
  };
  return {
    handleAdminLogin,
  };
};

export default useAdminAuth;
