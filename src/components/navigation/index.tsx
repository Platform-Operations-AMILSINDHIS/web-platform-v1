import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";
import NavigationDropDown from "./NavigationDropDown";
import NavigationRegular from "./NavigationRegular";
import Image from "next/image";

import AmilSindhiLogo from "../../../public/images/amil-sindhis-logo.png";

interface NavigationProps {
  navigationItems: {
    linkTitle: string;
    linkURL: string;
    identifierURLS: string[];
    subURLs: {
      linkTitle: string;
      linkURL: string;
    }[];
  }[];
  userLocation: string;
}

const Navigation: React.FC<NavigationProps> = ({
  navigationItems,
  userLocation,
}) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      borderRadius="5px"
      px={"40px"}
      py={1}
      transition="all 0.3s ease-out"
      className="shadow-xl"
      border="2px solid"
      borderColor="gray.50"
      fontWeight="medium"
      color="rgba(0, 0, 0, 0.60)"
    >
      <Box as="a" href="/">
        <Image src={AmilSindhiLogo} width={55} height={55} alt="NGO_Logo" />
      </Box>
      <Flex gap="20px">
        {navigationItems.map((navItem, index) => {
          return (
            <Flex
              transition="all 0.2s ease-out"
              _hover={{
                color: "black",
              }}
              borderRadius={5}
              bg={
                navItem?.identifierURLS?.includes(userLocation)
                  ? "rgba(4, 239, 175, 0.20)"
                  : ""
              }
              color={
                navItem?.identifierURLS?.includes(userLocation) ? "black" : ""
              }
              px={2}
              py={1}
              align="center"
              key={index}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {navItem.subURLs.length > 0 ? (
                <NavigationDropDown
                  linkTitle={navItem.linkTitle}
                  subURLs={navItem.subURLs}
                />
              ) : (
                <NavigationRegular
                  linkTitle={navItem.linkTitle}
                  linkURL={navItem.linkURL}
                />
              )}
            </Flex>
          );
        })}
      </Flex>
      <Flex gap={4} color="gray.700">
        <Box
          as="a"
          href="https://twitter.com/i/flow/login?redirect_after_login=%2Familsindhis"
        >
          <Icon boxSize={5} as={BsTwitter} />
        </Box>
        <Box
          as="a"
          href="https://www.linkedin.com/in/the-khudabadi-amil-panchayat-of-bombay-836830251/?originalSubdomain=in"
        >
          <Icon boxSize={5} as={BsLinkedin} />
        </Box>
        <Box as="a" href="https://wa.me/message/QESQXVMVI4RAD1">
          <Icon boxSize={5} as={BsWhatsapp} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navigation;
