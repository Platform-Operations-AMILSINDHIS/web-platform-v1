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

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Layout title="KAP Membership Form">
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

      <KhudabadiAmilPanchayatMembershipForm
        activeStep={activeStep}
        isSubmitted={isSubmitted}
      />

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
          onClick={
            activeStep === steps.length
              ? () => {
                  console.log("submit here");
                  setIsSubmitted(true);
                }
              : () => setActiveStep(activeStep + 1)
          }
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
