import React, { Dispatch, SetStateAction } from "react";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { Form, Formik } from "formik";
import { LabelledInput } from "../forms";
import {
  RecoveryPasswordValues,
  RecoveryPasswordInitialValues,
} from "~/hooks/useForm";
import { RecoveryValidation } from "~/validations/AuthValidations";
import { useToast } from "@chakra-ui/react";

interface AdminForgotProps {
  submitting: boolean;
  setForgot: Dispatch<SetStateAction<boolean>>;
  handleForgotPassword: (
    email: string,
    newPassword: string
  ) => Promise<{ success: boolean; message: string }>;
}

const AdminForgot: React.FC<AdminForgotProps> = ({
  submitting,
  setForgot,
  handleForgotPassword,
}) => {
  const toast = useToast();

  return (
    <Formik
      validationSchema={RecoveryValidation}
      initialValues={RecoveryPasswordInitialValues}
      onSubmit={async (values: RecoveryPasswordValues) => {
        try {
          const { email, newPassword } = values;
          const response = await handleForgotPassword(email, newPassword);

          toast({
            title: response.success ? "Success!" : "Error!",
            description: response.message,
            status: response.success ? "success" : "error",
            duration: 4000,
            isClosable: true,
          });

          if (response.success) setForgot(false);
        } catch (err) {
          console.error(err);
          toast({
            title: "Error!",
            description: "An unexpected error occurred.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      }}
    >
      <Form>
        <Flex py={4} px={5} gap={6} flexDir="column">
          <Flex flexDir="column" align="center">
            <Icon color="#FF4D00" boxSize={8} as={AiOutlineMail} />
            <Text fontWeight={700} fontSize="20px">
              Forgot Password
            </Text>
          </Flex>
          <Flex gap={3} w="full" flexDir="column">
            <LabelledInput
              label="Enter your email ID"
              name="email"
              placeholder="xyz@gmail.com"
            />
            <LabelledInput
              label="Enter new password"
              name="newPassword"
              type="password"
              placeholder="********"
            />
            <LabelledInput
              label="Confirm new password"
              name="confirmPassword"
              type="password"
              placeholder="********"
            />
          </Flex>
          <Flex gap={3}>
            <Button
              isLoading={submitting}
              type="submit"
              _hover={{
                bg: "gray.700",
              }}
              color="white"
              bg="#FF4D00"
            >
              Submit
            </Button>
            <Button
              onClick={() => setForgot(false)}
              variant="outline"
              color="white"
              bg="black"
              _hover={{}}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default AdminForgot;
