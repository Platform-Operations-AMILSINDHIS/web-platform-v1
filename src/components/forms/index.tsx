import { ChangeEvent, ChangeEventHandler, useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, ErrorMessage, useFormikContext } from "formik";

import { GrDocument } from "react-icons/gr";

export const camelCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

export const LabelledInput: React.FC<{
  label: string;
  name?: string;
  type?: "text" | "chakra-text" | "date" | "datetime" | "number" | "select";
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
    <FormLabel fontSize="md" fontWeight="normal">
      {label}
    </FormLabel>
    {type === "text" ? (
      <>
        <Field
          as={Input}
          id={camelCase(label)}
          name={name ?? camelCase(label)}
          validate={validate ?? undefined}
          py="30px"
          borderRadius="5px"
        />
        <ErrorMessage name={name ?? camelCase(label)} />
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
        validate={validate ?? undefined}
        py="30px"
        borderRadius="5px"
      />
    ) : type === "select" ? (
      // <Flex border="1px solid #E2E8F0" borderRadius="5px" py="10px">
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
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const currentFile = event.target.files[0];
      setFile(currentFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

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
    <div className="min-h-screen space-y-12 bg-slate-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-24">
        <h2 className="text-base font-semibold leading-7 text-white">
          Admin Panel
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Upload the latest version of the pdf file.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="pdf-file"
              className="block text-sm font-medium leading-6 text-white"
            >
              PDF
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
              <div className="text-center">
                <GrDocument
                  className="mx-auto h-12 w-12 text-gray-500"
                  aria-hidden="true"
                />
                <div className="mt-4 text-sm leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      id="file-upload"
                      name="file-upload"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-400">
                  {file?.name ? file.name : "PDF up to 100MB"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => void handleUpload()}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
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
