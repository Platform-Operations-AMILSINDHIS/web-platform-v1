import { Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  RecoveryPasswordInitialValues,
  RecoveryPasswordValues,
} from "~/hooks/useForm";
import { RecoveryValidation } from "~/validations/AuthValidations";
import { LabelledInput } from "../forms";

interface RecoveryProps {
  handlePasswordReset: (values: RecoveryPasswordValues) => Promise<void>;
  handleViewNewPassword: () => void;
  inputType:
    | "number"
    | "password"
    | "select"
    | "text"
    | "chakra-text"
    | "date"
    | "datetime"
    | undefined;
  errorState: boolean;
  submitting: boolean;
  ctaLabel: string;
}

const Recovery: React.FC<RecoveryProps> = ({
  handlePasswordReset,
  handleViewNewPassword,
  errorState,
  inputType,
  submitting,
  ctaLabel,
}) => {
  return (
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
            {errorState ? (
              <Text color="red" fontWeight={500} textAlign="center">
                An Error occured while resetting your password please try again
              </Text>
            ) : (
              <></>
            )}
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
  );
};

export default Recovery;
