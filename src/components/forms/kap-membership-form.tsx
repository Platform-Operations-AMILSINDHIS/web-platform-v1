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
} from "@chakra-ui/react";
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
  MembershipInfo,
  ProposerInfo,
} from "~/types/forms/kap-membership";

import { Formik, Form } from "formik";

const KhudabadiAmilPanchayatMembershipForm: React.FC<{
  activeStep: number;
}> = ({ activeStep }) => {
  // TODO: Setup global formState for all the Formik forms to mutate onSubmit, maybe use Jotai for this

  const [formState, setFormState] = useState<KAPMembershipFormValues>({
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
      // firstName2: "",
      // lastName2: "",
      // phone2: "",
    },
  });

  useEffect(
    () => console.log(JSON.stringify(formState.familyMembers, null, 2)),
    [formState]
  );

  return (
    // TODO: setup initialValues attribute for all form sections from global formState
    <>
      {activeStep === 1 && (
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
        <MembershipDetailsSection
          initialValues={formState.membershipInfo}
          stateSetter={(values: MembershipInfo) =>
            setFormState({ ...formState, membershipInfo: values })
          }
        />
      )}

      {activeStep === 4 && (
        <FamilyMemberDetailsSection
          initialValues={formState.familyMembers ?? []}
          stateSetter={(values: FamilyMember[]) =>
            setFormState({ ...formState, familyMembers: values })
          }
        />
      )}

      {activeStep === 5 && <ProposerDetailsSection />}
    </>
  );
};

const PersonalInformationSection: React.FC<{
  initialValues: PersonalInfo;
  stateSetter: (values: PersonalInfo) => void;
}> = ({ initialValues, stateSetter }) => {
  return (
    <>
      <Heading>Personal Information</Heading>
      <Text mt="1.5rem" maxW="2xl" color="#1F2937">
        Fill out the fields below to complete your personal profile, make sure
        to fill all the fields and not miss out on any important details.
      </Text>

      <Formik
        initialValues={initialValues}
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
              { label: "Middle Name" },
              { label: "Last Name" },
              { label: "Occupation" },
              { label: "Date of Birth", inputType: "date" },
              { label: "Mobile Number" },
              { label: "Email ID" },
            ].map(({ label, inputType }, i) => (
              <LabelledInput key={i} label={label} type={inputType ?? "text"} />
            ))}
          </Grid>

          <Grid
            mt="2rem"
            gap="2rem"
            templateColumns={["1fr", "repeat(3, 1fr)"]}
          >
            {[
              { label: "Maiden Surname" },
              { label: "Maiden Name" },
              { label: "Father's name", name: "fathersName" },
              { label: "Mother's name", name: "mothersName" },
            ].map(({ label, name }, i) => (
              <LabelledInput key={i} label={label} name={name ?? label} />
            ))}
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

const AddressDetailsSection: React.FC<{
  initialValues: AddressInfo;
  stateSetter: (values: AddressInfo) => void;
}> = ({ initialValues, stateSetter }) => {
  return (
    <>
      <Heading>Residential Address</Heading>
      <Formik
        initialValues={initialValues}
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

const MembershipDetailsSection: React.FC<{
  initialValues: MembershipInfo;
  stateSetter: (values: MembershipInfo) => void;
}> = ({ initialValues, stateSetter }) => {
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
                ? "1px solid #3182CE"
                : "1px solid #CBD5E0"
            }
            borderRadius="5px"
            cursor="pointer"
            onClick={() =>
              stateSetter({
                membershipType: label === "Patron" ? "patron" : "life-member",
              })
            }
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
          The Applicant hereby declares that, I am a Khudabadi Amil and request
          the Committee to admit me as Patron / Life-Member of The Khudabadi
          Amil Panchayat of Bombay.
        </Text>
        <Text>
          I agree to abide by the Constitution and Rules of the Khudabadi Amil
          Panchayat of Bombay in force from time to time.
        </Text>
        <Text>I hereby agree to pay Rs 5000/- as membership fees.</Text>
      </Flex>
    </>
  );
};

const FamilyMemberDetailsSection: React.FC<{
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
              { label: "Age", initialValue: fm.age },
            ].map(({ label, initialValue }, j) => (
              <LabelledInput
                key={j}
                label={label}
                type="chakra-text"
                defaultValue={initialValue as string}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newMembers = [...familyMembers];
                  newMembers[i] = {
                    ...newMembers[i],
                    [camelCase(label)]: e.target.value ? e.target.value : "",
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

const ProposerDetailsSection = () => {
  return (
    <>
      <div>proposer details</div>
    </>
  );
};

export default KhudabadiAmilPanchayatMembershipForm;
