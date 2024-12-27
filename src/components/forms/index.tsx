import { ChangeEventHandler, useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  Box,
  InputGroup,
  Icon,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import {
  Field,
  ErrorMessage,
  FieldInputProps,
  FieldMetaProps,
  FormikHelpers,
} from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const camelCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

export const LabelledInput: React.FC<{
  label: string;
  placeholder?: string;
  name?: string;
  showPasswordOption?: boolean;
  type?:
    | "text"
    | "chakra-text"
    | "date"
    | "datetime"
    | "number"
    | "select"
    | "password";
  validate?: () => string; // validation function returns error string
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  required?: boolean;
  selectOptions?: string[];
  isDisabled?: boolean;
}> = ({
  label,
  placeholder,
  name,
  type = "text",
  validate,
  onChange,
  defaultValue,
  required,
  selectOptions,
  isDisabled,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();

  return (
    <FormControl isDisabled={isDisabled} isRequired={required} fontWeight={500}>
      <FormLabel color="gray.700" fontWeight={600}>
        {label}
      </FormLabel>
      {type === "text" ? (
        <>
          <Field
            as={Input}
            id={camelCase(label)}
            name={name ?? camelCase(label)}
            validate={validate ?? undefined}
            placeholder={placeholder}
            borderColor="gray.400"
            _hover={{
              borderColor: "#FF4D00",
            }}
            focusBorderColor="#FF4D00"
          />
          <Box py={1} fontWeight={600} fontSize="sm" color="red">
            <ErrorMessage name={name ?? camelCase(label)} />
          </Box>
        </>
      ) : type === "password" ? (
        <>
          <InputGroup>
            <Field
              as={Input}
              type={showPassword ? "text" : "password"}
              id={camelCase(label)}
              name={name ?? camelCase(label)}
              validate={validate ?? undefined}
              placeholder={placeholder}
              borderColor="gray.400"
              _hover={{
                borderColor: "#FF4D00",
              }}
              focusBorderColor="#FF4D00"
            />
            <InputRightElement>
              <Icon
                boxSize={5}
                color="gray.600"
                onClick={() => setShowPassword(!showPassword)}
                as={showPassword ? FaEyeSlash : FaEye}
              />
            </InputRightElement>
          </InputGroup>
          <Flex justify="space-between" align="center" gap={2}>
            <Box py={1} fontWeight={600} fontSize="sm" color="red">
              <ErrorMessage name={name ?? camelCase(label)} />
            </Box>
          </Flex>
        </>
      ) : type === "chakra-text" ? (
        <>
          <Input
            name={name ?? camelCase(label)}
            onChange={onChange ?? undefined}
            defaultValue={defaultValue ?? undefined}
            placeholder={placeholder}
            required={required ?? false}
            borderColor="gray.400"
            _hover={{
              borderColor: "#FF4D00",
            }}
            focusBorderColor="#FF4D00"
          />
          {/* <FormErrorMessage> */}
        </>
      ) : type === "date" ? (
        // TODO: Hook up date picker component to Formik
        <>
          {/* <Flex>
        <Input
          type="date"
          variant="ghost"
          name={name ?? camelCase(label)}
          border="1px solid #E2E8F0"
          py="10px"
          borderRadius="5px"
          onChange={onChange ?? undefined}
          defaultValue={defaultValue ?? undefined}
        />
        <ErrorMessage name={name ?? camelCase(label)} />
      </Flex> */}

          {/* <Field
        as={Input}
        type="date"
        id={camelCase(label)}
        name={name ?? camelCase(label)}
        validate={validate ?? undefined}
        placeholder={placeholder}
        borderColor="gray.400"
        _hover={{
          borderColor: "#FF4D00",
        }}
        focusBorderColor="#FF4D00"
      />
      <Box py={1} fontWeight={600} fontSize="sm" color="red">
        <ErrorMessage name={name ?? camelCase(label)} />
      </Box> */}

          <Field name={name ?? camelCase(label)}>
            {({
              field,
              meta,
              form: { setFieldValue },
            }: {
              field: FieldInputProps<Date>;
              meta: FieldMetaProps<Date>;
              form: FormikHelpers<Date>;
            }) => {
              return (
                <>
                  <Input
                    // {...field}
                    type="date"
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      // Check if the input value is a valid date format
                      const isValidDate = !isNaN(
                        new Date(inputValue).getTime()
                      );

                      if (isValidDate) {
                        setFieldValue(field.name, new Date(inputValue));
                        console.log({ d: new Date(inputValue) });
                      } else {
                        toast({
                          title: "Invalid Date Input",
                          description:
                            "Please enter a valid charecter or click the calender icon to pick a date",
                          status: "warning",
                          duration: 3000,
                          isClosable: true,
                        });
                        // Optionally, reset the input value if invalid
                        e.target.value = "";
                      }
                    }}
                    value={
                      field.value
                        ? field.value.toISOString().split("T")[0]
                        : undefined
                    }
                    id={camelCase(label)}
                    placeholder={placeholder}
                    borderColor="gray.400"
                    _hover={{
                      borderColor: "#FF4D00",
                    }}
                    focusBorderColor="#FF4D00"
                  />
                  <Box py={1} fontWeight={600} fontSize="sm" color="red">
                    <ErrorMessage name={name ?? camelCase(label)} />
                  </Box>
                </>
              );
            }}
          </Field>
        </>
      ) : type === "datetime" ? (
        <Field name={name ?? camelCase(label)}>
          {({
            field,
            form: { setFieldValue },
          }: {
            field: FieldInputProps<string>;
            form: FormikHelpers<string>;
          }) => (
            <Input
              type="datetime-local"
              variant="outline"
              name={field.name}
              borderRadius="5px"
              borderColor="gray.400"
              _hover={{
                borderColor: "#FF4D00",
              }}
              focusBorderColor="#FF4D00"
              onChange={(e) => {
                void setFieldValue(field.name, e.target.value);
              }}
              value={field.value}
            />
          )}
        </Field>
      ) : type === "number" ? (
        <>
          <Field
            as={Input}
            type="number"
            id={camelCase(label)}
            name={name ?? camelCase(label)}
            placeholder={placeholder}
            validate={validate ?? undefined}
            _hover={{
              borderColor: "#FF4D00",
            }}
            focusBorderColor="#FF4D00"
            borderColor="gray.400"
            color="gray.700"
          />
          <Box py={1} fontWeight={600} fontSize="sm" color="red">
            <ErrorMessage name={name ?? camelCase(label)} />
          </Box>
        </>
      ) : type === "select" ? (
        <>
          <Field
            as={Select}
            variant="ghost"
            name={name ?? camelCase(label)}
            borderRadius="5px"
            // onChange={onChange ?? undefined}
            defaultValue={defaultValue ?? undefined}
            placeholder={placeholder}
            focusBorderColor="#FF4D00"
            border="1px solid"
            borderColor="gray.400"
            color="gray.700"
            _hover={{
              borderColor: "#FF4D00",
            }}
          >
            {selectOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
          <Box py={1} fontWeight={600} fontSize="sm" color="red">
            <ErrorMessage name={name ?? camelCase(label)} />
          </Box>
        </>
      ) : (
        // </Flex>
        <></>
      )}
    </FormControl>
  );
};

// export const FormObserver: React.FC = () => {
//   const { values } = useFormikContext();

//   useEffect(() => {
//     console.log("FormObserver::values", values);
//   }, [values]);

//   return null;
// };

// // TODO: Turn this into a hook which accepts a type and a stateSetter
// // which takes in that type and sets it to global formState
// export const FormGlobalStateSetter: React.FC<{
//   /* eslint-disable  @typescript-eslint/no-explicit-any */
//   stateSetter: (...args: any[]) => any;
// }> = ({ stateSetter }) => {
//   const { values } = useFormikContext();

//   useEffect(() => {
//     // console.log("FormObserver::values", values);
//     stateSetter(values);
//   }, [stateSetter, values]);

//   return null;
// };
