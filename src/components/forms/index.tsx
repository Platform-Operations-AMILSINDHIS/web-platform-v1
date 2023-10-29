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
  Container,
} from "@chakra-ui/react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";

import { GrDocument } from "react-icons/gr";

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
          // py="10px"
          // borderRadius="5px"
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
        <Flex>
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
        </Flex>
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

export const UploadFile: React.FC = () => {
  // const [file, setFile] = useState<File>();

  const [formState, setFormState] = useState<{
    donorName: string;
    contactNumber: string;
    email: string;
  }>();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const currentFile = event.target.files[0];
  //     // setFile(currentFile);
  //   }
  // };

  const handleUpload = async () => {
    if (!acceptedFiles || acceptedFiles?.length < 2) return;

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]!);
    formData.append("file", acceptedFiles[1]!);

    const response = await fetch("/api/upload", {
      method: "POST",
    });

    const { url } = (await response.json()) as { url: string };

    await fetch(url, {
      method: "PUT",
      body: formData,
    });
  };

  return (
    <Box>
      {/* <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag & drop some file here, or click to select a file</p>
      </div> */}
      <Flex
        h="8rem"
        w="22rem"
        bgColor="rgba(251, 31, 255, 0.07)"
        border="2px dashed #FB1FFF"
        borderRadius="10px"
        direction="column"
        justifyContent="center"
        alignItems="center"
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length > 0 ? (
          <Flex alignItems="center" gap="0.35rem">
            <GrDocument size="1.5rem" />
            <Text>{acceptedFiles[0]!.name}</Text>
          </Flex>
        ) : (
          <Text>Drag & drop your files here or choose files</Text>
        )}
      </Flex>
    </Box>
  );
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
