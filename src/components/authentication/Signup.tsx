import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";

import InputFeild from "./InputFeild";
import useForm from "~/hooks/useForm";

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const { formik } = useForm();

  const handleSubmit = () => {
    console.log(formik.values);
    formik.resetForm();
  };

  return (
    <Formik initialValues={formik.initialValues} onSubmit={handleSubmit}>
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
            <InputFeild
              formik={formik}
              formikEntry="email" // Pass the correct form field key here
              label="Enter your email ID"
              placeholder="xyz@gmail.com"
            />
            <InputFeild
              formik={formik}
              label="Create an account name"
              placeholder="user_XYZ@1233"
              formikEntry="accountName"
            />
            <InputFeild
              formik={formik}
              label="Create a password"
              placeholder="*********"
              formikEntry="password"
            />
            <Flex w="full" gap={3}>
              <InputFeild
                formik={formik}
                label="First name"
                placeholder="Enter first name"
                formikEntry="firstName"
              />
              <InputFeild
                formik={formik}
                label="Last name"
                placeholder="Enter first name"
                formikEntry="lastName"
              />
            </Flex>
            <Flex gap={1} flexDir="column">
              <Text fontWeight={600}>Are you a male or female ?</Text>
              <Select
                placeholder="Select a gender"
                _hover={{
                  borderColor: "#FF4D00",
                }}
                focusBorderColor="#FF4D00"
                border="1px solid"
                borderColor="gray.400"
                name="gender"
                id="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </Select>
            </Flex>
          </Flex>
          <Flex gap={3}>
            <Button
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
