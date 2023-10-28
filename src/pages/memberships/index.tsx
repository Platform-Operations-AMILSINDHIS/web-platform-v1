import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "~/components/layout";
import HeroSection from "~/sections/MembersPage/HeroSection";
import PaymentSection from "~/sections/MembersPage/PaymentSection";
import RequirementSection from "~/sections/MembersPage/RequirementSection";

const MembershipsHomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <HeroSection />
      <RequirementSection />
      <Flex w="full" justify="center">
        <Text py={7} textAlign="center" maxW={800}>
          <span style={{ fontWeight: "600" }}>Kindly note:</span> There is no
          difference between Patron Membership and Life Membership currently.
          Previously, some members were unable to pay higher membership fees, so
          ancestors created two different types of memberships.
        </Text>
      </Flex>
      <PaymentSection />
    </Layout>
  );
};

export default MembershipsHomePage;
