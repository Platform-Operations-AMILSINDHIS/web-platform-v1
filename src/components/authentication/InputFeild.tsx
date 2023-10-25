import { Flex, Input, InputGroup, Text } from "@chakra-ui/react";

interface InputFeildProps {
  label: string;
  placeholder: string;
}

const InputFeild: React.FC<InputFeildProps> = ({ label, placeholder }) => {
  return (
    <InputGroup>
      <Flex gap={1} w="full" flexDir="column">
        <Text color="gray.700" fontWeight={600}>
          {label}
        </Text>
        <Input
          borderColor="gray.400"
          _hover={{
            borderColor: "#FF4D00",
          }}
          focusBorderColor="#FF4D00"
          placeholder={placeholder}
        />
      </Flex>
    </InputGroup>
  );
};

export default InputFeild;
