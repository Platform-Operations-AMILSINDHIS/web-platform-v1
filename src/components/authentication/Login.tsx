import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import InputFeild from "./InputFeild";
import useForm from "~/hooks/useForm";
import { Form, Formik } from "formik";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const { formik } = useForm("login");

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
              Login
            </Text>
            <Text fontWeight={500} maxW={400} textAlign="center">
              Great to have you back! Enter your registered credentials to log
              into your account
            </Text>
          </Flex>
          <Flex gap={3} w="full" flexDir="column">
            <InputFeild
              formikEntry="email"
              formik={formik}
              label="Email ID"
              placeholder="Enter your email"
            />
            <InputFeild
              formikEntry="password"
              formik={formik}
              label="Password"
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
