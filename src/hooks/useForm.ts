import { FormikConfig, useFormik } from "formik";

export interface LoginValues {
  email: string;
  password: string;
}

export interface AdminLoginValues {
  email: string;
  password: string;
}

export interface SignupValues extends LoginValues {
  phonenumber: string;
}

export interface Values extends SignupValues {
  accountName: string;
  isKAPMember: false;
  isYACMember: false;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
}

export interface RecoveryPasswordValues {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export const initialValues: Values = {
  email: "",
  phonenumber: "",
  password: "",
  accountName: "",
  isKAPMember: false,
  isYACMember: false,
  age: 0,
  gender: "",
  firstName: "",
  lastName: "",
};

export const loginInitialValues: LoginValues = {
  email: "",
  password: "",
};

export const adminInitialLoginValues: AdminLoginValues = {
  email: "",
  password: "",
};

export const RecoveryPasswordInitialValues: RecoveryPasswordValues = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};

const useForm = () => {
  return null;
};

export default useForm;
