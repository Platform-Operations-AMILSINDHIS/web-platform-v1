import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LabelledInput } from "~/components/forms";
import useRecovery from "~/hooks/UseRecovery";
import {
  RecoveryPasswordInitialValues,
  RecoveryPasswordValues,
} from "~/hooks/useForm";
import { useUserAtom } from "~/lib/atom";
import { RecoveryValidation } from "~/validations/AuthValidations";

const RecoveryPage = () => {
  const { handleUpdatePassword } = useRecovery();
  const [{}, setUserAtom] = useUserAtom();
  const toast = useToast();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [ctaLabel, setCtaLabel] = useState<string>("View Password");

  const handlePasswordReset = async (values: RecoveryPasswordValues) => {
    // setSubmitting(true);
    // await handleUpdatePassword("sabavatakshat@gmail.com", "BigMan112");
    // setUserAtom({ user: null });
    // setSubmitting(false);
    setSubmitting(true);
    console.log(values);
    setSubmitting(false);
    // window.location.href = "/";
  };

  const handleViewNewPassword = () => {
    if (inputType === "password") {
      setInputType("text");
      setCtaLabel("Hide Password");
    } else {
      setInputType("password");
      setCtaLabel("View Password");
    }
  };

  return (
    <Flex justify="center" align="center" w="full" h="100vh">
      <Flex borderRadius={15} p={5} gap={3}>
        <Formik
          validationSchema={RecoveryValidation}
          initialValues={RecoveryPasswordInitialValues}
          onSubmit={handlePasswordReset}
        >
          <Form>
            <Flex w={500} flexDir="column">
              <Flex pb={2} flexDir="column">
                <Text fontWeight={700} textAlign="center" fontSize="3xl">
                  Reset Password
                </Text>
                <Text textAlign="center">
                  Enter & confirm your new password below
                </Text>
              </Flex>
              <Flex my={3} gap={1} flexDir="column">
                <LabelledInput
                  label="Email"
                  name="email"
                  placeholder="email@gmail.com"
                />
                <LabelledInput
                  label="Enter your new password"
                  name="newPassword"
                  type={inputType}
                  placeholder="********"
                />

                <LabelledInput
                  label="Confirm new passoword"
                  name="confirmPassword"
                  type={inputType}
                  placeholder="********"
                />
              </Flex>
            </Flex>
            <Flex gap={3}>
              <Button
                isLoading={submitting}
                _hover={{
                  bg: "gray.200",
                }}
                color="#0E0E11"
                bg="gray.100"
                onClick={handleViewNewPassword}
              >
                {ctaLabel}
              </Button>
              <Button
                type="submit"
                isLoading={submitting}
                _hover={{
                  bg: "gray.700",
                }}
                color="white"
                bg="#0E0E11"
              >
                Reset Password
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
};

export default RecoveryPage;
