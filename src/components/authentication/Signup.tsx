import {
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import InputFeild from "./InputFeild";
import useForm from "~/hooks/useForm";
import axios from "axios";
import { LabelledInput } from "../forms";

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const { formik } = useForm("signup");

  // useEffect to observe changes in userData
  useEffect(() => {
    console.log("userData updated:", userData);
  }, [userData]);

  const dbUpdation = async (auth_id: string) => {
    try {
      const response = await axios.post("/api/auth/db", {
        email_id: formik.values.email,
        account_name: formik.values.accountName,
        KAP_member: false,
        YAC_member: false,
        age: formik.values.age,
        membership_id: "",
        gender: formik.values.gender,
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        authID: auth_id,
      });
      const data = await response.data;
      await setAuthenticated(data.authenticated);
      console.log({ message: data.message, authenticated });
    } catch (error) {
      alert(`Error occured during submission : ${error}`);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await axios.post("/api/auth/signup", {
        email: formik.values.email,
        password: formik.values.password,
        phonenumber: formik.values.phonenumber,
      });
      const data = await response.data;
      await setUserData(data);
      setSubmitting(false);
      console.log({ Values: formik.values, userData });
      formik.resetForm();
    } catch (err) {
      alert(`Error occured during submission : ${err}`);
    }
  };

  return (
    <Formik
      initialValues={formik.initialValues}
      // onSubmit={handleSubmit}
      onSubmit={console.log}
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
            {/* <Flex gap={1} flexDir="column">
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
            </Flex> */}

            <LabelledInput
              type="select"
              label="Are you a male or female?"
              name="gender"
              placeholder="Select a gender"
              selectOptions={["Male", "Female"]}
              // onCha
            />

            {/* <Flex gap={1} w="full" flexDir="column">
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
              </Flex> */}

            <LabelledInput
              type="number"
              label="Enter your age"
              name="age"
              placeholder="0"
              defaultValue="0"
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
