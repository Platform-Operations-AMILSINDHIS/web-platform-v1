import Admin from "~/components/authentication/Admin";
import useAdminAuth from "~/hooks/useAdminAuth";

import { Box, Flex } from "@chakra-ui/react";
import { useAdminAtom } from "~/lib/atom";
import { useState } from "react";
import { AdminLoginValues } from "~/hooks/useForm";

const AdminAuthPage = () => {
  const [{}, setAdminAtom] = useAdminAtom();
  const { handleAdminLogin } = useAdminAuth();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorTrigger, setErrorTrigger] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (values: AdminLoginValues) => {
    setSubmitting(true);
    const { loginStatus, message, redirect, admin } = await handleAdminLogin(
      values.email,
      values.password
    );

    if (loginStatus === true && admin) {
      setLoginStatus(true);
      setAdminAtom({
        admin: {
          admin_email: admin.admin_email,
          admin_username: admin.admin_username,
          id: admin.id,
        },
      });
      window.location.href = `${redirect}`;
      setSubmitting(false);
    } else if (loginStatus === false) {
      setLoginStatus(false);
      setErrorTrigger(true);
      setErrorMessage(message);
      setTimeout(() => {
        setErrorTrigger(false);
      }, 3000);
      setSubmitting(false);
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
        <Admin
          submitting={submitting}
          errorMessage={errorMessage}
          errorTrigger={errorTrigger}
          loginStatus={loginStatus}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Flex>
  );
};

export default AdminAuthPage;
