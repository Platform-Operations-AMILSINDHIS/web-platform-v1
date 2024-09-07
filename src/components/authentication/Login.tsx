import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LoginValues, loginInitialValues } from "~/hooks/useForm";
import { LabelledInput } from "../forms";
import { Form, Formik } from "formik";
import { api } from "~/utils/api";
import { userAtomBody } from "~/types/atoms/users";
import { useUserAtom } from "~/lib/atom";
import { LoginValidation } from "~/validations/AuthValidations";
import { TRPCError } from "@trpc/server";

interface LoginProps {
  setCloseModal: (input: boolean) => void;
  displayFunction: (input: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setCloseModal, displayFunction }) => {
  const [submitting, setSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginMutation = api.auth.login.useMutation();
  const [, setUserAtom] = useUserAtom();

  const handleUserAtom = (userObject: userAtomBody) => {
    setUserAtom({
      user: {
        account_name: userObject.account_name,
        age: userObject.age,
        auth_id: userObject.auth_id,
        id: userObject.id,
        membership_id: userObject.membership_id,
        email_id: userObject.email_id,
        first_name: userObject.first_name,
        gender: userObject.gender,
        last_name: userObject.last_name,
        KAP_member: userObject.KAP_member,
        YAC_member: userObject.YAC_member,
      },
    });
  };

  const handleSubmit = async (values: LoginValues) => {
    setSubmitting(true);
    setShowError(false);
    setErrorMessage("");

    try {
      const response = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      if (response && response.userData) {
        const userHit = response.userData;

        const filteredUserData: userAtomBody = {
          auth_id: userHit.auth_id ?? "",
          id: userHit.id ?? "",
          account_name: userHit.account_name ?? "",
          membership_id: userHit.membership_id ?? "",
          age: userHit.age ?? 0,
          email_id: userHit.email_id ?? "",
          first_name: userHit.first_name ?? "",
          gender: userHit.gender ?? "",
          last_name: userHit.last_name ?? "",
          KAP_member: userHit.KAP_member ?? false,
          YAC_member: userHit.YAC_member ?? false,
        };

        handleUserAtom(filteredUserData);
        setCloseModal(true);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed", error);
      setShowError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wronf"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      validationSchema={LoginValidation}
      initialValues={loginInitialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <Flex py={5} px={2} gap={6} align="center" flexDir="column">
          <Flex gap={3} align="center" flexDir="column">
            <Text fontSize="25px" fontWeight={800}>
              Login
            </Text>
            <Text
              color={showError ? "red" : "black"}
              fontWeight={500}
              maxW={400}
              textAlign="center"
            >
              {showError
                ? errorMessage || "Invalid email or password"
                : `Great to have you back! Enter your registered credentials to log into your account`}
            </Text>
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
              showPasswordOption
              placeholder="********"
            />

            <Flex
              fontWeight={500}
              w="full"
              justify="space-between"
              align="center"
            >
              <Text>Forgot password?</Text>
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
            <Button
              color="#FF4D00"
              bg="none"
              border="2px solid"
              borderColor="#FF4D00"
              _hover={{
                color: "white",
                bg: "#FF4D00",
              }}
              onClick={() => displayFunction(false)}
            >
              New Here?
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Login;
