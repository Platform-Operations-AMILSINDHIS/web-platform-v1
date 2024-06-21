import { Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { LabelledInput } from "~/components/forms";
import useAuthentication from "~/hooks/UseAuthentication";
import { RecoveryPasswordInitialValues } from "~/hooks/useForm";
import { RecoveryValidation } from "~/validations/AuthValidations";

const RecoveryPage = () => {
  const { handleRecovery } = useAuthentication();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (email: string) => {
    setSubmitting(true);
    const response = await handleRecovery(email);
    console.log(response);
    setSubmitting(false);
  };

  return (
    <Flex justify="center" align="center" w="full" h="100vh">
      <Flex borderRadius={15} p={5} gap={3}>
        <Formik
          validationSchema={RecoveryValidation}
          initialValues={RecoveryPasswordInitialValues}
          onSubmit={async (values) => {
            await handleSubmit(values.email);
          }}
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
                type="submit"
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
