import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  FormikHelpers,
} from "formik";
import InputFeild from "./InputFeild";
import { useState } from "react";

interface Values {
  email: string;
  password: string;
  accountName: string;
  isKAPMember: false;
  isYACMember: false;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
}

const initialValues: Values = {
  email: "",
  password: "",
  accountName: "",
  isKAPMember: false,
  isYACMember: false,
  age: 0,
  gender: "",
  firstName: "",
  lastName: "",
};

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      console.log("hi");
      console.log(values);
      setSubmitting(false);
    },
  });

  const handleSubmit = () => {
    console.log(formik.values);
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
              formikEntry="email" // Pass the correct form field key here
              label="Enter your email ID"
              placeholder="xyz@gmail.com"
              formik={formik} // Pass formik object
            />
            <InputFeild
              label="Create an account name"
              placeholder="user_XYZ@1233"
            />
            <InputFeild label="Create a password" placeholder="*********" />
            <Flex w="full" gap={3}>
              <InputFeild label="First name" placeholder="Enter first name" />
              <InputFeild label="Last name" placeholder="Enter first name" />
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
