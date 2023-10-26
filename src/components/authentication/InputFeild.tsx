// InputFeild.tsx
import { Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik"; // Import useFormikContext from formik library

interface InputFeildProps {
  label: string;
  placeholder: string;
  formikEntry: keyof Values; // Accept keyof Values representing form field key
}

interface Values {
  email: string;
  password: string;
  accountName: string;
  isKAPMember: boolean;
  isYACMember: boolean;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
}

const InputFeild: React.FC<InputFeildProps> = ({
  label,
  placeholder,
  formikEntry,
}) => {
  const { values, handleChange, handleBlur } = useFormikContext<Values>(); // Access formik context

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
          name={formikEntry}
          id={formikEntry}
          value={values[formikEntry]?.toString() || ""} // Access value using formik values
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Flex>
    </InputGroup>
  );
};

export default InputFeild;
