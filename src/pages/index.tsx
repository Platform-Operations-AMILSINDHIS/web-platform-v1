import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { EventCollectionQueryQuery } from "~/lib/__generated/sdk";

import React from "react";
import { Box } from "@chakra-ui/react";

import constants from "../constants/LandingConstants.json";

import Layout from "~/components/layout";

import ContactBanner from "~/sections/LandingPage/ContactBanner";
import CuriousSection from "~/sections/LandingPage/CuriousSection";
import DonationsSection from "~/sections/LandingPage/DonationsSection";
import HeroSection from "~/sections/LandingPage/HeroSection";
import OfferingsSection from "~/sections/LandingPage/OfferingsSection";
import WhatSection from "~/sections/LandingPage/WhatSection";

import { client } from "~/lib/client";

export const getServerSideProps: GetServerSideProps<{
  events: EventCollectionQueryQuery;
}> = async () => {
  const events = await client.eventCollectionQuery();
  return { props: { events } };
};

const HomePage = ({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const eventsPicArray = [
  //   {
  //     image: "/images/curious-about-events/blue-circle.png",
  //     date: new Date("2023-02-13"),
  //     title: "Vaccination Drive, Blue Circle",
  //   },
  //   {
  //     image: "/images/curious-about-events/powai-lake.png",
  //     date: new Date("2023-02-13"),
  //     title: "Cheti Chanda, Powai Lake",
  //   },
  //   {
  //     image: "/images/curious-about-events/marine-drive.png",
  //     date: new Date("2023-02-13"),
  //     title: "Movie Screening, Marine Drive",
  //   },
  // ];

  return (
    <Layout title="Home" maxW={false}>
      <Box maxW="1280px" mx="auto" px="2rem">
        <HeroSection />
      </Box>
      <WhatSection imageUrl={constants.WhatSectionPicture} />
      <Box maxW="1280px" mx="auto" px="2rem">
        <OfferingsSection picturesArray={constants.picturesArray} />
        <CuriousSection events={events} />
        <DonationsSection imageUrl={constants.DonationsPicture} />
      </Box>
      <ContactBanner imageUrl={constants.BannerPicture} />
    </Layout>
  );
};

export default HomePage;
