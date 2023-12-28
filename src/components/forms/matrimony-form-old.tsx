import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Grid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  Flex,
  Spacer,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { FaHandHoldingHeart, FaUserFriends } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

import {
  LabelledInput,
  FormObserver,
  FormGlobalStateSetter,
  camelCase,
} from "./index";

import type {
  MatrimonyFormValues,
  PersonalInfo,
  ResidentialAddressDetails,
  SpousePreferences,
} from "~/types/forms/matrimony";

import type { FamilyMember, ProposerInfo } from "~/types/forms/membership";

import {
  FamilyMemberDetailsSection,
  ProposerDetailsSection,
} from "./kap-membership-form";

import { Formik, Form } from "formik";

import type { InputType } from "./kap-membership-form";

const MatrimonyForm: React.FC<{
  activeStep: number;
}> = ({ activeStep }) => {
  const [formState, setFormState] = useState<MatrimonyFormValues>({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateAndTimeOfBirth: new Date(),
      placeOfBirth: "",
      mobileNumber: "",
      emailId: "",
      occupation: "",
      incomePerAnnum: null,

      gender: null,
      maritalStatus: null,
      manglik: null,

      heightFeet: null,
      heightInches: null,
      weight: null,

      qualifications: [], // educational and other sorts of qualifications
      hobbies: "",
      complexionAndFeatures: "",
    },
    residentialAddressDetails: {
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      pinCode: "",
    },
    familyMembers: [
      {
        memberName: "",
        relationship: "",
        occupation: "",
        age: null,
      },
    ],
    spousePreferences: {
      working: null,
      dietaryPreference: null,
      qualificationRequirements: "",
      complexion: "",
      heightFeet: null,
      heightInches: null,
      weight: null,
      horoscopeMatching: null,
      build: null,
      siblings: null,
    },
    proposerInfo: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
    },
  });

  // // Logger
  // useEffect(() => console.log(JSON.stringify(formState, null, 2)), [formState]);

  return (
    <>
      {activeStep === 1 && (
        <MatrimonyPersonalInformationSection
          initialValues={formState.personalInfo}
          stateSetter={(values: PersonalInfo) =>
            setFormState({ ...formState, personalInfo: values })
          }
        />
      )}

      {activeStep === 2 && (
        <FamilyMemberDetailsSection
          initialValues={formState.familyMembers ?? []}
          stateSetter={(values: FamilyMember[]) =>
            setFormState({ ...formState, familyMembers: values })
          }
        />
      )}

      {activeStep === 3 && (
        <MatrimonyAddressDetailsSection
          initialValues={formState.residentialAddressDetails}
          stateSetter={(values: ResidentialAddressDetails) =>
            setFormState({ ...formState, residentialAddressDetails: values })
          }
        />
      )}
      {activeStep === 4 && (
        <SpousePreferencesSection
          initialValues={formState.spousePreferences}
          stateSetter={(values: SpousePreferences) =>
            setFormState({ ...formState, spousePreferences: values })
          }
        />
      )}

      {activeStep === 5 && (
        <ProposerDetailsSection
          initialValues={formState.proposerInfo}
          stateSetter={(values: ProposerInfo) =>
            setFormState({ ...formState, proposerInfo: values })
          }
        />
      )}
    </>
  );
};

