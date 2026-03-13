interface Values {
  email: string;
  phonenumber: string;
  password: string;
  accountName: string;
  isKAPMember: false;
  isYACMember: false;
  dateOfBirth: string;
  gender: string;
  firstName: string;
  lastName: string;
}

const initialValues: Values = {
  email: "",
  phonenumber: "",
  password: "",
  accountName: "",
  isKAPMember: false,
  isYACMember: false,
  dateOfBirth: "",
  gender: "",
  firstName: "",
  lastName: "",
};

// const formik = useFormik({
//   initialValues,
//   onSubmit: (values, { setSubmitting }) => {
//     console.log("hi");
//     console.log(values);
//     setSubmitting(false);
//   },
// });

// export default formik;
