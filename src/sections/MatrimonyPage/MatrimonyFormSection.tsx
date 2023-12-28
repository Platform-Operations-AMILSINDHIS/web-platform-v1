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
    <Grid
      id="matrimony-form"
      // templateColumns="2fr 7fr"
    >
      <GridItem>
        <Spacer h="1.5rem" />

        <MatrimonyForm />

        <Spacer h="2rem" />

        {/* Navigation buttons */}
        <Flex justify="space-between">
          {activeStep > 1 ? (
            <Button
              colorScheme="orange"
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
            colorScheme="orange"
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
      </GridItem>
    </Grid>
  );
};

export default MatrimonyFormSection;
