import type { NextPage } from "next";
import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import HeroSection from "~/sections/DonationsPage/HeroSection";
import TypesSection from "~/sections/DonationsPage/TypesSection";
import RequirementsSection from "~/sections/DonationsPage/RequirementsSection";
import DonationsFormSection from "~/sections/DonationsPage/DonationsFormSection";

const DonationsPage: NextPage = () => {
  return (
    <Layout title="Home">
      <Spacer h="5rem" />

      <HeroSection />

      <Spacer h="2rem" />

      <TypesSection />

      <Spacer h="8rem" />

      <RequirementsSection />

      <Spacer h="8rem" />

      <DonationsFormSection />

      <Spacer h="8rem" />
    </Layout>
  );
};

export default DonationsPage;
