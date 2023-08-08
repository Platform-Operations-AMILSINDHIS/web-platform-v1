import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, FieldProps, useField } from "formik";
import { DatePicker as ChakraDatePicker } from "@orange_digital/chakra-datepicker";

const camelCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

export const LabelledInput: React.FC<{
  label: string;
  name?: string;
  type?: string;
  validate?: () => string; // validation function returns error string
}> = ({ label, name, type = "text", validate }) => (
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
    ) : type === "date" ? (
      // <DatePickerField label={label} name={name ?? camelCase(label)} />
      <div>date picker</div>
    ) : (
      <></>
    )}
  </FormControl>
);

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
