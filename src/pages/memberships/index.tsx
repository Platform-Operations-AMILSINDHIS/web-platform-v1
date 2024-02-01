import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "~/components/layout";
import HeroSection from "~/sections/MembersPage/HeroSection";
import PaymentSection from "~/sections/MembersPage/PaymentSection";
import RequirementSection from "~/sections/MembersPage/RequirementSection";

const MembershipsHomePage: NextPage = () => {
  return (
    <Layout title="Memberships">
      <HeroSection />
      <RequirementSection />
      <PaymentSection />
    </Layout>
  );
};

export default MembershipsHomePage;
