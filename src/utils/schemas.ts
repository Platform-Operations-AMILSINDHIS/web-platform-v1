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
  paymentTransactionId: Yup.string().required(
    "Enter your payment transaction id"
  ),
});

export const matrimonyPersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required("Last Name is required"),
  dateAndTimeOfBirth: Yup.string().required(
    "Date And Time Of Birth is required"
  ),
  placeOfBirth: Yup.string().required("Place Of Birth is required"),
  mobileNumber: Yup.string().required("Mobile Number is required"),
  emailId: Yup.string()
    .email("Invalid Email Id")
    .required("Email Id is required"),
  occupation: Yup.string().required("Occupation is required"),
  incomePerAnnum: Yup.number()
    .required("Income Per Annum is required")
    .nullable(),
  gender: Yup.mixed().oneOf(["Male", "Female"]).required("Gender is required"),
  maritalStatus: Yup.mixed()
    .oneOf(["Single", "Divorcee", "Widower", "Widow"])
    .required("Marital Status is required"),
  manglik: Yup.mixed()
    .oneOf(["Yes", "No"])
    .required("Selecting a Manglik state is required"),
  heightFeet: Yup.number().required("Height in Feet is required"),
  heightInches: Yup.number().required("Height in Inches is required"),
  weight: Yup.number().required("Weight is required"),
  qualifications: Yup.string().required("Qualifications are required"),
  hobbies: Yup.string().required("Hobbies are required"),
  complexionAndFeatures: Yup.string().required(
    "Complexion And Features are required"
  ),
});

export const residentialAddressDetailsSchema = Yup.object().shape({
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string().required("Address Line 2 is required"),
  addressLine3: Yup.string(),
  pinCode: Yup.string().required("PIN Code is required"),
});

export const matrimonySpousePreferencesSchema = Yup.object().shape({
  working: Yup.mixed()
    .oneOf(["Yes", "No"])
    .required("Working state is required"),
  dietaryPreference: Yup.mixed()
    .oneOf(["Veg", "Non-veg"])
    .required("Dietary Preference is required"),
  qualificationRequirements: Yup.string().required(
    "Qualification Requirements are required"
  ),
  complexion: Yup.string().required("Complexion is required"),
  heightFeet: Yup.number().required("Height in Feet is required"),
  heightInches: Yup.number().required("Height in Inches is required"),
  weight: Yup.number().required("Weight is required"),
  horoscopeMatching: Yup.mixed()
    .oneOf(["Yes", "No"])
    .required("Horoscope matching selection is required"),
  build: Yup.mixed()
    .oneOf(["Medium", "Slim", "Healthy"])
    .required("Build selection is required"),
  siblings: Yup.mixed()
    .oneOf(["Yes", "No"])
    .required("Siblings selection is required"),
});

export const matrimonyFormValuesSchema = Yup.object().shape({
  personalInfo: matrimonyPersonalInfoSchema,
  familyMembers: Yup.array().of(familyMemberSchema),
  residentialAddressDetails: residentialAddressDetailsSchema,
  spousePreferences: matrimonySpousePreferencesSchema,
  proposerInfo: proposerInfoSchema,
});
