import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FooterConstants } from "../constants/LandingConstants.json";

import FooterLogo from "../../public/images/Footer/FooterLogo.svg";
import Image, { type StaticImageData } from "next/image";
import { contactLinks, socialLinks } from "~/constants/LandingConstants";
import TCPPModal from "./Footer/TCPPModal";
import useFooter from "~/hooks/useFooter";

const Footer = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    handleSetPPModal,
    handleSetRPModal,
    handleSetTCModal,
    modalText,
    modalTitle,
  } = useFooter({ modalHandler: onOpen });

  return (
    <Box
      pt="65px"
      color="gray.200"
      bg="rgba(0,22,43)"
      px={{ base: "60px", md: "100px", lg: "130px" }}
      w="full"
      as="footer"
    >
      <TCPPModal
        modalText={modalText}
        modalTitle={modalTitle}
        handleModal={onClose}
        modalState={isOpen}
      />
      <Flex w="full" flexDir="column" align="center" justify="center">
        <Flex
          flexDir={{ base: "column", md: "column", lg: "row" }}
          mb={10}
          w="full"
          justify="space-between"
        >
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
          <Flex
            flexDir={{ base: "column", md: "column", lg: "row" }}
            gap="50px"
          >
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
                          href={(navItem as { LinkUrl: string }).LinkUrl}
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
                    <Text w={350} color="gray.400">
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
              onClick={handleSetTCModal}
              style={{
                color: "#FF4D00",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Terms and Conditions
            </span>{" "}
            |{" "}
            <span
              onClick={handleSetPPModal}
              style={{
                color: "#FF4D00",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Privacy Policy
            </span>{" "}
            |{" "}
            <span
              onClick={handleSetRPModal}
              style={{
                color: "#FF4D00",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Refund Policy
            </span>{" "}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
