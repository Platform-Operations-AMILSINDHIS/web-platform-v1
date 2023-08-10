import { ChangeEvent, ChangeEventHandler, useEffect } from "react";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, FieldProps, useField, useFormikContext } from "formik";
import { DatePicker as ChakraDatePicker } from "@orange_digital/chakra-datepicker";

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
}> = ({ label, name, type = "text", validate, onChange, defaultValue }) => (
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
      // <DatePickerField label={label} name={name ?? camelCase(label)} />
      // TODO: Make/Add date picker component which looks like other Chakra UI + works with Formik
      <Field
        style={{ padding: "30px 10px" }}
        as={Input}
        type="date"
        name={name ?? camelCase(label)}
        borderRadius="5px"
        onChange={onChange ?? undefined}
        defaultValue={defaultValue ?? new Date().toISOString().slice(0, 10)}
      />
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
