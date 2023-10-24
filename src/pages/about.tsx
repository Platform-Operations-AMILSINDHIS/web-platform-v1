import type { NextPage } from "next";
import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import HeroSection from "~/sections/AboutPage/HeroSection";
import LegacyBox from "~/sections/AboutPage/LegacyBox";
import FoundingMembers from "~/sections/AboutPage/FoundingMembers";
import PresidentsSection from "~/sections/AboutPage/PresidentsSection";
import CommitteesSection from "~/sections/AboutPage/CommitteesSection";
import ConstitutionBox from "~/sections/AboutPage/ConstitutionBox";
import ConnectingAndYACSection from "~/sections/AboutPage/ConnectingAndYACSection";
import CommunityBox from "~/sections/AboutPage/CommunityBox";

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
      <CommitteesSection />
      <Spacer h="8rem" />
      <ConstitutionBox />
      <Spacer h="8rem" />
      <ConnectingAndYACSection />
      <Spacer h="8rem" />
      <CommunityBox />
      <Spacer h="8rem" />
    </Layout>
  );
};

export default AboutPage;
