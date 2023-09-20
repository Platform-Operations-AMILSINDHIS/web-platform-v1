import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import constants from "../constants/LandingConstants.json";
import Layout from "~/components/layout";
import ContactBanner from "~/sections/LandingPage/ContactBanner";
import CuriousSection from "~/sections/LandingPage/CuriousSection";
import DonationsSection from "~/sections/LandingPage/DonationsSection";
import HeroSection from "~/sections/LandingPage/HeroSection";
import OfferingsSection from "~/sections/LandingPage/OfferingsSection";
import SponsorsSection from "~/sections/LandingPage/SponsorsSection";
import WhatSection from "~/sections/LandingPage/WhatSection";

const HomePage: NextPage = () => {
  const eventsPicArray = [
    {
      image: "/images/curious-about-events/blue-circle.png",
      date: new Date("2023-02-13"),
      title: "Vaccination Drive, Blue Circle",
    },
    {
      image: "/images/curious-about-events/powai-lake.png",
      date: new Date("2023-02-13"),
      title: "Cheti Chanda, Powai Lake",
    },
    {
      image: "/images/curious-about-events/marine-drive.png",
      date: new Date("2023-02-13"),
      title: "Movie Screening, Marine Drive",
    },
  ];

  return (
    <Layout title="Home" maxW={false}>
      <Box maxW="1280px" mx="auto" px="2rem">
        <HeroSection />
        <SponsorsSection />
      </Box>
      <WhatSection imageUrl={constants.WhatSectionPicture} />
      <Box maxW="1280px" mx="auto" px="2rem">
        <OfferingsSection picturesArray={constants.picturesArray} />
        <CuriousSection eventPics={eventsPicArray} />
        <DonationsSection imageUrl={constants.DonationsPicture} />
      </Box>
      <ContactBanner imageUrl={constants.BannerPicture} />
    </Layout>
  );
};

export default HomePage;
