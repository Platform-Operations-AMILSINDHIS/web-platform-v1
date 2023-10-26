import { FormikConfig, useFormik } from "formik";

interface Values {
  email: string;
  password: string;
  accountName: string;
  isKAPMember: false;
  isYACMember: false;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
}

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
  accountName: "",
  isKAPMember: false,
  isYACMember: false,
  age: 0,
  gender: "",
  firstName: "",
  lastName: "",
};

const loginInitialValues: LoginValues = {
  email: "",
  password: "",
};

const useForm = (formType: "signup" | "login"): FormikConfig => {
  const formik = useFormik({
    initialValues: formType === "signup" ? initialValues : loginInitialValues,
    onSubmit: (values, { setSubmitting }) => {
      console.log("hi");
      console.log(values);
      setSubmitting(false);
    },
  });

  return { formik };
};

export default useForm;
