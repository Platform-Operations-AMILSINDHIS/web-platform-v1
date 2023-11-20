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
  Tag,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai-optics";

import { FaRupeeSign } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";

import { LabelledInput, camelCase } from "./index";

import type {
  YACMembershipFormValues,
  PersonalInfo,
  FamilyMember,
  AddressInfo,
  ProposerInfo,
} from "~/types/forms/membership";

import {
  personalInfoSchema,
  familyMemberSchema,
  addressInfoSchema,
  kapMembershipInfoSchema,
  proposerInfoSchema,
} from "~/utils/schemas";

import {
  // PersonalInformationSection,
  // AddressDetailsSection,
  // FamilyMemberDetailsSection,
  // ProposerDetailsSection,
  type InputType,
} from "./kap-membership-form";

import usePayment from "~/hooks/usePayment";

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

const yacFormAtom = atom<YACMembershipFormValues>({
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
    officeAddress: {
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

const personalInfoAtom = focusAtom(yacFormAtom, (optic) =>
  optic.prop("personalInfo")
);
const addressInfoAtom = focusAtom(yacFormAtom, (optic) =>
  optic.prop("addressInfo")
);
const familyMembersAtom = focusAtom(yacFormAtom, (optic) =>
  optic.prop("familyMembers")
);
const proposerInfoAtom = focusAtom(yacFormAtom, (optic) =>
  optic.prop("proposerInfo")
);

const activeStepAtom = atom<number>(1);

const YoungAmilCircleMembershipForm: React.FC = () => {
  // const toast = useToast();

  // const { activeStep, setActiveStep } = useSteps({
  //   index: 1,
  //   count: steps.length,
  // });

  // const formMut = api.form.yacMembership.useMutation();

  const [activeStep] = useAtom(activeStepAtom);

  // Logger
  const [formState] = useAtom(yacFormAtom);
  useEffect(() => console.log(JSON.stringify(formState, null, 2)), [formState]);

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

      {/* {activeStep === 1 && (
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
        />
      )} */}

      {[
        PersonalInformationSection,
        AddressDetailsSection,
        FamilyMemberDetailsSection,
        ProposerDetailsSection,
      ].map((FormSection, i) => (
        <>{activeStep === i + 1 && <FormSection key={i} />}</>
      ))}

      <Spacer h="2rem" />

      {/* Navigation buttons */}
      {/* <Flex justify="space-between">
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
          {activeStep === steps.length ? "Submit" : "Next"}
        </Button>
      </Flex> */}
    </>
  );
};

export const PersonalInformationSection: React.FC = () => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);

  return (
    <>
      <Heading>Personal Information</Heading>
      <Text mt="1.5rem" maxW="2xl" color="#1F2937">
        Fill out the fields below to complete your personal profile, make sure
        to fill all the fields and not miss out on any important details.
      </Text>

      <Formik
        initialValues={personalInfo}
        validationSchema={personalInfoSchema}
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
                { label: "Occupation" },
                { label: "Date of Birth", inputType: "date" },
                { label: "Mobile Number" },
                { label: "Email ID" },
              ].map(({ label, inputType }, i) => (
                <LabelledInput
                  key={i}
                  label={label}
                  type={inputType ? (inputType as InputType) : "text"}
                />
              ))}
            </Grid>

            <Grid
              mt="2rem"
              gap="2rem"
              templateColumns={["1fr", "repeat(2, 1fr)"]}
            >
              {[
                { label: "Maiden Surname", name: "maidenSurname" },
                { label: "Maiden Name", name: "maidenName" },
                { label: "Father's name", name: "fathersName" },
                { label: "Mother's name", name: "mothersName" },
              ].map(({ label, name }, i) => (
                <LabelledInput key={i} label={label} name={name ?? label} />
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

export const AddressDetailsSection: React.FC = () => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [addressInfo, setAddressInfo] = useAtom(addressInfoAtom);

  return (
    <>
      <Heading>Residential Address</Heading>
      <Formik
        initialValues={addressInfo}
        validationSchema={addressInfoSchema}
        onSubmit={(values, actions) => {
          // console.log({ values });
          setAddressInfo(values);
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
                <LabelledInput key={i} label={label} name={name ?? label} />
              ))}
            </Grid>

            <Spacer h="3rem" />

            <Flex align="baseline" gap="0.5rem">
              <Heading>Office Address</Heading>
              <Text fontSize="xs">(Optional)</Text>
            </Flex>
            <Grid
              mt="2rem"
              gap="2rem"
              templateColumns={["1fr", "repeat(2, 1fr)"]}
            >
              {[
                {
                  label: "Office Address Line 1",
                  name: "officeAddress.addressLine1",
                },
                {
                  label: "Office Address Line 2",
                  name: "officeAddress.addressLine2",
                },
                {
                  label: "Office Address Line 3",
                  name: "officeAddress.addressLine3",
                },
                { label: "Pin Code", name: "officeAddress.pinCode" },
              ].map(({ label, name }, i) => (
                <LabelledInput key={i} label={label} name={name ?? label} />
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

export const FamilyMemberDetailsSection: React.FC = () => {
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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

export const ProposerDetailsSection: React.FC = () => {
  const toast = useToast();

  const formMut = api.form.yacMembership.useMutation();

  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [proposerInfo, setProposerInfo] = useAtom(proposerInfoAtom);
  const [formState] = useAtom(atom((get) => get(yacFormAtom)));

  const [isPaying, setIsPaying] = useState<boolean>(false);

  const { handlePayment, paymentId } = usePayment({
    prefillDetails: {
      name: `${formState.personalInfo.firstName}${
        formState.personalInfo.middleName
          ? ` ${formState.personalInfo.middleName}`
          : ""
      } ${formState.personalInfo.lastName}`,
      email: formState.personalInfo.emailId,
      contact: formState.personalInfo.mobileNumber,
    },
  });

  useEffect(() => {
    console.log("useEffect triggered here");

    if (paymentId) {
      formMut
        .mutateAsync(
          { formData: formState, paymentId },
          {
            onSuccess: () => {
              toast({
                title: "Response recorded successfully",
                description: "Your form response has been recorded.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            },
            onError: (error) => {
              toast({
                title: "Error",
                // description: "Something went wrong, please try again later.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            },
          }
        )
        .catch(console.error);
    }
  }, [paymentId]);

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
                request the Committee to admit me as Member of The Young Amil
                Circle.
              </ListItem>
              <ListItem>
                I agree to abide by the Constitution and rules of the Khudabadi
                Amil Panchayat of Bombay in force from time to time.
              </ListItem>
              <ListItem>
                I hereby agree to pay{" "}
                <Tag size="md" colorScheme="orange">
                  Rs. 1000
                </Tag>{" "}
                as membership fees.
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
                isDisabled={isPaying}
                isLoading={isPaying}
                colorScheme="orange"
                leftIcon={<FaRupeeSign />}
                size="lg"
                onClick={() => {
                  setIsPaying(true);

                  void handlePayment(100000, "kap_membership").catch(
                    console.error
                  );
                }}
              >
                Pay now
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default YoungAmilCircleMembershipForm;
