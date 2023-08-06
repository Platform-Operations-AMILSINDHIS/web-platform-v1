import { useRef } from "react";
import Link from "next/link";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
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
  return dropdownItems ? (
    <Link href={href}>
      <div className="flex cursor-pointer items-center rounded-lg px-2 py-1 transition-all hover:bg-[#04EFAF]">
        <div className="mr-2">{name}</div>
        <FaChevronDown size="15px" />
      </div>
    </Link>
  ) : (
    // Implement dropdown
    <Link href={href} style={{ textDecoration: "none" }}>
      <div className="flex cursor-pointer items-center rounded-lg px-2 py-1 transition-all hover:bg-[#04EFAF]">
        <div className="mr-2">{name}</div>
      </div>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hamburgerRef = useRef();

  return (
    <>
      <nav className="hidden h-[10vh] w-full items-center justify-around md:flex">
        {navItems.map((item, i) => (
          <NavbarItem key={i} {...item} />
        ))}

        {/* Social Icons */}
        <div className="flex gap-[1rem]">
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
        </div>
      </nav>

      <nav className="flex items-center justify-between px-4 py-5 md:hidden">
        <div className="text-xl font-semibold">Amil Sindhis</div>
        <div className="cursor-pointer" onClick={onOpen}>
          <FaBars size="22px" />
        </div>

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
      </nav>
    </>
  );
};

export default Navbar;
