import { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Icon,
  Spacer,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";

import Constants from "../constants/LandingConstants.json";

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
    LinkLabel: "(414)687-5892",
  },
  {
    ICON: CiLocationOn,
    LinkLabel: "794 Mcallister St San Francisco, 94102",
  },
];

const Footer = () => {
  const [modalContent, setModalContent] = useState<string | undefined>(
    undefined
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="50vw">
          <ModalBody>
            <Box dangerouslySetInnerHTML={{ __html: modalContent ?? "" }} />
          </ModalBody>
        </ModalContent>
      </Modal>
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
            <Flex gap={3} flexDir="column">
              <Text fontSize="3xl">Logo</Text>
              <Text w={300} fontSize="md" color="gray.400">
                Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
              </Text>
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
            <Flex gap="70px">
              {Constants.FooterConstants.map((footerDiv, index) => {
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
                            href={navItem.LinkUrl ?? "#"}
                            onClick={
                              navItem.LinkText
                                ? (e) => {
                                    e.preventDefault();
                                    if (navItem.LinkText) {
                                      setModalContent(navItem.LinkText);
                                      onOpen();
                                    }
                                  }
                                : () => { return }
                            }
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
    </>
  );
};

export default Footer;
