import { ChangeEvent, ChangeEventHandler, useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  FormErrorMessage,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  Field,
  ErrorMessage,
  useFormikContext,
  FieldInputProps,
  FieldMetaProps,
  FieldHelperProps,
  FormikHelpers,
} from "formik";

export const camelCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

export const LabelledInput: React.FC<{
  label: string;
  placeholder?: string;
  name?: string;
  type?: "text" | "chakra-text" | "date" | "datetime" | "number" | "select";
  validate?: () => string; // validation function returns error string
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  selectOptions?: string[];
}> = ({
  label,
  placeholder,
  name,
  type = "text",
  validate,
  onChange,
  defaultValue,
  selectOptions,
}) => (
  <FormControl fontWeight={500}>
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
    ) : type === "chakra-text" ? (
      <>
        <Input
          name={name ?? camelCase(label)}
          py="30px"
          borderRadius="5px"
          onChange={onChange ?? undefined}
          defaultValue={defaultValue ?? undefined}
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
                    void setFieldValue(field.name, new Date(e.target.value));
                    console.log({ d: new Date(e.target.value) });
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
      <Flex border="1px solid #E2E8F0" borderRadius="5px" py="10px">
        <Input
          type="datetime-local"
          variant="ghost"
          name={name ?? camelCase(label)}
          borderRadius="5px"
          onChange={onChange ?? undefined}
          defaultValue={defaultValue ?? undefined}
        />
      </Flex>
    ) : type === "number" ? (
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
      />
    ) : type === "select" ? (
      // <Flex border="1px solid #E2E8F0" borderRadius="5px" py="10px">
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
        _hover={{
          borderColor: "#FF4D00",
        }}
      >
        {selectOptions?.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </Field>
    ) : (
      // </Flex>
      <></>
    )}
  </FormControl>
);

export const FormObserver: React.FC = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log("FormObserver::values", values);
  }, [values]);

  return null;
};

// TODO: Turn this into a hook which accepts a type and a stateSetter
// which takes in that type and sets it to global formState
export const FormGlobalStateSetter: React.FC<{
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  stateSetter: (...args: any[]) => any;
}> = ({ stateSetter }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    // console.log("FormObserver::values", values);
    stateSetter(values);
  }, [values]);

  return null;
};
