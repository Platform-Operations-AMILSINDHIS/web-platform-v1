import { Box, Button, Checkbox, Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillLock } from "react-icons/ai";
import { Form, Formik } from "formik";
import { LabelledInput } from "../forms";
import { AdminLoginValidation } from "~/validations/AuthValidations";

import React, { useState } from "react";
import { AdminLoginValues, adminInitialLoginValues } from "~/hooks/useForm";
import { useAdminAtom } from "~/lib/atom";
import useAdminAuth from "~/hooks/useAdminAuth";

const Admin: React.FC = () => {
  const [{}, setAdminAtom] = useAdminAtom();
  const { handleAdminLogin } = useAdminAuth();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorTrigger, setErrorTrigger] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (values: AdminLoginValues) => {
    setSubmitting(true);
    const { loginStatus, message, redirect, admin } = await handleAdminLogin(
      values.email,
      values.password
    );

    if (loginStatus === true && admin) {
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
      setErrorTrigger(true);
      setErrorMessage(message);
      setTimeout(() => {
        setErrorTrigger(false);
      }, 3000);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      validationSchema={AdminLoginValidation}
      initialValues={adminInitialLoginValues}
      onSubmit={async (values) => {
        await handleSubmit(values);
      }}
    >
      <Form>
        <Flex py={4} px={5} gap={6} flexDir="column">
          <Flex flexDir="column">
            <Flex justify="space-between" align="center" w="full">
              <Text fontWeight={700} fontSize="20px">
                Admin Login
              </Text>
              <Icon pb={1} color="#FF4D00" boxSize={7} as={AiFillLock} />
            </Flex>
            {errorTrigger ? (
              <Box borderRadius={5} p={2} bg="red.200" mt={2}>
                <Text fontWeight={700} color="red.600" fontSize="small">
                  {errorMessage}
                </Text>
              </Box>
            ) : (
              <></>
            )}
          </Flex>
          <Flex gap={3} w="full" flexDir="column">
            <LabelledInput
              label="Enter your email ID"
              name="email"
              placeholder="xyz@gmail.com"
            />

            <LabelledInput
              label="Enter password"
              name="password"
              placeholder="********"
            />

            <Flex
              fontWeight={500}
              w="full"
              justify="space-between"
              align="center"
            >
              <Flex gap={2}>
                <Checkbox />
                <Text>Remember me</Text>
              </Flex>
              <Text>Forgot password ?</Text>
            </Flex>
          </Flex>
          <Flex gap={3}>
            <Button
              isLoading={submitting}
              type="submit"
              _hover={{
                bg: "gray.700",
              }}
              color="white"
              bg="#0E0E11"
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Admin;
