// InputFeild.tsx
import { Flex, Input, InputGroup, Text } from "@chakra-ui/react";

interface Values {
  email: string;
  phone: number;
  password: string;
  accountName: string;
  isKAPMember: boolean;
  isYACMember: boolean;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  formik: {
    values: Values;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  formikEntry: keyof Values;
}

const InputFeild: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  formikEntry,
  formik,
}) => {
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
          value={formik.values[formikEntry]?.toString() || ""} // Access value using formik values
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={formikEntry}
          id={formikEntry}
        />
      </Flex>
    </InputGroup>
  );
};

export default InputFeild;
