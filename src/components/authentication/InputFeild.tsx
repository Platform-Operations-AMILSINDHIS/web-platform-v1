import { Flex, Input, InputGroup, Text } from "@chakra-ui/react";

interface InputFeildProps {
  label: string;
  placeholder: string;
}

const InputFeild: React.FC<InputFeildProps> = ({ label, placeholder }) => {
  return (
    <InputGroup>
      <Flex gap={2} w="full" flexDir="column">
        <Text fontWeight={600}>{label}</Text>
        <Input
          borderColor="gray.700"
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
