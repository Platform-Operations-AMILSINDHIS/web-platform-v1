import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phonenumber: Yup.string().required("Phone number is required"),
  accountName: Yup.string().required("Account name is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .min(0, "Age must be a positive number")
    .required("Age is required"),
});

export const LoginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Enter your password"),
});

export const AdminLoginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Enter your password"),
});

export const MatrimonyLoginValidation = Yup.object().shape({
  matrimony_id: Yup.string().required("Please Enter your assigned matrimoy ID"),
});

export const RecoveryValidation = Yup.object().shape({
  email: Yup.string().required("Enter email"),
  newPassword: Yup.string().required("Enter new Password"),
  confirmPassword: Yup.string()
    .required("Confirm new password")
    .oneOf([Yup.ref("newPassword")], "Passwords don't match"),
});

export const WithdrawMatAppValidation = Yup.object().shape({
  matrimony_id: Yup.string().required("Enter Your MAT ID"),
});
