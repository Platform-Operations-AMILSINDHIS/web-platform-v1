import { Box, Divider, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { FooterConstants } from "../constants/LandingConstants.json";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";

import FooterLogo from "../../public/images/Footer/FooterLogo.svg";
import Image, { type StaticImageData } from "next/image";
import { GetServerSideProps } from "next";
import { EventCollectionQueryQuery } from "~/lib/__generated/sdk";

const socialLinks = [
  {
    ICON: BsFacebook,
    url: "",
  },
  {
    ICON: BsTwitter,
    url: "https://twitter.com/amilsindhis?t=AqSLK-YMEZevOcieUMwcvw&s=09",
  },
  {
    ICON: BsInstagram,
    url: "https://instagram.com/kapofbombay?igshid=MzNlNGNkZWQ4Mg==",
  },
  {
    ICON: BsLinkedin,
    url: "https://www.linkedin.com/in/the-khudabadi-amil-panchayat-of-bombay-836830251",
  },
  {
    ICON: BsYoutube,
    url: "https://youtube.com/@thekhudabadiamilpanchayato3151",
  },
];

const contactLinks = [
  {
    ICON: AiOutlineMail,
    LinkLabel: "amilsindhis@gmail.com",
  },
  {
    ICON: BsTelephone,
    LinkLabel: "(+91) 9820081700",
  },
  {
    ICON: CiLocationOn,
    LinkLabel:
      "1 A, Sindhu House,1st Floor, Nanabhai Lane, Fort, Mumbai, Maharashtra 400001",
  },
];

const Footer = () => {
  return (
    <Box
      pt="65px"
      color="gray.200"
      bg="rgba(0,22,43)"
      px="130px"
      w="full"
      as="footer"
    >
      <Flex w="full" flexDir="column" align="center" justify="center">
        <Flex mb={10} w="full" justify="space-between">
          <Flex align="center" gap={3} flexDir="column">
            <Image
              src={FooterLogo as StaticImageData}
              width={140}
              height={140}
              alt="NGO_Logo"
            />
            <Flex gap={5}>
              {socialLinks.map(({ ICON, url }, index) => {
                return (
                  <Box key={index} as="a" href={url}>
                    <Icon color="#FF4D00" as={ICON} />
                  </Box>
                );
              })}
            </Flex>
          </Flex>
          <Flex gap="50px">
            {FooterConstants.map((footerDiv, index) => {
              return (
                <Flex gap={7} flexDir="column" key={index}>
                  <Text fontWeight={600}>{footerDiv.FooterColumnTitle}</Text>
                  <Flex gap={2} flexDir="column">
                    {footerDiv.FooterColumnItems.map((navItem, index) => {
                      return (
                        <Text
                          color="gray.400"
                          key={index}
                          as="a"
                          href={navItem.LinkUrl}
                        >
                          {navItem.LinkLabel}
                        </Text>
                      );
                    })}
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Flex gap={7} flexDir="column">
            <Text fontWeight={600}>Contact us</Text>
            <Flex gap={4} flexDir="column">
              {contactLinks.map(({ ICON, LinkLabel }, index) => {
                return (
                  <Flex gap={3} align="flex-start" key={index}>
                    <Icon boxSize={5} as={ICON} />
                    <Text w={250} color="gray.400">
                      {LinkLabel}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
        <Divider />
        <Flex color="gray.300" w="full" justify="space-between" my={5}>
          <Text>Copyright © 2023 Amil Sindhi</Text>
          <Text>
            All Rights Reserved |{" "}
            <span
              style={{
                color: "#FF4D00",
                textDecoration: "underline",
              }}
            >
              Terms and Conditions
            </span>{" "}
            |{" "}
            <span
              style={{
                color: "#FF4D00",
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </span>{" "}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
