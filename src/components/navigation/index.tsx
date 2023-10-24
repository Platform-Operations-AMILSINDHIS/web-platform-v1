import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";
import NavigationDropDown from "./NavigationDropDown";
import NavigationRegular from "./NavigationRegular";
import Image from "next/image";

import AmilSindhiLogo from "../../../public/images/amil-sindhis-logo.png";
import ModalButton from "../buttons/ModalButtons";

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
      <Flex gap="15px">
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
      <Flex gap={2} color="gray.700">
        <ModalButton
          CTASize="sm"
          CTAlabel="Log in"
          CTATheme={true}
          CTAaction={() => {
            console.log("hi");
          }}
        />
        <ModalButton
          CTASize="sm"
          CTAlabel="Sign in"
          CTAaction={() => {
            console.log("hi");
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Navigation;
