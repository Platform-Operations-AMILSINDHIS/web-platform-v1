import { AddAdminResponse, AdminLoginResponse } from "~/types/api";
import { api } from "~/utils/api";

const useAdminAuth = () => {
  const adminLoginMut = api.admin.login.useMutation();
  const addAdminMut = api.admin.addAdmin.useMutation();

  const handleAdminLogin = async (
    email: string,
    password: string
  ): Promise<AdminLoginResponse> => {
    const login_response = await adminLoginMut.mutateAsync({ email, password });
    return login_response as AdminLoginResponse;
  };

  const handleAddAdmin = async (
    email: string,
    password: string,
    username: string
  ): Promise<AddAdminResponse> => {
    const add_response = await addAdminMut.mutateAsync({
      email,
      password,
      username,
    });
    console.log(add_response);
    return add_response as AddAdminResponse;
  };
  return {
    handleAdminLogin,
    handleAddAdmin,
  };
};

export default useAdminAuth;
