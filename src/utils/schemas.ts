import { z } from "zod";
import * as Yup from "yup";

export const familyMemberSchema = Yup.object().shape({
  memberName: Yup.string(),
  relationship: Yup.string(),
  occupation: Yup.string(),
  age: Yup.number().nullable().positive("Age must be a positive number"),
});

export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  occupation: Yup.string().required("Occupation is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  mobileNumber: Yup.string()
    .matches(
      /^(?:\+\d{1,3}[-\s]?)?(?:\d{1,4}[-\s]?)?(?:\(\d{1,4}\))?(?:[\d\s]{10,})$/,
      "Invalid phone number format"
    )
    .required("Mobile Number is required"),
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email ID is required"),
  maidenSurname: Yup.string(),
  maidenName: Yup.string(),
  fathersName: Yup.string(),
  mothersName: Yup.string(),
});

export const addressInfoSchema = Yup.object().shape({
  residentialAddress: Yup.object().shape({
    addressLine1: Yup.string().required(
      "Residential Address Line 1 is required"
    ),
    addressLine2: Yup.string().required(
      "Residential Address Line 2 is required"
    ),
    addressLine3: Yup.string(),
    pinCode: Yup.string().required("Residential Pin Code is required"),
  }),
  officeAddress: Yup.object()
    .shape({
      addressLine1: Yup.string().required("Office Address Line 1 is required"),
      addressLine2: Yup.string().required("Office Address Line 2 is required"),
      addressLine3: Yup.string(),
      pinCode: Yup.string().required("Office Pin Code is required"),
    })
    .optional(),
});

export const kapMembershipInfoSchema = Yup.object().shape({
  membershipType: Yup.string()
    .oneOf(["patron", "life-member"], "Invalid membership type")
    .nullable(),
});

export const proposerInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  mobileNumber: Yup.string()
    .matches(
      /^(?:\+\d{1,3}[-\s]?)?(?:\d{1,4}[-\s]?)?(?:\(\d{1,4}\))?(?:[\d\s]{10,})$/,
      "Invalid phone number format"
    )
    .required("Mobile Number is required"),
});

export const kapMembershipFormValuesSchema = Yup.object().shape({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  membershipInfo: kapMembershipInfoSchema,
  familyMembers: Yup.array().of(familyMemberSchema).optional(),
  proposerInfo: proposerInfoSchema,
});

export const yacMembershipFormValuesSchema = Yup.object().shape({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  familyMembers: Yup.array().of(familyMemberSchema).optional(),
  proposerInfo: proposerInfoSchema,
});

export const donationsFormSchema = Yup.object().shape({
  donorName: Yup.string().required("Donor Name is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  panCard: Yup.mixed().required("PAN Card is required"),
  addressProof: Yup.mixed().required("Address Proof is required"),
});
