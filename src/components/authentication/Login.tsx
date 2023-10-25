import { Box, Flex, Input, InputGroup, Text } from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex gap={5} align="center" flexDir="column">
      <Text fontSize="XL" fontWeight={800}>
        Login
      </Text>
      <Flex gap={3} w="full" flexDir="column">
        <InputGroup>
          <Flex gap={2} w="full" flexDir="column">
            <Text fontWeight={600}>Email</Text>
            <Input
              borderColor="gray.700"
              _hover={{
                borderColor: "#FF4D00",
              }}
              focusBorderColor="#FF4D00"
              placeholder="Enter your email"
            />
          </Flex>
        </InputGroup>
        <InputGroup>
          <Input placeholder="Enter your account name" />
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default Login;
