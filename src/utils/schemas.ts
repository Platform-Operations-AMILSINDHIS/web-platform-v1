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
  maidenSurname: Yup.string().required("Maiden Surname is required"),
  maidenName: Yup.string().required("Maiden Name is required"),
  fathersName: Yup.string().required("Fathers Name is required"),
  mothersName: Yup.string().required("Mothers Name is required"),
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
      addressLine1: Yup.string(),
      addressLine2: Yup.string(),
      addressLine3: Yup.string(),
      pinCode: Yup.string(),
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
    .required("Mobile Number is required")
    .matches(
      /^(?:\+\d{1,3}[-\s]?)?(?:\d{1,4}[-\s]?)?(?:\(\d{1,4}\))?(?:[\d\s]{10,})$/,
      "Invalid phone number format"
    ),
});

export const kapMembershipFormValuesSchema = Yup.object().shape({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  familyMembers: Yup.array().of(familyMemberSchema).optional(),
  proposerInfo: proposerInfoSchema,
  membershipInfo: kapMembershipInfoSchema,
});

export const yacMembershipFormValuesSchema = Yup.object().shape({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  familyMembers: Yup.array().of(familyMemberSchema).optional(),
  proposerInfo: proposerInfoSchema,
});

export const donationsFormSchema = Yup.object().shape({
  amount: Yup.number().required("Donation Amount is required"),
  donorName: Yup.string().required("Donor Name is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  panCard: Yup.string().url().required("PAN Card URL is required"),
  addressProof: Yup.string().url().required("Address Proof URL is required"),
});

export const matrimonyPersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().required("Middle Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  dateAndTimeOfBirth: Yup.date().required("Date And Time Of Birth is required"),
  placeOfBirth: Yup.string().required("Place Of Birth is required"),
  mobileNumber: Yup.string().required("Mobile Number is required"),
  emailId: Yup.string()
    .email("Invalid Email Id")
    .required("Email Id is required"),
  occupation: Yup.string().required("Occupation is required"),
  incomePerAnnum: Yup.number().nullable(),
  gender: Yup.mixed().oneOf(["male", "female"]).nullable(),
  maritalStatus: Yup.mixed()
    .oneOf(["single", "divorcee", "windower", "widow"])
    .nullable(),
  manglik: Yup.mixed().oneOf(["yes", "no"]).nullable(),
  heightFeet: Yup.number().nullable(),
  heightInches: Yup.number().nullable(),
  weight: Yup.number().nullable(),
  qualifications: Yup.array()
    .of(Yup.string())
    .required("Qualifications are required"),
  hobbies: Yup.string().required("Hobbies are required"),
  complexionAndFeatures: Yup.string().required(
    "Complexion And Features are required"
  ),
});

export const residentialAddressDetailsSchema = Yup.object().shape({
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string().required("Address Line 2 is required"),
  addressLine3: Yup.string().required("Address Line 3 is required"),
  pinCode: Yup.string().required("PIN Code is required"),
});

export const matrimonySpousePreferencesSchema = Yup.object().shape({
  working: Yup.boolean().nullable(),
  dietaryPreference: Yup.mixed().oneOf(["veg", "non-veg"]).nullable(),
  qualificationRequirements: Yup.string().required(
    "Qualification Requirements are required"
  ),
  complexion: Yup.string().required("Complexion is required"),
  heightFeet: Yup.number().nullable(),
  heightInches: Yup.number().nullable(),
  weight: Yup.number().nullable(),
  horoscopeMatching: Yup.mixed().oneOf(["yes", "no"]).nullable(),
  build: Yup.mixed().oneOf(["medium", "slim", "healthy"]).nullable(),
  siblings: Yup.mixed().oneOf(["yes", "no"]).nullable(),
});

export const matrimonyFormValuesSchema = Yup.object().shape({
  personalInfo: matrimonyPersonalInfoSchema,
  familyMembers: Yup.array().of(familyMemberSchema),
  residentialAddressDetails: residentialAddressDetailsSchema,
  spousePreferences: matrimonySpousePreferencesSchema,
  proposerInfo: proposerInfoSchema,
});
