// Signup.tsx - Fixed validation logic
import { Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import { useState } from "react";
import type { Dispatch } from "react";

import axios from "axios";

import { initialValues } from "~/hooks/useForm";
import type { Values } from "~/hooks/useForm";
import { LabelledInput } from "../forms";
import { SignUpValidationSchema } from "~/validations/AuthValidations";
import type { SetStateAction } from "jotai";

interface SignupProps {
  signUpFormValues: Values | null;
  setSignUpFormValues: Dispatch<SetStateAction<Values | null>>;
  authStateHandleFunction: (
    authState: "login" | "signup" | "forgotPassword" | "addprofilepic"
  ) => void;
}

const Signup: React.FC<SignupProps> = ({
  signUpFormValues,
  setSignUpFormValues,
  authStateHandleFunction,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    try {
      setSubmitting(true);
      const isReturningFromNextStep = !!signUpFormValues;

      // Determine if email needs validation
      // Only validate if: (1) first time submitting, or (2) email was changed after going back
      const needsEmailValidation =
        !isReturningFromNextStep ||
        (isReturningFromNextStep && values.email !== signUpFormValues.email);

      // Validate email if needed
      if (needsEmailValidation) {
        const validateEmailResponse = await axios.post<{
          trigger: boolean;
          email_server_validate_message: string;
        }>("/api/auth/signupvalidation/mail", {
          email: values.email,
        });

        const { trigger, email_server_validate_message } =
          validateEmailResponse.data;

        if (trigger) {
          setErrors({ email: email_server_validate_message });
          setSubmitting(false);
          return;
        }
      }

      // All validations passed, save form values and move to next step
      setSignUpFormValues(values);
      authStateHandleFunction("addprofilepic");
      setSubmitting(false);
    } catch (err: unknown) {
      alert(`Error occurred: ${err as string}`);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={signUpFormValues ? signUpFormValues : initialValues}
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
              type="password"
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
              type="date"
              label="Date of birth"
              name="dateOfBirth"
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
              Next
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
