
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
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

import { client } from "~/lib/client";

export const getServerSideProps: GetServerSideProps<{
  induShaniWords: string;
  foundingMembers: {
    name: string;
    position: string;
    displayPictureUrl: string;
  }[];
}> = async () => {
  const iswQ = await client.induShaniWordsQuery();
  const foundingMembersQ = await client.officeBearersQuery();

  console.log({
    induShaniWords: iswQ.induShaniWords?.herWords,
    foundingMembers:
      foundingMembersQ.officeBearersCollection?.items.map((ob) => ({
        name: ob?.officeBearerName ?? "",
        position: ob?.officeBearerPosition ?? "",
        displayPictureUrl: ob?.displayPicture?.url ?? "",
      })) ?? [],
  });
  return {
    props: {
      induShaniWords: iswQ.induShaniWords?.herWords ?? "",
      foundingMembers:
        foundingMembersQ.officeBearersCollection?.items.map((ob) => ({
          name: ob?.officeBearerName ?? "",
          position: ob?.officeBearerPosition ?? "",
          displayPictureUrl: ob?.displayPicture?.url ?? "",
        })) ?? [],
    },
  };
};

const AboutPage = ({
  induShaniWords,
  foundingMembers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title="Home">
      <HeroSection />
      <Spacer h="2rem" />
      <LegacyBox />
      <Spacer h="2rem" />
      <FoundingMembers {...{ induShaniWords, foundingMembers }} />
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
