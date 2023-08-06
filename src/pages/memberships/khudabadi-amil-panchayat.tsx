import {
  Text,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "~/components/layout";

import { eudoxus } from "~/utils/fonts";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  return (
    <Layout title="Home">
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

      <Spacer h="3rem" />

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
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
