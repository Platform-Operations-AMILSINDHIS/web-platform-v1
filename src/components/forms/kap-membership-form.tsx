import React, { useState, useEffect, ChangeEvent } from "react";
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
import { Formik, Form } from "formik";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai-optics";

import { FaHandHoldingHeart, FaUserFriends } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

import {
  LabelledInput,
  FormObserver,
  FormGlobalStateSetter,
  camelCase,
} from "./index";

import type {
  KAPMembershipFormValues,
  PersonalInfo,
  FamilyMember,
  AddressInfo,
  KAPMembershipInfo,
  ProposerInfo,
} from "~/types/forms/membership";

import {
  personalInfoSchema,
  familyMemberSchema,
  addressInfoSchema,
  kapMembershipInfoSchema,
  proposerInfoSchema,
} from "~/utils/schemas";

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
  {
    title: "Step 5",
    description: "Membership Details",
  },
];

export type InputType =
  | "number"
  | "select"
  | "text"
  | "chakra-text"
  | "date"
  | "datetime"
  | undefined;

const kapFormAtom = atom<KAPMembershipFormValues>({
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
  membershipInfo: {
    membershipType: null,
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

const personalInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("personalInfo")
);
const addressInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("addressInfo")
);
const membershipInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("membershipInfo")
);
const familyMembersAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("familyMembers")
);
const proposerInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("proposerInfo")
);

const activeStepAtom = atom<number>(1);

