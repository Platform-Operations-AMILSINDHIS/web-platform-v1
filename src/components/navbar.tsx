import { useRouter } from "next/router";
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
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Box,
} from "@chakra-ui/react";
import { useCopyToClipboard } from "usehooks-ts";

import {
  FaChevronDown,
  FaTwitter,
  FaLinkedin,
  FaBars,
  FaChevronUp,
  FaShare,
} from "react-icons/fa";

const navItems = [
  // {
  //   name: "Home",
  //   href: "/",
  // },
  {
    name: "About us",
    href: "/about",
    // dropdownItems: [],
  },
  {
    name: "Connecting Amils",
    href: "/blog",
    dropdownItems: [
      { name: "Blog", href: "/blog" },
      { name: "Matrimony", href: "/connecting/matrimony" },
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
    dropdownItems: [
      {
        name: "Khudabadi Amil Panchayat",
        href: "/memberships/khudabadi-amil-panchayat",
      },
      { name: "Young Amil Circle", href: "/memberships/young-amil-circle" },
    ],
  },
];

const NavbarItem: React.FC<{
  name: string;
  href: string;
  dropdownItems?: { name: string; href: string }[];
  isActive?: boolean;
}> = ({ name, href, dropdownItems, isActive }) => {
  // Only relevant for navItems with dropdownItems
  const { isOpen, onOpen, onClose } = useDisclosure();

  return !dropdownItems ? (
    <Link href={href} _hover={{ textDecor: "none" }}>
      <Flex
        align="center"
        borderRadius="5px"
        px="8px"
        py="4px"
        transition="all 0.3s ease-out"
        bgColor={isActive ? "#04EFAF" : "transparent"}
        _hover={{ bg: "#04EFAF" }}
      >
        <Text userSelect="none" mr={dropdownItems ? "8px" : "0px"}>
          {name}
        </Text>
      </Flex>
    </Link>
  ) : (
    <>
      <Menu isOpen={isOpen} gutter={0}>
        <MenuButton
          as={Flex}
          borderRadius="5px"
          px="8px"
          py="4px"
          transition="all 0.3s ease-out"
          bgColor={isActive ? "#04EFAF" : "transparent"}
          _hover={{ bg: "#04EFAF" }}
          cursor="pointer"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <Flex align="center">
            <Text userSelect="none" mr={dropdownItems ? "8px" : "0px"}>
              {name}
            </Text>
            {isOpen ? (
              <FaChevronUp size="15px" />
            ) : (
              <FaChevronDown size="15px" />
            )}
          </Flex>
        </MenuButton>

        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
          {dropdownItems.map(({ name, href }, i) => (
            <Link key={i} href={href} _hover={{ textDecor: "none" }}>
              <MenuItem>{name}</MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

const Navbar: React.FC<{ blogPostPage?: boolean }> = ({
  blogPostPage = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { onCopy, setValue } = useClipboard("");
  const [value, copy] = useCopyToClipboard();

  const router = useRouter();

  return (
    <>
      <Flex
        display={["none", "flex"]}
        h="10vh"
        w="100%"
        maxW="1280px"
        mx="auto"
        align="center"
        justify="space-around"
      >
        <Box as={Link} href="/" h="auto" w="85px">
          <img alt="" src="/images/amil-sindhis-logo.png" />
        </Box>
        {!blogPostPage &&
          navItems.map((item, i) => (
            <NavbarItem
              key={i}
              {...item}
              isActive={
                router.pathname === item.href ||
                (item.dropdownItems &&
                  item.dropdownItems.some((i) => i.href === router.pathname))
              }
            />
          ))}

        {/* Reduce distractions on blog post page */}
        {blogPostPage && (
          <>
            {[
              // { name: "Home", href: "/" },
              { name: "Back to Blogs", href: "/blog" },
            ].map((item, i) => (
              <NavbarItem key={i} {...item} isActive={false} />
            ))}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </>
        )}

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

          {blogPostPage && (
            <Link
              href="#"
              style={{ textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault();

                if (typeof window !== "undefined") {
                  copy(window.location.href).catch(console.error);
                }
              }}
            >
              <FaShare size="22px" />
            </Link>
          )}
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
