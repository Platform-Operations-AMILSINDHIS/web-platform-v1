import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import InputFeild from "./InputFeild";

const Login = () => {
  return (
    <Flex py={5} px={2} gap={6} align="center" flexDir="column">
      <Flex gap={3} align="center" flexDir="column">
        <Text fontSize="25px" fontWeight={800}>
          Login
        </Text>
        <Text fontWeight={500} maxW={400} textAlign="center">
          Please provide your details to create your account and get started on
          our platform
        </Text>
      </Flex>
      <Flex gap={3} w="full" flexDir="column">
        <InputFeild label="Email ID" placeholder="Enter your email" />
        <InputFeild
          label="Account Name"
          placeholder="Enter your account name"
        />
        <Flex fontWeight={500} w="full" justify="space-between" align="center">
          <Flex gap={2}>
            <Checkbox />
            <Text>Remember me</Text>
          </Flex>
          <Text>Forgot password ?</Text>
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
  );
};

export default Login;