const KhudabadiAmilPanchayatMembershipForm: React.FC = () => {
  // TODO: Setup global formState for all the Formik forms to mutate onSubmit, maybe use Jotai for this
  const toast = useToast();

  const [formState, setFormState] = useAtom(kapFormAtom);

  // const { activeStep, setActiveStep } = useSteps({
  //   index: 1,
  //   count: steps.length,
  // });

  const [activeStep, setActiveStep] = useAtom(activeStepAtom);

  const formMut = api.form.kapMembership.useMutation();

  // Logger
  useEffect(() => console.log(JSON.stringify(formState, null, 2)), [formState]);

  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const { handlePayment } = usePayment({
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

  // useEffect(() => {
  //   if (isSubmitted && formMut.status === "idle") {
  //     console.log(JSON.stringify(formState.proposerInfo, null, 2));
  //     formMut.mutate({ formData: formState });
  //   }
  // }, [isSubmitted, formState, formMut]);

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

      {activeStep === 1 && <PersonalInformationSection />}

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

      {activeStep === 5 && (
        <MembershipDetailsSection
          initialValues={formState.membershipInfo}
          stateSetter={(values: KAPMembershipInfo) =>
            setFormState({ ...formState, membershipInfo: values })
          }
          paymentAmountState={paymentAmount}
          paymentAmountStateSetter={setPaymentAmount}
        />
      )}

      <Spacer h="2rem" />

      {/* Navigation buttons */}
      {/* <Flex justify="space-between">
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
          isLoading={formMut.isLoading}
          onClick={
            activeStep === 5
              ? async () => {
                  await handlePayment(paymentAmount, "kap_membership");
                }
              : activeStep === steps.length
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
          {activeStep === 5 ? "Pay now" : "Next"}
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
            templateColumns={["1fr", "repeat(3, 1fr)"]}
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
          <Flex w="100%" justifyContent="space-between">
            <Box></Box>
            <Button
              type="submit"
              colorScheme="orange"
              rightIcon={<ArrowForwardIcon />}
              size="lg"
            >
              Next
            </Button>
          </Flex>
        </Form>
      </Formik>
    </>
  );
};

export const AddressDetailsSection: React.FC<{
  initialValues: AddressInfo;
  stateSetter: (values: AddressInfo) => void;
}> = ({ initialValues, stateSetter }) => {
  return (
    <>
      <Heading>Residential Address</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={addressInfoSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <FormGlobalStateSetter stateSetter={stateSetter} />
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
        </Form>
      </Formik>
    </>
  );
};

export const FamilyMemberDetailsSection: React.FC<{
  initialValues: FamilyMember[];
  stateSetter: (values: FamilyMember[]) => void;
}> = ({ initialValues, stateSetter }) => {
  // TODO: Use Formik FieldArray instead of this
  const [familyMembers, setFamilyMembers] =
    useState<FamilyMember[]>(initialValues);
  // useEffect(() => console.log({ familyMembers }), [familyMembers]);
  useEffect(() => stateSetter(familyMembers), [familyMembers, stateSetter]);

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
        {familyMembers.map((fm: FamilyMember, i) => (
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
              h="50%"
              aria-label="button"
              colorScheme="red"
              bgColor="red.400"
              icon={<CloseIcon />}
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
              ...familyMembers,
              { memberName: "", relationship: "", occupation: "", age: null },
            ])
          }
        >
          Add family member
        </Button>
        <Box />
      </Grid>
    </>
  );
};

export const ProposerDetailsSection: React.FC<{
  initialValues: ProposerInfo;
  stateSetter: (values: ProposerInfo) => void;
}> = ({ initialValues, stateSetter }) => {
  return (
    <>
      <Heading>Proposer Details</Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={proposerInfoSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <FormGlobalStateSetter stateSetter={stateSetter} />
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
        </Form>
      </Formik>

      <Spacer h="2rem" />

      <Heading size="md">Proposer Certification</Heading>
      <Flex flexDir="column" mt="1rem" gap="0.75rem" maxW="50%">
        <Text>
          By submitting this form, I certify that the applicant is a Khudabadi
          Amil and is eligible for membership of the Khudabadi Amil Panchayat of
          Bombay.
        </Text>
      </Flex>

      <Spacer h="2rem" />

      <Heading size="lg">Declaration</Heading>
      <UnorderedList mt="1rem" spacing="0.75rem" maxW="60%">
        <ListItem>
          The Applicant hereby declares that: I am a Khudabadi Amil and request
          the Committee to admit me as Patron / Life-Member of The Khudabadi
          Amil Panchayat of Bombay.
        </ListItem>
        <ListItem>
          I agree to abide by the Constitution and rules of the Khudabadi Amil
          Panchayat of Bombay in force from time to time.
        </ListItem>
      </UnorderedList>
    </>
  );
};

const MembershipDetailsSection: React.FC<{
  initialValues: KAPMembershipInfo;
  stateSetter: (values: KAPMembershipInfo) => void;
  paymentAmountState: number;
  paymentAmountStateSetter: (paymentAmount: number) => void;
}> = ({
  initialValues,
  stateSetter,
  paymentAmountState,
  paymentAmountStateSetter,
}) => {
  return (
    <>
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
            border={
              initialValues.membershipType === label.toLowerCase()
                ? "1px solid #C05621"
                : "1px solid #CBD5E0"
            }
            borderRadius="5px"
            cursor="pointer"
            onClick={() => {
              stateSetter({
                membershipType: label === "Patron" ? "patron" : "life-member",
              });

              paymentAmountStateSetter(
                label === "Patron"
                  ? 500000
                  : label === "Life-Member"
                  ? 250000
                  : 0
              );
            }}
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
      <UnorderedList mt="1rem" spacing="0.75rem" maxW="60%">
        <ListItem>
          The Applicant hereby declares that, I am a Khudabadi Amil and request
          the Committee to admit me as
          <Tag size="md" colorScheme="orange">
            {paymentAmountState === 500000
              ? "Patron"
              : paymentAmountState === 250000
              ? "Life-Member"
              : "—"}
          </Tag>{" "}
          of The Khudabadi Amil Panchayat of Bombay.
        </ListItem>
        <ListItem>
          I agree to abide by the Constitution and Rules of the Khudabadi Amil
          Panchayat of Bombay in force from time to time.
        </ListItem>
        <ListItem>
          I hereby agree to pay{" "}
          <Tag size="md" colorScheme="orange">
            Rs. {paymentAmountState !== 0 ? paymentAmountState / 100 : "—"}
          </Tag>{" "}
          as membership fees.
        </ListItem>
      </UnorderedList>
    </>
  );
};

export default KhudabadiAmilPanchayatMembershipForm;
