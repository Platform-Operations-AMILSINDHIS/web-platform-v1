import { useRef } from "react";
import { Link } from "@chakra-ui/next-js";

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Text,
} from "@chakra-ui/react";

import { FaChevronDown, FaTwitter, FaLinkedin, FaBars } from "react-icons/fa";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About us",
    href: "/about",
    // dropdownItems: [],
  },
  {
    name: "Connecting Amils",
    href: "/blog",
    dropdownItems: [
      { name: "Matrimony", href: "/blog/matrimony" },
      { name: "Relief", href: "/blog/relief" },
      { name: "Events", href: "/blog/events" },
      { name: "Global Networking", href: "/blog/global-networking" },
      { name: "Young Amil Circle", href: "/blog/young-amil-circle" },
    ],
  },
  {
    name: "Upcoming Events",
    href: "/events",
    // dropdownItems: [],
  },
  {
    name: "Donations",
    href: "/donations",
  },
  {
    name: "Memberships",
    href: "/memberships",
  },
];

const NavbarItem: React.FC<{
  name: string;
  href: string;
  dropdownItems?: { name: string; href: string }[];
}> = ({ name, href, dropdownItems }) => {
  return (
    <Link href={href} _hover={{ textDecor: "none" }}>
      <Flex
        align="center"
        borderRadius="5px"
        px="8px"
        py="4px"
        transition="all 0.3s ease-out"
        _hover={{ bg: "#04EFAF" }}
      >
        <Text mr={dropdownItems ? "8px" : "0px"}>{name}</Text>
        {/* TODO: Implement Chakra Menu on hover for dropdown items */}
        {dropdownItems && <FaChevronDown size="15px" />}
      </Flex>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        display={["none", "flex"]}
        h="10vh"
        w="100%"
        align="center"
        justify="space-around"
      >
        {navItems.map((item, i) => (
          <NavbarItem key={i} {...item} />
        ))}

        {/* Social Icons */}
        <Flex gap="1rem">
          {/* TODO: Put actual social links here */}
          {[
            { Icon: FaTwitter, href: "#" },
            {
              Icon: FaLinkedin,
              href: "#",
            },
          ].map(({ Icon, href }, i) => (
            <Link key={i} href={href} style={{ textDecoration: "none" }}>
              <Icon size="22px" />
            </Link>
          ))}
        </Flex>
      </Flex>

      <Flex
        display={["flex", "none"]}
        px="15px"
        py="18px"
        align="center"
        justify="space-between"
      >
        <Text fontSize="xl" fontWeight="semibold">
          Amil Sindhis
        </Text>
        <Text cursor="pointer" onClick={onOpen}>
          <FaBars size="22px" />
        </Text>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Flex
                h="100%"
                w="80%"
                align="center"
                justify="center"
                flexDir="column"
                gap="1rem"
              >
                <Flex flexDir="column" gap="3rem" my="auto">
                  {navItems.map((item, i) => (
                    <NavbarItem key={i} {...item} />
                  ))}
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

export default Navbar;
