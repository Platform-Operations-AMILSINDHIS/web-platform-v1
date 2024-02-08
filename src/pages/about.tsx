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
import ManagingCommunitySection from "~/sections/AboutPage/ManagingCommunitySection";

export const getServerSideProps: GetServerSideProps<{
  induShaniWords: string;
  foundingMembers: {
    name: string;
    position: string;
    displayPictureUrl: string;
  }[];
  otherMembers: {
    memberName: string;
    memberPosition: string;
    displayPictureUrl: string;
  }[];
}> = async () => {
  const iswQ = await client.induShaniWordsQuery();
  const foundingMembersQ = await client.officeBearersQuery();
  const otherMembers = await client.membersOfTheManagingCommitteeKapQuery();

  // console.log({
  //   induShaniWords: iswQ.induShaniWords?.herWords,
  //   foundingMembers:
  //     foundingMembersQ.officeBearersCollection?.items.map((ob) => ({
  //       name: ob?.officeBearerName ?? "",
  //       position: ob?.officeBearerPosition ?? "",
  //       displayPictureUrl: ob?.displayPicture?.url ?? "",
  //     })) ?? [],
  //   otherMembers:
  //     otherMembers.membersOfTheManagingCommitteeKapCollection?.items.map(
  //       (ob) => ({
  //         name: ob?.mkapName ?? "",
  //         position: ob?.mkapPosition ?? "",
  //         displayPictureUrl: ob?.mkapDisplayPicture ?? "",
  //       })
  //     ),
  // });
  return {
    props: {
      induShaniWords: iswQ.induShaniWords?.herWords ?? "",
      foundingMembers:
        foundingMembersQ.officeBearersCollection?.items.map((ob) => ({
          name: ob?.officeBearerName ?? "",
          position: ob?.officeBearerPosition ?? "",
          displayPictureUrl: ob?.displayPicture?.url ?? "",
        })) ?? [],
      otherMembers:
        otherMembers.membersOfTheManagingCommitteeKapCollection?.items.map(
          (ob) => ({
            memberName: ob?.mkapName ?? "",
            memberPosition: ob?.mkapPosition ?? "",
            displayPictureUrl: ob?.mkapDisplayPicture?.url ?? "",
          })
        ) ?? [],
    },
  };
};

const AboutPage = ({
  induShaniWords,
  foundingMembers,
  otherMembers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title="Home">
      <HeroSection />
      <Spacer h="2rem" />
      <LegacyBox />
      <Spacer h="2rem" />
      <FoundingMembers {...{ induShaniWords, foundingMembers }} />
      <Spacer h="8rem" />
      {/* <PresidentsSection />
      <Spacer h="8rem" /> */}
      <CommitteesSection />
      <Spacer h="8rem" />
      <ConstitutionBox />
      <Spacer h="8rem" />
      <ConnectingAndYACSection />
      <Spacer h="8rem" />
      <CommunityBox />
      <Spacer h="8rem" />
      <ManagingCommunitySection otherMembers={otherMembers} />
      <Spacer h="8rem" />
    </Layout>
  );
};

export default AboutPage;
