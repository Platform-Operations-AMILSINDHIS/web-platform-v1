import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
} from "@chakra-ui/react";
import NavigationDropDown from "./NavigationDropDown";
import NavigationRegular from "./NavigationRegular";
import AccountDisplay from "./AccountDisplay";
import ModalButton from "../buttons/ModalButtons";
import { userAtomBody } from "~/types/atoms/users";

interface NavigationMobileProps {
  user: userAtomBody | null;
  userLocation: string;
  isOpen: boolean;
  navigationItems: {
    linkTitle: string;
    linkURL: string;
    identifierURLS: string[];
    subURLs: {
      linkTitle: string;
      linkURL: string;
    }[];
  }[];
  onClose: () => void;
  authStateHandleFunction: (
    authState: "login" | "signup" | "forgotPassword"
  ) => void;
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({
  isOpen,
  user,
  userLocation,
  navigationItems,
  onClose,
  authStateHandleFunction,
}) => {
  return (
    <Drawer
      size={{ base: "xs", md: "sm" }}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigate your way !</DrawerHeader>

        <DrawerBody>
          <Flex flexDir="column" gap="15px">
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
        </DrawerBody>

        <DrawerFooter>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationMobile;