const MatrimonyPersonalInformationSection: React.FC<{
  initialValues: PersonalInfo;
  stateSetter: (values: PersonalInfo) => void;
}> = ({ initialValues, stateSetter }) => {
  return (
    <>
      <Heading>Personal Information</Heading>
      <Text mt="1.5rem" maxW="2xl" color="#1F2937">
        Fill out the fields below to complete your matrimony profile, make sure
        to fill all the fields and not miss out on any important details.
      </Text>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <FormGlobalStateSetter stateSetter={stateSetter} />
          <Grid
            mt="2rem"
            gap="2rem"
            templateColumns={["1fr", "repeat(3, 1fr)"]}
          >
            {[
              { label: "First Name" },
              { label: "Middle Name" },
              { label: "Last Name" },
              {
                label: "Date & Time of Birth",
                name: "dateAndTimeOfBirth",
                inputType: "datetime",
              },
              { label: "Place of Birth" },
              { label: "Mobile Number" },
              { label: "Email ID" },
              { label: "Occupation" },
              { label: "Income per Annum", inputType: "number" },
            ].map(({ label, name, inputType }, i) => (
              <LabelledInput
                key={i}
                label={label}
                name={name ?? undefined}
                type={inputType ? (inputType as InputType) : "text"}
              />
            ))}
          </Grid>

          <Grid
            mt="2rem"
            gap="2rem"
            templateColumns={["1fr", "repeat(3, 1fr)"]}
          >
            {[
              {
                label: "Gender",
                inputType: "select",
                selectOptions: ["Male", "Female"],
              },
              {
                label: "Marital Status",
                inputType: "select",
                selectOptions: ["Single", "Divorcee", "Widower", "Widow"],
              },
              {
                label: "Manglik",
                inputType: "select",
                selectOptions: ["Yes", "No"],
              },
            ].map(({ label, inputType, selectOptions }, i) => (
              <LabelledInput
                key={i}
                type={inputType ? (inputType as InputType) : "text"}
                label={label}
                selectOptions={selectOptions}
              />
            ))}
          </Grid>

          <Grid
            mt="2rem"
            gap="2rem"
            templateColumns={["1fr", "repeat(3, 1fr)"]}
          >
            {[
              {
                label: "Height in Feet",
                name: "heightFeet",
                inputType: "number",
              },
              {
                label: "Height in Inches",
                name: "heightInches",
                inputType: "number",
              },
              {
                label: "Weight (in Kg)",
                name: "weight",
                inputType: "number",
              },
            ].map(({ label, name, inputType }, i) => (
              <LabelledInput
                key={i}
                type={inputType ? (inputType as InputType) : "text"}
                label={label}
              />
            ))}
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

const MatrimonyAddressDetailsSection: React.FC<{
  initialValues: ResidentialAddressDetails;
  stateSetter: (values: ResidentialAddressDetails) => void;
}> = ({ initialValues, stateSetter }) => {
  return (
    <>
      <Heading>Residential Address</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <FormGlobalStateSetter stateSetter={stateSetter} />
          <Grid
            mt="2rem"
            gap="2rem"
            templateColumns={["1fr", "repeat(2, 1fr)"]}
          >
            {[
              {
                label: "Address Line 1",
                name: "residentialAddress.addressLine1",
              },
              {
                label: "Address Line 2",
                name: "residentialAddress.addressLine2",
              },
              {
                label: "Address Line 3",
                name: "residentialAddress.addressLine3",
              },
              { label: "Pin Code", name: "residentialAddress.pinCode" },
            ].map(({ label, name }, i) => (
              <LabelledInput key={i} label={label} />
            ))}
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

const SpousePreferencesSection: React.FC<{
  initialValues: SpousePreferences;
  stateSetter: (values: SpousePreferences) => void;
}> = ({ initialValues, stateSetter }) => {
  return (
    <>
      <Heading>Spouse Preferences</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <FormGlobalStateSetter stateSetter={stateSetter} />
          <Grid
            mt="2rem"
            gap="2rem"
            templateColumns={["1fr", "repeat(3, 1fr)"]}
          >
            {[
              {
                label: "Working",
                inputType: "select",
                selectOptions: ["Yes", "No"],
              },
              {
                label: "Dietary Preference",
                inputType: "select",
                selectOptions: ["Veg", "Non-veg"],
              },
              { label: "Qualification Requirements" },
              { label: "Complexion" },
              {
                label: "Height in Feet",
                name: "heightFeet",
                inputType: "number",
              },
              {
                label: "Height in Inches",
                name: "heightInches",
                inputType: "number",
              },
              {
                label: "Weight (in Kg)",
                name: "weight",
                inputType: "number",
              },
              {
                label: "Horoscope Matching Required",
                inputType: "select",
                selectOptions: ["Yes", "No"],
              },
              {
                label: "Build",
                inputType: "select",
                selectOptions: ["Medium", "Slim", "Healthy"],
              },
              {
                label: "Siblings",
                inputType: "select",
                selectOptions: ["Yes", "No"],
              },
            ].map(({ label, inputType, selectOptions }, i) => (
              <LabelledInput
                key={i}
                type={inputType ? (inputType as InputType) : "text"}
                label={label}
                selectOptions={selectOptions}
              />
            ))}
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default MatrimonyForm;
