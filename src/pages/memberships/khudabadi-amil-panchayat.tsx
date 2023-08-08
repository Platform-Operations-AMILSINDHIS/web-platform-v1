import type { NextPage } from "next";
import { useState, useEffect } from "react";

import {
  Text,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Spacer,
  Flex,
  Box,
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
  Button,
  IconButton,
} from "@chakra-ui/react";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import { FaHandHoldingHeart, FaUserFriends } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

import Layout from "~/components/layout";
import KhudabadiAmilPanchayatMembershipForm from "~/components/forms/kap-membership-form";

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
    description: "Membership Details",
  },
  {
    title: "Step 4",
    description: "Family Members",
  },
  {
    title: "Step 5",
    description: "Proposer Details",
  },
];

interface FamilyMember {
  memberName: string;
  relationship: string;
  occupation: string;
  age: number | null;
}

interface KhudabadiAmilPanchayatMembershipFormValues {
  personalInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    occupation: string;
    dateOfBirth: Date;
    mobile: string;
    email: string;
    maidenSurname: string;
    maidenName: string;
    fathersName: string;
    mothersName: string;
    // TODO: add member photo url/file type here (ref end of page at https://amilsindhis.org/membership/khudabadi-amil-panchayat)
  };
  addressInfo: {
    residentialAddress: {
      addressLine1: string;
      addressLine2: string;
      addressLine3: string;
      pinCode: string;
    };
    officeAddress: {
      addressLine1: string;
      addressLine2: string;
      addressLine3: string;
      pinCode: string;
    };
  };
  membershipInfo: {
    membershipType: "patron" | "life-member";
  };
  familyMembers?: FamilyMember[];
  proposerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    // TODO: get this clarified (ref: end of page at https://amilsindhis.org/membership/khudabadi-amil-panchayat)
    firstName2: string;
    lastName2: string;
    phone2: string;
  };
}

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Layout title="Home">
      <Spacer h="1.5rem" />

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

      <KhudabadiAmilPanchayatMembershipForm activeStep={activeStep} />

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
          onClick={() => setActiveStep(activeStep + 1)}
        >
          {/* Next */}
          {activeStep === steps.length ? "Submit" : "Next"}
        </Button>
      </Flex>

      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
