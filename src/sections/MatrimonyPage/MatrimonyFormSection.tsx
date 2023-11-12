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
      {/* <GridItem>
        <Text fontSize="xl">Membership Form</Text>
        <Text>
          Fill out the fields below to complete your personal profile, make sure
          to full all the fields and not miss out any important details.
        </Text>
      </GridItem> */}

      <GridItem>
        <Spacer h="1.5rem" />

        <Stepper index={activeStep} colorScheme="orange">
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

        <MatrimonyForm activeStep={activeStep} />

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
