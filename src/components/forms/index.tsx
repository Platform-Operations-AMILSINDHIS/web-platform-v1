import { ChangeEvent, ChangeEventHandler, useEffect } from "react";

import { FormControl, FormLabel, Input, Flex, Select } from "@chakra-ui/react";
import { Field, FieldProps, useField, useFormikContext } from "formik";

export const camelCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

export const LabelledInput: React.FC<{
  label: string;
  name?: string;
  type?: string;
  validate?: () => string; // validation function returns error string
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  selectOptions?: string[];
}> = ({
  label,
  name,
  type = "text",
  validate,
  onChange,
  defaultValue,
  selectOptions,
}) => (
  <FormControl>
    <FormLabel fontSize="sm" fontWeight="light">
      {label}
    </FormLabel>
    {type === "text" ? (
      <Field
        as={Input}
        id={camelCase(label)}
        name={name ?? camelCase(label)}
        validate={validate ?? undefined}
        py="30px"
        borderRadius="5px"
      />
    ) : type === "chakra-text" ? (
      <Input
        name={name ?? camelCase(label)}
        py="30px"
        borderRadius="5px"
        onChange={onChange ?? undefined}
        defaultValue={defaultValue ?? undefined}
      />
    ) : type === "date" ? (
      // TODO: Hook up date picker component to Formik
      <Flex border="1px solid #E2E8F0" borderRadius="5px" py="10px">
        <Input
          type="date"
          variant="ghost"
          name={name ?? camelCase(label)}
          borderRadius="5px"
          onChange={onChange ?? undefined}
          defaultValue={defaultValue ?? undefined}
        />
      </Flex>
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
      <Input
        type="number"
        name={name ?? camelCase(label)}
        py="30px"
        borderRadius="5px"
        onChange={onChange ?? undefined}
        defaultValue={defaultValue ?? undefined}
      />
    ) : type === "select" ? (
      <Flex border="1px solid #E2E8F0" borderRadius="5px" py="10px">
        <Field
          as={Select}
          variant="ghost"
          name={name ?? camelCase(label)}
          borderRadius="5px"
          onChange={onChange ?? undefined}
          defaultValue={defaultValue ?? undefined}
        >
          {selectOptions?.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </Field>
      </Flex>
    ) : (
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

// const DatePickerField = ({ ...props }) => {
//   const [field, , { setValue }] = useField(props);

//   return (
//     <ChakraDatePicker
//       {...field}
//       initialValue={new Date()}
//       onDateChange={(date: Date | null) => {
//         setValue(date).catch(console.error);
//       }}
//     />
//   );
// };
