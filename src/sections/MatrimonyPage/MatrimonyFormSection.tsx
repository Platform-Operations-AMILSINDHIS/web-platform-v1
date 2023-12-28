import {
  Grid,
  GridItem,
  Text,
  Box,
  Flex,
  Button,
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
  Spacer,
} from "@chakra-ui/react";

import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

import MatrimonyForm from "~/components/forms/matrimony-form";

const steps = [
  {
    title: "Step 1",
    description: "Personal Information",
  },
  {
    title: "Step 2",
    description: "Family Details",
  },
  {
    title: "Step 3",
    description: "Address Details",
  },
  {
    title: "Step 4",
    description: "Spouse Preferences",
  },
  {
    title: "Step 5",
    description: "Proposer Details",
  },
];

const MatrimonyFormSection = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Grid id="matrimony-form">
      <GridItem>
        <Spacer h="1.5rem" />

        <MatrimonyForm />

        <Spacer h="2rem" />
      </GridItem>
    </Grid>
  );
};

export default MatrimonyFormSection;
