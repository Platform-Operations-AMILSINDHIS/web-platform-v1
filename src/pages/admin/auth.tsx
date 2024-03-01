import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import Admin from "~/components/authentication/Admin";

import { AdminLoginValues, adminInitialLoginValues } from "~/hooks/useForm";
import { adminAtomBody, adminAtomState, useAdminAtom } from "~/lib/atom";

const AdminAuthPage = () => {
  const [{}, setAdminAtom] = useAdminAtom();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    values: AdminLoginValues,
    { setErrors }: FormikHelpers<AdminLoginValues>
  ) => {
    try {
      setSubmitting(true);
      const adminAuthResponse = await axios.post<{
        adminData: adminAtomBody[];
        authenticated: boolean;
        message: string;
        type: string;
      }>("/api/auth/admin", {
        email: values.email,
        password: values.password,
      });

      const { authenticated, message, type, adminData } =
        adminAuthResponse.data;
      console.log(adminAuthResponse.data);
      if (!authenticated) {
        type === "email"
          ? setErrors({ email: message })
          : type === "password"
          ? setErrors({ password: message })
          : {};
        setSubmitting(false);
      } else {
        setSubmitting(false);
        console.log("signed In");
        console.log(adminData[0]);
        setAdminAtom({
          admin: {
            id: adminData[0]?.id,
            admin_email: adminData[0]?.admin_email,
            admin_username: adminData[0]?.admin_username,
          },
        });
        window.location.href = "/admin";
      }
    } catch {
      alert("something went wrong");
    }
  };

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Box
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
        border="1px solid"
        borderRadius={5}
        borderColor="gray.200"
        w={500}
      >
        <Admin handleSubmit={handleSubmit} submitting={submitting} />
      </Box>
    </Flex>
  );
};

export default AdminAuthPage;
