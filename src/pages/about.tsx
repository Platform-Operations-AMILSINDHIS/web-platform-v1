import type { NextPage } from "next";
import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import HeroSection from "~/sections/AboutPage/HeroSection";
import LegacyBox from "~/sections/AboutPage/LegacyBox";
import FoundingMembers from "~/sections/AboutPage/FoundingMembers";
import PresidentsSection from "~/sections/AboutPage/PresidentsSection";
import ComitteesSection from "~/sections/AboutPage/ComitteesSection";

const AboutPage: NextPage = () => {
  return (
    <Layout title="Home">
      <HeroSection />

      <Spacer h="2rem" />

      <LegacyBox />

      <Spacer h="2rem" />

      <FoundingMembers />

      <Spacer h="8rem" />

      <PresidentsSection />

      <Spacer h="8rem" />

      <ComitteesSection />

      <Spacer h="8rem" />
    </Layout>
  );
};

export default AboutPage;
