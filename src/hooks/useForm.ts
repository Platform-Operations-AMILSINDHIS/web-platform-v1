import { useFormik } from "formik";

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

const useForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      console.log("hi");
      console.log(values);
      setSubmitting(false);
    },
  });

  return { formik };
};

export default useForm;
