import type { NextPage } from "next";
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
} from "@chakra-ui/react";
import { FaHandHoldingHeart, FaUserFriends } from "react-icons/fa";

import Layout from "~/components/layout";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

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

      {/* Personal Information section */}
      <Box display={activeStep === 1 ? "block" : "none"}>
        <Heading>Personal Information</Heading>
        <Text mt="1.5rem" maxW="2xl" color="#1F2937">
          Fill out the fields below to complete your personal profile, make sure
          to fill all the fields and not miss out on any important details.
        </Text>

        <Grid mt="2rem" gap="2rem" templateColumns={["1fr", "repeat(3, 1fr)"]}>
          {[
            { label: "First Name" },
            { label: "Middle Name" },
            { label: "Last Name" },
            { label: "Occupation" },
            { label: "Date of Birth", specialInput: "date" },
            { label: "Mobile Number" },
            { label: "Email ID" },
          ].map(({ label }, i) => (
            // TODO: Replace with component which handles specialInputs too
            <FormControl key={i}>
              <FormLabel fontSize="sm" fontWeight="light">
                {label}
              </FormLabel>
              <Input py="30px" borderRadius="5px" type="text" />
            </FormControl>
          ))}
        </Grid>

        <Grid mt="2rem" gap="2rem" templateColumns={["1fr", "repeat(3, 1fr)"]}>
          {[
            { label: "Maiden Surname" },
            { label: "Maiden Name" },
            { label: "Father's name" },
            { label: "Mother's name" },
          ].map(({ label }, i) => (
            <FormControl key={i}>
              <FormLabel fontSize="sm" fontWeight="light">
                {label}
              </FormLabel>
              <Input py="30px" borderRadius="5px" type="text" />
            </FormControl>
          ))}
        </Grid>
      </Box>

      {/* Address Details section */}
      <Box display={activeStep === 2 ? "block" : "none"}>
        <Heading>Residential Address</Heading>
        <Grid mt="2rem" gap="2rem" templateColumns={["1fr", "repeat(2, 1fr)"]}>
          {[
            { label: "Address Line 1" },
            { label: "Address Line 2" },
            { label: "Address Line 3" },
            { label: "Pin Code" },
          ].map(({ label }, i) => (
            <FormControl key={i}>
              <FormLabel fontSize="sm" fontWeight="light">
                {label}
              </FormLabel>
              <Input py="30px" borderRadius="5px" type="text" />
            </FormControl>
          ))}
        </Grid>

        <Spacer h="3rem" />

        <Flex align="baseline" gap="0.5rem">
          <Heading>Office Address</Heading>
          <Text fontSize="xs">(Optional)</Text>
        </Flex>
        <Grid mt="2rem" gap="2rem" templateColumns={["1fr", "repeat(2, 1fr)"]}>
          {[
            { label: "Office Address Line 1" },
            { label: "Office Address Line 2" },
            { label: "Office Address Line 3" },
            { label: "Pin Code" },
          ].map(({ label }, i) => (
            <FormControl key={i}>
              <FormLabel fontSize="sm" fontWeight="light">
                {label}
              </FormLabel>
              <Input py="30px" borderRadius="5px" type="text" />
            </FormControl>
          ))}
        </Grid>
      </Box>

      {/* Membership Details section */}
      <Box display={activeStep === 3 ? "block" : "none"}>
        <Heading>Type of Membership</Heading>
        <Grid mt="2rem" gap="2rem" templateColumns={["1fr", "repeat(4, 1fr)"]}>
          {[
            { label: "Patron", Icon: FaHandHoldingHeart },
            { label: "Life-Member", Icon: FaUserFriends },
          ].map(({ Icon, label }, i) => (
            <Flex
              key={i}
              px="20px"
              py="18px"
              gap="1rem"
              align="center"
              border="1px solid #CBD5E0"
              borderRadius="5px"
              cursor="pointer"
            >
              <Icon size="40px" />
              <Text fontSize="lg" fontWeight="normal">
                {label}
              </Text>
            </Flex>
          ))}
        </Grid>

        <Spacer h="2rem" />

        <Heading size="lg">Declaration</Heading>
        <Flex flexDir="column" mt="1rem" gap="0.75rem" maxW="60%">
          <Text>
            The Applicant hereby declares that, I am a Khudabadi Amil and
            request the Committee to admit me as Patron / Life-Member of The
            Khudabadi Amil Panchayat of Bombay.
          </Text>
          <Text>
            I agree to abide by the Constitution and Rules of the Khudabadi Amil
            Panchayat of Bombay in force from time to time.
          </Text>
          <Text>I hereby agree to pay Rs 5000/- as membership fees.</Text>
        </Flex>
      </Box>

      {/* Family Members section */}
      <Box display={activeStep === 4 ? "block" : "none"}>
        <Flex align="baseline" gap="0.5rem">
          <Heading>Other Family Members</Heading>
          <Text fontSize="xs">(Optional)</Text>
        </Flex>
        <Grid mt="2rem" gap="2rem" templateColumns={["1fr", "repeat(2, 1fr)"]}>
          {[
            { label: "Office Address Line 1" },
            { label: "Office Address Line 2" },
            { label: "Office Address Line 3" },
            { label: "Pin Code" },
          ].map(({ label }, i) => (
            <FormControl key={i}>
              <FormLabel fontSize="sm" fontWeight="light">
                {label}
              </FormLabel>
              <Input py="30px" borderRadius="5px" type="text" />
            </FormControl>
          ))}
        </Grid>
      </Box>

      {/* Proposer Details section */}
      <Box display={activeStep === 5 ? "block" : "none"}>
        <div>proposer details form section</div>
      </Box>

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
