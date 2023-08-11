import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "~/components/layout";
import ContactBanner from "~/sections/LandingPage/ContactBanner";
import CuriousSection from "~/sections/LandingPage/CuriousSection";
import DonationsSection from "~/sections/LandingPage/DonationsSection";
import HeroSection from "~/sections/LandingPage/HeroSection";
import OfferingsSection from "~/sections/LandingPage/OfferingsSection";
import SponsersSection from "~/sections/LandingPage/SponsersSection";
import WhatSection from "~/sections/LandingPage/WhatSection";

const HomePage: NextPage = () => {
  const picturesArray = [
    {
      image: "/images/what-we-offer/memberships.jpg",
      name: "Memberships",
      href: "/memberships/khudabadi-amil-panchayat",
    },
    {
      image: "/images/what-we-offer/donations.png",
      name: "Donations",
      href: "/donations",
    },
    {
      image: "/images/what-we-offer/matrimony.png",
      name: "Matrimony",
      href: "/connecting/matrimony",
    },
    {
      image: "/images/what-we-offer/events.png",
      name: "Events",
      href: "/events",
    },
    {
      image: "/images/what-we-offer/blogs.png",
      name: "Blogs",
      href: "/blog",
    },
    {
      image: "/images/what-we-offer/connect.png",
      name: "Connect",
      href: "/connecting/matrimony",
    },
  ];

  const eventPicsArray = [
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

  const BannerPicture = "/images/qna-graphic.png";
  const DonationsPicture = "/images/donations-and-memberships-section.png";
  const WhatSectionPicture = "/images/backgrounds/what-are-we-illustration.png";

  return (
    <Layout title="Home" maxW={false}>
      <Box maxW="1280px" mx="auto" px="2rem">
        <HeroSection />
        <SponsersSection />
      </Box>
      <WhatSection ImageURL={WhatSectionPicture} />
      <Box maxW="1280px" mx="auto" px="2rem">
        <OfferingsSection picturesArray={picturesArray} />
        <CuriousSection EventPics={eventPicsArray} />
        <DonationsSection ImageURL={DonationsPicture} />
      </Box>
      <ContactBanner ImageURL={BannerPicture} />
    </Layout>
  );
};

export default HomePage;
