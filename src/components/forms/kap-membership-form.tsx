import { useState, useEffect } from "react";
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

import { LabelledInput } from "./index";

import type { PersonalInfo, FamilyMember } from "~/types/forms/kap-membership";

const KhudabadiAmilPanchayatMembershipForm: React.FC<{
  activeStep: number;
}> = ({ activeStep }) => {
  return (
    <>
      {/* <div>{activeStep}</div> */}
      <PersonalInformationSection />
    </>
  );
};

const PersonalInformationSection = () => {
  // const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});

  return (
    <>
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
          { label: "Date of Birth", inputType: "date" },
          { label: "Mobile Number" },
          { label: "Email ID" },
        ].map(({ label }, i) => (
          // TODO: Replace with component which handles specialInputs too
          <LabelledInput key={i} label={label} />
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
    </>
  );
};

const AddressDetailsSection = () => {
  return (
    <>
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
    </>
  );
};

const MembershipDetailsSection = () => {
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

const FamilyMemberDetailsSection = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  useEffect(() => console.log({ familyMembers }), [familyMembers]);

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
              },
              { label: "Relationship" },
              { label: "Occupation" },
              { label: "Age" },
            ].map(({ label }, i) => (
              <FormControl key={i}>
                <FormLabel fontSize="sm" fontWeight="light">
                  {label}
                </FormLabel>
                <Input py="30px" borderRadius="5px" type="text" />
              </FormControl>
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
