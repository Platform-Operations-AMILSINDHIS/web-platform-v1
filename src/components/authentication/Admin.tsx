import { Box, Button, Checkbox, Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillLock } from "react-icons/ai";
import { Form, Formik } from "formik";
import { LabelledInput } from "../forms";
import { AdminLoginValidation } from "~/validations/AuthValidations";

import React, { Dispatch } from "react";
import { AdminLoginValues, adminInitialLoginValues } from "~/hooks/useForm";
import { SetStateAction } from "jotai";

interface AdminProps {
  handleSubmit: (values: AdminLoginValues) => Promise<void>;
  setForgot: Dispatch<SetStateAction<boolean>>;
  submitting: boolean;
  errorTrigger: boolean;
  errorMessage: string;
  loginStatus: boolean;
}

const Admin: React.FC<AdminProps> = ({
  errorMessage,
  errorTrigger,
  submitting,
  loginStatus,
  handleSubmit,
  setForgot,
}) => {
  return (
    <Formik
      validationSchema={AdminLoginValidation}
      initialValues={adminInitialLoginValues}
      onSubmit={async (values) => {
        try {
          await handleSubmit(values);
        } catch (err) {
          console.log(err);
        }
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
              type="password"
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
              <Text onClick={() => setForgot(true)}>Forgot password ?</Text>
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
              bg={loginStatus ? "green.500" : "#0E0E11"}
            >
              {loginStatus ? `Logged In` : "Login"}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Admin;
