import { Link } from "@chakra-ui/next-js";
import { Flex } from "@chakra-ui/react";

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
      {name}
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
    </Flex>
  );
};

export default Navbar;
