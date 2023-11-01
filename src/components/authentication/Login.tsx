import { Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LoginValues, loginInitialValues } from "~/hooks/useForm";
import { LabelledInput } from "../forms";
import { Form, Formik, FormikHelpers } from "formik";
import axios from "axios";
import { LoginValidation } from "~/validations/AuthValidations";

interface LoginProps {
  setCloseModal: (input: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setCloseModal }) => {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (
    values: LoginValues,
    { setErrors }: FormikHelpers<LoginValues>
  ) => {
    try {
      setSubmitting(true);

      const mailValidateResponse = await axios.post<{
        loginValidated: boolean;
        message: string;
      }>("/api/auth/loginValidation/mail", {
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
      }>("/api/auth/loginValidation/password", {
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

      const response = await axios.post("/api/auth/login", {
        email: values.email,
        password: values.password,
      });
      console.log({ responseStatus: response.status });
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
              label="Create a password"
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
            >
              Create Account
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Login;
