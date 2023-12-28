import { atom, useAtom } from "jotai";
import React from "react";
import {
  Heading,
  Text,
  Grid,
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
  Tag,
} from "@chakra-ui/react";
import { FaHandHoldingHeart, FaUserFriends } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";

import { LabelledInput, camelCase } from "./index";

import type {
  MatrimonyFormValues,
  PersonalInfo,
  ResidentialAddressDetails,
  SpousePreferences,
} from "~/types/forms/matrimony";

import {
  matrimonyPersonalInfoSchema,
  familyMemberSchema,
  residentialAddressDetailsSchema,
  matrimonySpousePreferencesSchema,
  proposerInfoSchema,
} from "~/utils/schemas";

import type { FamilyMember, ProposerInfo } from "~/types/forms/membership";

import { Formik, Form } from "formik";
import type { InputType } from "./kap-membership-form";
import { focusAtom } from "jotai-optics";

const steps = [
  {
    title: "Step 1",
    description: "Personal Information",
  },
  {
    title: "Step 2",
    description: "Residential Address Details",
  },
  {
    title: "Step 3",
    description: "Family Members",
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

const matrimonyFormAtom = atom<MatrimonyFormValues>({
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

const personalInfoAtom = focusAtom(matrimonyFormAtom, (optic) =>
  optic.prop("personalInfo")
);

const residentialAddressDetailsAtom = focusAtom(matrimonyFormAtom, (optic) =>
  optic.prop("residentialAddressDetails")
);

const familyMembersAtom = focusAtom(matrimonyFormAtom, (optic) =>
  optic.prop("familyMembers")
);

const spousePreferencesAtom = focusAtom(matrimonyFormAtom, (optic) =>
  optic.prop("spousePreferences")
);

const proposerInfoAtom = focusAtom(matrimonyFormAtom, (optic) =>
  optic.prop("proposerInfo")
);

const activeStepAtom = atom<number>(1);

const MatrimonyForm: React.FC = () => {
  const [activeStep] = useAtom(activeStepAtom);

  // Logger
  // const [formState] = useAtom(matrimonyFormAtom);
  // useEffect(() => console.log(JSON.stringify(formState, null, 2)), [formState]);

  return (
    <>
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

      {[
        MatrimonyPersonalInformationSection,
        FamilyMemberDetailsSection,
        MatrimonyAddressDetailsSection,
        SpousePreferencesSection,
        ProposerDetailsSection,
      ].map((FormSection, i) => (
        <>{activeStep === i + 1 && <FormSection key={i} />}</>
      ))}

      <Spacer h="2rem" />
    </>
  );
};

const MatrimonyPersonalInformationSection: React.FC = () => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);

  return (
    <>
      <Heading>Personal Information</Heading>
      <Text mt="1.5rem" maxW="2xl" color="#1F2937">
        Fill out the fields below to complete your matrimony profile, make sure
        to fill all the fields and not miss out on any important details.
      </Text>

      <Formik
        initialValues={personalInfo}
        // validationSchema={matrimonyPersonalInfoSchema}
        onSubmit={(values, actions) => {
          // console.log({ values });
          setPersonalInfo(values);
          actions.setSubmitting(false);
          setActiveStep(activeStep + 1);
        }}
      >
        {(formik) => (
          <Form>
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
            <Flex mt="2rem" w="100%" justifyContent="space-between">
              <Box></Box>
              <Button
                type="submit"
                isDisabled={!(formik.isValid && formik.dirty)}
                colorScheme="orange"
                rightIcon={<ArrowForwardIcon />}
                size="lg"
              >
                Next
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

const MatrimonyAddressDetailsSection: React.FC = () => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [residentialAddressDetails, setResidentialAddressDetails] = useAtom(
    residentialAddressDetailsAtom
  );

  return (
    <>
      <Heading>Residential Address</Heading>
      <Formik
        initialValues={residentialAddressDetails}
        // validationSchema={residentialAddressDetailsSchema}
        onSubmit={(values, actions) => {
          // console.log({ values });
          setResidentialAddressDetails(values);
          actions.setSubmitting(false);
          setActiveStep(activeStep + 1);
        }}
      >
        {(formik) => (
          <Form>
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
            <Spacer h="2rem" />
            <Flex w="100%" justifyContent="space-between">
              <Button
                colorScheme="orange"
                leftIcon={<ArrowBackIcon />}
                size="lg"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Previous
              </Button>

              <Button
                type="submit"
                isDisabled={!(formik.isValid && formik.dirty)}
                colorScheme="orange"
                rightIcon={<ArrowForwardIcon />}
                size="lg"
              >
                Next
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

const FamilyMemberDetailsSection: React.FC = () => {
  // TODO: Use Formik FieldArray instead of this
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [familyMembers, setFamilyMembers] = useAtom(familyMembersAtom);

  return (
    <>
      <Flex align="baseline" gap="0.5rem">
        <Heading>Other Family Members</Heading>
        <Text fontSize="xs">(Optional)</Text>
      </Flex>
      <Grid
        mt="2rem"
        gap="2rem"
        templateColumns={["1fr", "repeat(4, 4fr) 1fr"]}
      >
        {familyMembers?.map((fm: FamilyMember, i) => (
          <>
            {[
              {
                label: "Member Name",
                initialValue: fm.memberName,
              },
              { label: "Relationship", initialValue: fm.relationship },
              { label: "Occupation", initialValue: fm.occupation },
              { label: "Age", initialValue: fm.age, type: "number" },
            ].map(({ label, initialValue, type }, j) => (
              <LabelledInput
                key={j}
                label={label}
                type="chakra-text"
                defaultValue={initialValue as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newMembers = [...familyMembers];
                  newMembers[i] = {
                    ...newMembers[i],
                    [camelCase(label)]: e.target.value
                      ? type === "number"
                        ? parseInt(e.target.value)
                        : e.target.value
                      : "",
                  };
                  setFamilyMembers([...newMembers]);
                }}
              />
            ))}
            <IconButton
              my="auto"
              h="70%"
              aria-label="button"
              colorScheme="red"
              bgColor="red.400"
              icon={<DeleteIcon />}
              // Remove this family member
              onClick={() => {
                const newMembers = [...familyMembers];
                newMembers.splice(i, 1);
                setFamilyMembers([...newMembers]);
              }}
            />
          </>
        ))}

        <Box />
        <Button
          h="4rem"
          gridColumn="span 2"
          onClick={() =>
            setFamilyMembers([
              ...(familyMembers ?? []),
              { memberName: "", relationship: "", occupation: "", age: null },
            ])
          }
        >
          Add family member
        </Button>
        <Box />
      </Grid>
      <Spacer h="2rem" />
      <Flex w="100%" justifyContent="space-between">
        <Button
          colorScheme="orange"
          leftIcon={<ArrowBackIcon />}
          size="lg"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Previous
        </Button>

        <Button
          type="submit"
          colorScheme="orange"
          rightIcon={<ArrowForwardIcon />}
          size="lg"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next
        </Button>
      </Flex>
    </>
  );
};

const SpousePreferencesSection: React.FC = () => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [spousePreferences, setSpousePreferences] = useAtom(
    spousePreferencesAtom
  );

  return (
    <>
      <Heading>Spouse Preferences</Heading>
      <Formik
        initialValues={spousePreferences}
        // validationSchema={matrimonySpousePreferencesSchema}
        onSubmit={(values, actions) => {
          // console.log({ values })
          setSpousePreferences(values);
          actions.setSubmitting(false);
          setActiveStep(activeStep + 1);
        }}
      >
        {(formik) => (
          <Form>
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
            <Spacer h="2rem" />
            <Flex w="100%" justifyContent="space-between">
              <Button
                colorScheme="orange"
                leftIcon={<ArrowBackIcon />}
                size="lg"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Previous
              </Button>

              <Button
                type="submit"
                isDisabled={!(formik.isValid && formik.dirty)}
                colorScheme="orange"
                rightIcon={<ArrowForwardIcon />}
                size="lg"
              >
                Next
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const ProposerDetailsSection: React.FC = () => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [proposerInfo, setProposerInfo] = useAtom(proposerInfoAtom);

  return (
    <>
      <Heading>Proposer Details</Heading>

      <Formik
        initialValues={proposerInfo}
        // validationSchema={proposerInfoSchema}
        onSubmit={(values, actions) => {
          // console.log({ values });

          setProposerInfo(values);
          actions.setSubmitting(false);
          setActiveStep(activeStep + 1);

          // TODO: Call trpc mut and submit matrimony profile here
        }}
      >
        {(formik) => (
          <Form>
            <Grid
              mt="2rem"
              gap="2rem"
              templateColumns={["1fr", "repeat(3, 1fr)"]}
            >
              {[
                { label: "First Name" },
                { label: "Last Name" },
                { label: "Mobile Number" },
              ].map(({ label }, i) => (
                <LabelledInput key={i} label={label} />
              ))}
            </Grid>

            <Spacer h="2rem" />

            <Heading size="md">Proposer Certification</Heading>
            <Flex flexDir="column" mt="1rem" gap="0.75rem" maxW="50%">
              <Text>
                By submitting this form, I certify that the applicant is a
                Khudabadi Amil and is eligible for membership of the Khudabadi
                Amil Panchayat of Bombay.
              </Text>
            </Flex>

            <Spacer h="2rem" />

            <Heading size="lg">Declaration</Heading>
            <UnorderedList mt="1rem" spacing="0.75rem" maxW="60%">
              <ListItem>
                The Applicant hereby declares that: I am a Khudabadi Amil and
                request the Committee to admit me as Patron / Life-Member of The
                Khudabadi Amil Panchayat of Bombay.
              </ListItem>
              <ListItem>
                I agree to abide by the Constitution and rules of the Khudabadi
                Amil Panchayat of Bombay in force from time to time.
              </ListItem>
            </UnorderedList>
            <Spacer h="2rem" />
            <Flex w="100%" justifyContent="space-between">
              <Button
                colorScheme="orange"
                leftIcon={<ArrowBackIcon />}
                size="lg"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Previous
              </Button>

              <Button
                type="submit"
                isDisabled={!(formik.isValid && formik.dirty)}
                colorScheme="orange"
                rightIcon={<ArrowForwardIcon />}
                size="lg"
              >
                Submit
              </Button>
              {/* <Button
                type="submit"
                isDisabled={paymentAmount === 0 || isPaying}
                isLoading={isPaying}
                colorScheme="orange"
                leftIcon={<FaRupeeSign />}
                size="lg"
                onClick={() => {
                  setIsPaying(true);

                  void handlePayment(paymentAmount, "kap_membership").catch(
                    console.error
                  );
                }}
              >
                Pay now
              </Button> */}
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MatrimonyForm;
