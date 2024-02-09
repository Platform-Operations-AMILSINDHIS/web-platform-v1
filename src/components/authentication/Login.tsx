import { Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LoginValues, loginInitialValues } from "~/hooks/useForm";
import { LabelledInput } from "../forms";
import { Form, Formik, FormikHelpers } from "formik";
import axios from "axios";
import { LoginValidation } from "~/validations/AuthValidations";
import { useUserAtom } from "~/lib/atom";
import type { userAtomBody } from "~/lib/atom";

interface LoginProps {
  setCloseModal: (input: boolean) => void;
  displayFunction: (input: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setCloseModal, displayFunction }) => {
  const [{ user }, setUserAtom] = useUserAtom();
  const [submitting, setSubmitting] = useState(false);

  const handleUserAtom = (userObject: userAtomBody) => {
    setUserAtom({
      user: {
        account_name: userObject.account_name,
        age: userObject.age,
        auth_id: userObject.auth_id,
        membership_id: userObject.membership_id,
        email_id: userObject.email_id,
        first_name: userObject.first_name,
        gender: userObject.gender,
        last_name: userObject.last_name,
        user_member: userObject.user_member,
      },
    });
  };

  const handleSubmit = async (
    values: LoginValues,
    { setErrors }: FormikHelpers<LoginValues>
  ) => {
    try {
      setSubmitting(true);

      const mailValidateResponse = await axios.post<{
        loginValidated: boolean;
        message: string;
      }>("/api/auth/loginvalidation/mail", {
        email: values.email,
      });

      const { loginValidated, message } = mailValidateResponse.data;
      console.log(loginValidated);
      if (!loginValidated) {
        setErrors({ email: message });
        setSubmitting(false);
        return;
      }

      const passwordValidateResponse = await axios.post<{
        passwordValidate: boolean;
        password_server_validate_message: string;
      }>("/api/auth/loginvalidation/password", {
        email: values.email,
        password: values.password,
      });

      const { passwordValidate, password_server_validate_message } =
        passwordValidateResponse.data;

      if (!passwordValidate) {
        setErrors({ password: password_server_validate_message });
        setSubmitting(false);
        return;
      }

      const response = await axios.post<{
        userData: {
          auth_id: string;
          account_name: string;
          age: number;
          email_id: string;
          first_name: string;
          membership_id: string;
          gender: string;
          last_name: string;
          Kap_member?: boolean;
          Yac_member?: boolean;
        }[];
      }>("/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      console.log({
        responseStatus: response.status,
        message: "hey",
        data: response.data?.userData[0], // Using optional chaining here
      });

      const userHit = response.data?.userData[0];

      const filteredUserData: userAtomBody = {
        auth_id: userHit?.auth_id ?? "",
        account_name: userHit?.account_name ?? "",
        membership_id: userHit?.membership_id ?? "",
        age: userHit?.age ?? 0,
        email_id: userHit?.email_id ?? "",
        first_name: userHit?.first_name ?? "",
        gender: userHit?.gender ?? "",
        last_name: userHit?.last_name ?? "",
        user_member: userHit?.Kap_member ? 1 : userHit?.Yac_member ? 2 : 0,
      };

      handleUserAtom(filteredUserData);
      console.log(user);
      setSubmitting(false);
      setCloseModal(true);
    } catch (error) {
      console.log(error);
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
            <Text fontWeight={500} maxW={400} textAlign="center">
              Great to have you back! Enter your registered credentials to log
              into your account
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
              New Here ?
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Login;
