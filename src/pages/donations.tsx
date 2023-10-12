import type { NextPage } from "next";
import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import HeroSection from "~/sections/DonationsPage/HeroSection";
import LegacyFoundersSection from "~/sections/DonationsPage/LegacyFoundersSection";

const DonationsPage: NextPage = () => {
  return (
    <Layout title="Home">
      <HeroSection />

      <Spacer h="2rem" />

      <LegacyFoundersSection />
    </Layout>
  );
};

export default DonationsPage;
