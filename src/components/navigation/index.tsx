import { Box, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useUserAtom } from "~/lib/atom";
import { IoIosMenu } from "react-icons/io";

import Image from "next/image";

import AmilSindhiLogo from "../../../public/images/amil-sindhis-logo.png";

import AccountDisplay from "./AccountDisplay";
import NavigationDropDown from "./NavigationDropDown";
import NavigationRegular from "./NavigationRegular";
import AuthModal from "../authentication/AuthModal";
import ModalButton from "../buttons/ModalButtons";
import NavigationMobile from "./NavigationMobile";

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
  matrimonyAccess?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  navigationItems,
  userLocation,
  matrimonyAccess,
}) => {
  const {
    isOpen: isAuthOpen,
    onOpen: onAuthOpen,
    onClose: onAuthClose,
  } = useDisclosure();

  const {
    isOpen: isNavMobileOpen,
    onOpen: onNavMobileOpen,
    onClose: onNavMobileClose,
  } = useDisclosure();

  const [authState, setAuthState] = useState<
    "login" | "signup" | "forgotPassword"
  >("login");
  const [{ user }] = useUserAtom();

  const authStateHandleFunction = (
    authType: "login" | "signup" | "forgotPassword"
  ) => {
    setAuthState(authType);
    onAuthOpen();
  };

  return (
    <>
      <Box
        mx={{ base: 100 }}
        display={{ base: "block", md: "block", lg: "none" }}
        px={{ base: 60, md: 20 }}
      >
        <Flex w="full" align="center" justify="flex-end">
          <Icon
            onClick={onNavMobileOpen}
            color="orange.500"
            boxSize={10}
            as={IoIosMenu}
          />
        </Flex>
      </Box>
      <Box display={{ base: "none", md: "none", lg: "block" }}>
        <Flex
          justify="space-between"
          align="center"
          borderRadius="5px"
          px={"30px"}
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
                    navItem?.identifierURLS?.includes(userLocation)
                      ? "black"
                      : ""
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

          {user ? (
            <AccountDisplay user={user} />
          ) : (
            <Flex gap={3} color="gray.700">
              <ModalButton
                CTASize="sm"
                CTAlabel="Log in"
                CTATheme={true}
                CTAaction={() => authStateHandleFunction("login")}
              />
              <ModalButton
                CTASize="sm"
                CTAlabel="Sign up"
                CTAaction={() => authStateHandleFunction("signup")}
              />
            </Flex>
          )}
        </Flex>
      </Box>
      <AuthModal
        authState={authState}
        modalState={isAuthOpen}
        handleModal={onAuthClose}
        authStateHandleFunction={authStateHandleFunction}
      />
      <NavigationMobile
        user={user}
        userLocation={userLocation}
        navigationItems={navigationItems}
        isOpen={isNavMobileOpen}
        onClose={onNavMobileClose}
        authStateHandleFunction={authStateHandleFunction}
      />
    </>
  );
};

export default Navigation;
