import React, { useState, type ChangeEvent, useEffect } from "react";
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
  Tag,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai-optics";

import { FaHandHoldingHeart, FaUserFriends, FaRupeeSign } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";

import { LabelledInput, camelCase } from "./index";

import type {
  KAPMembershipFormValues,
  FamilyMember,
  KhudabadiAmilPanchayatMembershipFormProps,
  KAPFormSectionProps,
} from "~/types/forms/membership";

import {
  personalInfoSchema,
  addressInfoSchema,
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
  membershipInfo: {
    membershipType: null,
  },
});

const personalInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("personalInfo")
);
const addressInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("addressInfo")
);
const familyMembersAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("familyMembers")
);
const proposerInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("proposerInfo")
);
const membershipInfoAtom = focusAtom(kapFormAtom, (optic) =>
  optic.prop("membershipInfo")
);

const activeStepAtom = atom<number>(1);

const KhudabadiAmilPanchayatMembershipForm: React.FC<
  KhudabadiAmilPanchayatMembershipFormProps
> = ({ user }) => {
  const [activeStep] = useAtom(activeStepAtom);

  // Logger
  // const [formState] = useAtom(kapFormAtom);
  // useEffect(() => console.log(JSON.stringify(formState, null, 2)), [formState]);

  return (
    <Box my={10}>
      <Stepper mb={3} index={activeStep} colorScheme="orange">
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
        PersonalInformationSection,
        AddressDetailsSection,
        FamilyMemberDetailsSection,
        ProposerDetailsSection,
        MembershipDetailsSection,
      ].map((FormSection, i) => (
        <>{activeStep === i + 1 && <FormSection user={user} key={i} />}</>
      ))}

      <Spacer h="2rem" />
    </Box>
  );
};

export const PersonalInformationSection: React.FC<KAPFormSectionProps> = ({
  user,
}) => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);

  return (
    <>
      <Heading>Khudabadi Amil Panchayat Application Form</Heading>
      <Text mt="1.5rem" maxW="2xl" color="#1F2937">
        Fill out the fields below to complete your personal profile, make sure
        to fill all the fields and not miss out on any important details.
      </Text>

      <Formik
        initialValues={personalInfo}
        validationSchema={personalInfoSchema}
        onSubmit={(values, actions) => {
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
                { label: "Occupation", required: true },
                { label: "Date of Birth", inputType: "date", required: true },
                { label: "Mobile Number", required: true },
                { label: "Email ID", required: true },
              ].map(({ label, inputType, required }, i) => (
                <LabelledInput
                  key={i}
                  label={label}
                  type={inputType ? (inputType as InputType) : "text"}
                  required={required}
                  isDisabled={user ? (user.KAP_member ? true : false) : true} // parameter to prevent interaction with first form phase
                />
              ))}
            </Grid>

            <Grid
              mt="2rem"
              gap="2rem"
              templateColumns={["1fr", "repeat(2, 1fr)"]}
            >
              {[
                {
                  label: "Maiden Surname",
                  name: "maidenSurname",
                  required: true,
                },
                { label: "Maiden Name", name: "maidenName", required: true },
                { label: "Father's name", name: "fathersName", required: true },
                { label: "Mother's name", name: "mothersName", required: true },
              ].map(({ label, name, required }, i) => (
                <LabelledInput
                  key={i}
                  label={label}
                  name={name ?? label}
                  required={required}
                  isDisabled={user ? (user.KAP_member ? true : false) : true} // parameter to prevent interaction with first form phase
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
                <LabelledInput
                  key={i}
                  label={label}
                  name={name ?? label}
                  required={required}
                />
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
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [proposerInfo, setProposerInfo] = useAtom(proposerInfoAtom);

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
                { label: "Last Name", required: true },
                { label: "Mobile Number", required: true },
              ].map(({ label, required }, i) => (
                <LabelledInput key={i} label={label} required={required} />
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
                Next
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

const MembershipDetailsSection: React.FC = () => {
  const toast = useToast();

  const formMut = api.form.kapMembership.useMutation();

  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [membershipInfo, setMembershipInfo] = useAtom(membershipInfoAtom);
  const [formState] = useAtom(atom((get) => get(kapFormAtom)));

  const [paymentAmount, setPaymentAmount] = useState<number>(0);
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
                // description: `Your membership ID: ${membershipId}`,
                description: "We will get back to you shortly.",
                status: "success",
                duration: 90000,
                isClosable: true,
              });
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
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
              membershipInfo.membershipType === label.toLowerCase()
                ? "1px solid #C05621"
                : "1px solid #CBD5E0"
            }
            borderRadius="5px"
            cursor="pointer"
            onClick={() => {
              setMembershipInfo({
                membershipType: label === "Patron" ? "patron" : "life-member",
              });

              setPaymentAmount(
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
            {paymentAmount === 500000
              ? "Patron"
              : paymentAmount === 250000
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
            Rs. {paymentAmount !== 0 ? paymentAmount / 100 : "—"}
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
        </Button>
      </Flex>
    </>
  );
};

export default KhudabadiAmilPanchayatMembershipForm;
