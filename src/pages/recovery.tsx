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

  const handlePasswordReset = async () => {
    setSubmitting(true);
    await handleUpdatePassword("sabavatakshat@gmail.com", "BigMan112");
    setUserAtom({ user: null });
    setSubmitting(false);
    // window.location.href = "/";
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
                  placeholder="********"
                />

                <LabelledInput
                  label="Confirm new passoword"
                  name="confirmPassword"
                  placeholder="********"
                />
              </Flex>
            </Flex>
            <Flex gap={3}>
              <Button
                isLoading={submitting}
                onClick={() => void handlePasswordReset()}
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
