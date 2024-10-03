import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";
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
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";

import { LabelledInput, camelCase } from "./index";

import type { MatrimonyFormValues } from "~/types/forms/matrimony";

import {
  matrimonyPersonalInfoSchema,
  residentialAddressDetailsSchema,
  matrimonySpousePreferencesSchema,
  proposerInfoSchema,
} from "~/utils/schemas";

import type {
  FamilyMember,
  MatrimonyFormProps,
  MatrimonyFormSectionProps,
} from "~/types/forms/membership";

import { Formik, Form } from "formik";
import type { InputType } from "./kap-membership-form";
import { focusAtom } from "jotai-optics";

import { api } from "~/utils/api";
import { userAtomBody } from "~/types/atoms/users";

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    dateAndTimeOfBirth: "",
    placeOfBirth: "",
    mobileNumber: "",
    emailId: "",
    occupation: "",
    incomePerAnnum: null,

    gender: "Male",
    maritalStatus: "Single",
    manglik: "No",

    heightFeet: 0,
    heightInches: 0,
    weight: 0,

    qualifications: "", // educational and other sorts of qualifications
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

const MatrimonyForm: React.FC<MatrimonyFormProps> = ({
  user,
  submissionVerification,
  approved,
}) => {
  const [activeStep] = useAtom(activeStepAtom);

  return (
    <>
      <Stepper
        display={["none", "none", "flex"]}
        index={activeStep}
        colorScheme="orange"
      >
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
        <>
          {activeStep === i + 1 && (
            <FormSection
              user={user as userAtomBody}
              submissionVerification={submissionVerification}
              approved={approved}
              key={i}
            />
          )}
        </>
      ))}

      <Spacer h="2rem" />
    </>
  );
};

const MatrimonyPersonalInformationSection: React.FC<
  MatrimonyFormSectionProps
