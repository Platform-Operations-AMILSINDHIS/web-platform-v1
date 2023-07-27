import { Link } from "@chakra-ui/next-js";
import { Flex, Text } from "@chakra-ui/react";

import { FaChevronDown, FaTwitter, FaLinkedin } from "react-icons/fa";

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
  return dropdownItems ? (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        px="10px"
        py="5px"
        borderRadius="5px"
        align="center"
        transition="0.3s all ease-out"
        _hover={{
          bgColor: "#04EFAF",
        }}
      >
        <Text mr="5px">{name}</Text>
        <FaChevronDown size="15px" />
      </Flex>
    </Link>
  ) : (
    <Link href={href} style={{ textDecoration: "none" }}>
      {name}
    </Link>
  );
};

const Navbar: React.FC = () => {
  return (
    <Flex as="nav" w="100%" h="10vh" justify="space-around" align="center">
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
  );
};

export default Navbar;
