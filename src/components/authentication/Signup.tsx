import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import InputFeild from "./InputFeild";

const Signup = () => {
  return (
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
        <InputFeild label="Enter your email ID" placeholder="xyz@gmail.com" />
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
  );
};

export default Signup;
