import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";

import axios from "axios";

import { Values, initialValues } from "~/hooks/useForm";
import { LabelledInput } from "../forms";
import { SignUpValidationSchema } from "~/validations/AuthValidations";

interface SignupProps {
  setCloseModal: (input: boolean) => void;
  authStateHandleFunction: (
    authState: "login" | "signup" | "forgotPassword"
  ) => void;
}

const Signup: React.FC<SignupProps> = ({
  setCloseModal,
  authStateHandleFunction,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const dbUpdation = async (auth_id: string, values: Values) => {
    try {
      const response = await axios.post("/api/auth/db", {
        email: values.email,
        account_name: values.accountName,
        KAP_member: false,
        YAC_member: false,
        age: values.age,
        gender: values.gender,
        first_name: values.firstName,
        last_name: values.lastName,
        authID: auth_id,
        password: values.password,
      });

      console.log({ response });
    } catch (error: unknown) {
      alert(`Error occured during submission : ${error as string}`);
    }
  };

  const handleSubmit = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    try {
      setSubmitting(true);

      const validateEmailResponse = await axios.post<{
        trigger: boolean;
        email_server_validate_message: string;
      }>("/api/auth/signupvalidation/mail", {
        email: values.email,
      });

      console.log({ validateEmailResponse });
      const { trigger, email_server_validate_message } =
        validateEmailResponse.data;
      if (trigger) {
        setErrors({ email: email_server_validate_message });
        setSubmitting(false);
        return;
      }

      const response = await axios.post<{ auth_id: string }>(
        "/api/auth/signup",
        {
          email: values.email,
          password: values.password,
          phonenumber: values.phonenumber,
        }
      );

      console.log(response.data);
      const { auth_id } = response.data;

      await dbUpdation(auth_id, values);
      setSubmitting(false);
      toast({
        title: "Activate your account",
        description: "An activation link has been sent to your Email ID",
        status: "info",
        duration: 5000, // How long the toast will be displayed in milliseconds
        isClosable: true,
      });
      setCloseModal(true);
    } catch (err: unknown) {
      alert(`Error occured during submission : ${err as string}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignUpValidationSchema}
    >
      <Form>
        <Flex py={5} px={2} gap={6} align="center" flexDir="column">
          <Flex gap={3} align="center" flexDir="column">
            <Text fontSize="25px" fontWeight={800}>
              Sign up
            </Text>
            <Text fontWeight={500} maxW={400} textAlign="center">
              Provide your details to create your account and join the sindhi
              community today
            </Text>
          </Flex>
          <Flex gap={3} w="full" flexDir="column">
            <LabelledInput
              label="Enter your email ID"
              name="email"
              placeholder="xyz@gmail.com"
            />
            <LabelledInput
              label="Phone number"
              name="phonenumber"
              placeholder="+91 XXXX"
            />
            <LabelledInput
              label="Create an account name"
              name="accountName"
              placeholder="user_XYZ@1233"
            />
            <LabelledInput
              label="Create a password"
              name="password"
              placeholder="********"
            />
            <Flex w="full" gap={3}>
              <LabelledInput
                label="First name"
                name="firstName"
                placeholder="Enter first name"
              />
              <LabelledInput
                label="Last name"
                name="lastName"
                placeholder="Enter last name"
              />
            </Flex>
            <LabelledInput
              type="select"
              label="Are you a male or female?"
              name="gender"
              placeholder="Select a gender"
              selectOptions={["Male", "Female"]}
            />

            <LabelledInput
              type="number"
              label="Enter your age"
              name="age"
              placeholder="0"
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
              bg="#0E0E11"
            >
              Create account
            </Button>
            <Button
              onClick={() => authStateHandleFunction("login")}
              color="#FF4D00"
              bg="none"
              border="2px solid"
              borderColor="#FF4D00"
              _hover={{
                color: "white",
                bg: "#FF4D00",
              }}
            >
              Already have an account?
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Signup;
