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
  YACMembershipFormValues,
  PersonalInfo,
  FamilyMember,
  AddressInfo,
  ProposerInfo,
} from "~/types/forms/membership";

import { Formik, Form } from "formik";

import {
  PersonalInformationSection,
  AddressDetailsSection,
  FamilyMemberDetailsSection,
  ProposerDetailsSection,
} from "./kap-membership-form";

const YoungAmilCircleMembershipForm: React.FC<{
  activeStep: number;
}> = ({ activeStep }) => {
  // TODO: Setup global formState for all the Formik forms to mutate onSubmit, maybe use Jotai for this

  const [formState, setFormState] = useState<YACMembershipFormValues>({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      occupation: "",
      dateOfBirth: new Date(),
      mobileNumber: "",
      emailId: "",
      maidenSurname: "",
      maidenName: "",
      fathersName: "",
      mothersName: "",
    },
    addressInfo: {
      residentialAddress: {
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        pinCode: "",
      },
    },
    familyMembers: [
      {
        memberName: "",
        relationship: "",
        occupation: "",
        age: null,
      },
    ],
    proposerInfo: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
    },
  });

  useEffect(() => console.log(JSON.stringify(formState, null, 2)), [formState]);

  return (
    <>
      {activeStep === 1 && (
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
      )}
    </>
  );
};

export default YoungAmilCircleMembershipForm;