> = ({ user, submissionVerification, approved }) => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);

  useEffect(
    () => console.log(JSON.stringify(personalInfo, null, 2)),
    [personalInfo]
  );

  return (
    <Box mt={10}>
      <Heading>Personal Information</Heading>
      <Text mt="1.5rem" maxW="2xl" color="#1F2937">
        Fill out the fields below to complete your matrimony profile, make sure
        to fill all the fields and not miss out on any important details.
      </Text>

      <Formik
        initialValues={personalInfo}
        validationSchema={matrimonyPersonalInfoSchema}
        onSubmit={(values, actions) => {
          console.log({ values });
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
                { label: "First Name", required: true },
                { label: "Middle Name" },
                { label: "Last Name", required: true },
                {
                  label: "Date & Time of Birth",
                  name: "dateAndTimeOfBirth",
                  inputType: "datetime",
                  required: true,
                },
                { label: "Place of Birth", required: true },
                { label: "Mobile Number", required: true },
                { label: "Email ID", required: true },
                { label: "Occupation", required: true },
                {
                  label: "Income per Annum",
                  inputType: "text",
                },
              ].map(({ label, name, inputType, required }, i) => (
                <LabelledInput
                  key={i}
                  label={label}
                  name={name ?? undefined}
                  type={inputType ? (inputType as InputType) : "text"}
                  isDisabled={
                    user
                      ? submissionVerification
                        ? true
                        : approved
                        ? true
                        : false
                      : true
                  }
                  required={required}
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
                  placeholder: "Select Gender",
                  selectOptions: ["Male", "Female"],
                  required: true,
                },
                {
                  label: "Marital Status",
                  inputType: "select",
                  placeholder: "Select Marital Status",
                  selectOptions: ["Single", "Divorcee", "Widower", "Widow"],
                  required: true,
                },
                {
                  label: "Manglik",
                  inputType: "select",
                  placeholder: "Select Manglik",
                  selectOptions: ["No", "Yes"],
                  required: true,
                },
              ].map(
                (
                  { label, inputType, placeholder, selectOptions, required },
                  i
                ) => (
                  <LabelledInput
                    key={i}
                    type={inputType ? (inputType as InputType) : "text"}
                    label={label}
                    placeholder={placeholder}
                    selectOptions={selectOptions}
                    required={required}
                    isDisabled={
                      user
                        ? submissionVerification
                          ? true
                          : approved
                          ? true
                          : false
                        : true
                    }
                  />
                )
              )}
            </Grid>

            <Grid
              mt="2rem"
              gap="2rem"
              templateColumns={["1fr", "repeat(3, 1fr)"]}
            >
              {[
                {
                  label: "Hobbies",
                  name: "hobbies",
                  required: true,
                },
                {
                  label: "Qualifications",
                  name: "qualifications",
                  required: true,
                },
                {
                  label: "Complexion and Features",
                  name: "complexionAndFeatures",
                  required: true,
                },
              ].map(({ label, name, required }, i) => (
                <LabelledInput
                  key={i}
                  label={label}
                  name={name}
                  type={"text"}
                  required={required}
                  isDisabled={
                    user
                      ? submissionVerification
                        ? true
                        : approved
                        ? true
                        : false
                      : true
                  }
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
                  required: true,
                },
                {
                  label: "Height in Inches",
                  name: "heightInches",
                  inputType: "number",
                  required: true,
                },
                {
                  label: "Weight (in Kg)",
                  name: "weight",
                  inputType: "number",
                  required: true,
                },
              ].map(({ label, name, required }, i) => (
                <LabelledInput
                  key={i}
                  type="text"
                  label={label}
                  name={name}
                  required={required}
                  isDisabled={
                    user
                      ? submissionVerification
                        ? true
                        : approved
                        ? true
                        : false
                      : true
                  }
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
                onClick={() => console.log({ errors: formik.errors })}
              >
                Next
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
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
        validationSchema={residentialAddressDetailsSchema}
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
                  required: true,
                },
                {
                  label: "Address Line 2",
                  name: "residentialAddress.addressLine2",
                  required: true,
                },
                {
                  label: "Address Line 3",
                  name: "residentialAddress.addressLine3",
                },
                {
                  label: "Pin Code",
                  name: "residentialAddress.pinCode",
                  required: true,
                },
              ].map(({ label, name, required }, i) => (
                <LabelledInput key={i} label={label} required={required} />
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
        validationSchema={matrimonySpousePreferencesSchema}
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
                  placeholder: "Select Working State",
                  selectOptions: ["Yes", "No"],
                  required: true,
                },
                {
                  label: "Dietary Preference",
                  inputType: "select",
                  placeholder: "Select Dietary Preference",
                  selectOptions: ["Veg", "Non-veg"],
                  required: true,
                },
                { label: "Qualification Requirements", required: true },
                { label: "Complexion", required: true },
                {
                  label: "Height in Feet",
                  name: "heightFeet",
                  inputType: "number",
                  required: true,
                },
                {
                  label: "Height in Inches",
                  name: "heightInches",
                  inputType: "number",
                  required: true,
                },
                {
                  label: "Weight (in Kg)",
                  name: "weight",
                  inputType: "number",
                  required: true,
                },
                {
                  label: "Horoscope Matching Required",
                  name: "horoscopeMatching",
                  inputType: "select",
                  placeholder: "Select Horoscope Matching Required",
                  selectOptions: ["Yes", "No"],
                  required: true,
                },
                {
                  label: "Build",
                  inputType: "select",
                  placeholder: "Select Build",
                  selectOptions: ["Medium", "Slim", "Healthy"],
                  required: true,
                },
                {
                  label: "Siblings",
                  inputType: "select",
                  placeholder: "Select Siblings",
                  selectOptions: ["Yes", "No"],
                  required: true,
                },
              ].map(
                (
                  {
                    label,
                    name,
                    inputType,
                    placeholder,
                    selectOptions,
                    required,
                  },
                  i
                ) => (
                  <LabelledInput
                    key={i}
                    type={inputType ? (inputType as InputType) : "text"}
                    label={label}
                    name={name}
                    selectOptions={selectOptions}
                    placeholder={placeholder}
                    required={required}
                  />
                )
              )}
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
              {/* <Text>{JSON.stringify(formik.errors)}</Text> */}
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const ProposerDetailsSection: React.FC = () => {
  const toast = useToast();

  const matrimonyFormMut = api.form.matrimony.useMutation({
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your matrimony profile has been submitted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [proposerInfo, setProposerInfo] = useAtom(proposerInfoAtom);

  const [matrimonyFormData] = useAtom(matrimonyFormAtom);

  return (
    <>
      <Heading>Proposer Details</Heading>

      <Formik
        initialValues={proposerInfo}
        validationSchema={proposerInfoSchema}
        onSubmit={(values, actions) => {
          // console.log({ values });

          setProposerInfo(values);
          actions.setSubmitting(false);
          // setActiveStep(activeStep + 1);

          // TODO: Call trpc mut and submit matrimony profile here
          matrimonyFormMut
            .mutateAsync({
              formData: matrimonyFormData,
            })
            .then(() => {
              console.log("yo");
              window.location.href = "/";
            })
            .catch(console.error);
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
                isLoading={matrimonyFormMut.isLoading}
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
