import {
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";

import InputFeild from "./InputFeild";
import useForm from "~/hooks/useForm";
import axios from "axios";

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const { formik } = useForm("signup");

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await axios.post("/api/auth/signup", {
        email: formik.values.email,
        password: formik.values.password,
        phonenumber: formik.values.phonenumber,
      });
      const data = await response.data;
      console.log(data);
      setSubmitting(false);
      formik.resetForm();
    } catch (err) {
      alert(`Error occured during submission : ${err}`);
    }
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
              formikEntry="phone" // Pass the correct form field key here
              label="Phone number"
              placeholder="+91 xxxx"
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
            <Flex gap={1} w="full" flexDir="column">
              <Text fontWeight={600}>Enter your age</Text>
              <NumberInput
                _hover={{
                  borderColor: "#FF4D00",
                }}
                focusBorderColor="#FF4D00"
                borderColor="gray.400"
                name="age"
                id="age"
                value={formik.values.age}
                onChange={(value) => {
                  const age = parseInt(value, 10);
                  formik.setFieldValue("age", age); // Set the Formik value for age
                }}
                onBlur={formik.handleBlur}
                defaultValue={15}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
