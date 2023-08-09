import React, { useState, useEffect, ChangeEvent } from "react";
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
} from "~/types/forms/matrimony";

import { Formik, Form } from "formik";

import {
  PersonalInformationSection,
  AddressDetailsSection,
  FamilyMemberDetailsSection,
  ProposerDetailsSection,
} from "./kap-membership-form";

const MatrimonyForm: React.FC<{
  activeStep: number;
}> = ({ activeStep }) => {
  // TODO: Setup global formState for all the Formik forms to mutate onSubmit, maybe use Jotai for this

  const [formState, setFormState] = useState<MatrimonyFormValues>({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: new Date(),
      timeOfBirth: new Date(),
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

  useEffect(() => console.log(JSON.stringify(formState, null, 2)), [formState]);

  return (
    <>
      {/* {activeStep === 1 && (
        <PersonalInformationSection
          initialValues={formState.personalInfo}
          stateSetter={(values: PersonalInfo) =>
            setFormState({ ...formState, personalInfo: values })
          }
        />
      )}

      {activeStep === 2 && (
        <AddressDetailsSection
          initialValues={formState.addressInfo}
          stateSetter={(values: AddressInfo) =>
            setFormState({ ...formState, addressInfo: values })
          }
        />
      )}

      {activeStep === 3 && (
        <FamilyMemberDetailsSection
          initialValues={formState.familyMembers ?? []}
          stateSetter={(values: FamilyMember[]) =>
            setFormState({ ...formState, familyMembers: values })
          }
        />
      )}

      {activeStep === 4 && (
        <ProposerDetailsSection
          initialValues={formState.proposerInfo}
          stateSetter={(values: ProposerInfo) =>
            setFormState({ ...formState, proposerInfo: values })
          }
        />
      )} */}
    </>
  );
};

export default MatrimonyForm;
