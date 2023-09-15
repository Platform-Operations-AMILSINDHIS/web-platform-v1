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
  UnorderedList,
  ListItem,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useToast,
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
import {
  PersonalInformationSection,
  AddressDetailsSection,
  FamilyMemberDetailsSection,
  ProposerDetailsSection,
} from "./kap-membership-form";

import { api } from "~/utils/api";

const steps = [
  {
    title: "Step 1",
    description: "Personal Information",
  },
  {
    title: "Step 2",
    description: "Address Details",
  },
  {
    title: "Step 3",
    description: "Family Members",
  },
  {
    title: "Step 4",
    description: "Proposer Details",
  },
];

const YoungAmilCircleMembershipForm: React.FC = () => {
  const toast = useToast();

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

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const formMut = api.form.yacMembership.useMutation();

  // Logger
  useEffect(
    () => console.log(JSON.stringify(formState.personalInfo, null, 2)),
    [formState]
  );

  return (
    <>
      <Stepper index={activeStep}>
        {steps.map(({ title, description }, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Spacer h="2rem" />

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

      <Spacer h="2rem" />

      {/* Navigation buttons */}
      <Flex justify="space-between">
        {activeStep > 1 ? (
          <Button
            leftIcon={<ArrowBackIcon />}
            size="lg"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          colorScheme="blue"
          rightIcon={
            activeStep !== steps.length ? <ArrowForwardIcon /> : undefined
          }
          size="lg"
          isLoading={formMut.isLoading}
          onClick={
            activeStep === steps.length
              ? () => {
                  console.log("submit here");
                  formMut
                    .mutateAsync({ formData: formState })
                    .then(() => {
                      toast({
                        title: "Response recorded successfully",
                        description: "Your form response has been recorded.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                    })
                    .catch(console.error);
                }
              : () => setActiveStep(activeStep + 1)
          }
        >
          {/* Next */}
          {activeStep === steps.length ? "Submit" : "Next"}
        </Button>
      </Flex>
    </>
  );
};

export default YoungAmilCircleMembershipForm;
