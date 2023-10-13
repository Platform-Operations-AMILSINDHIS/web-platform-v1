import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

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
      px={"60px"}
      py={3}
      transition="all 0.3s ease-out"
      className="shadow-xl"
      border="2px solid"
      borderColor="gray.50"
      fontWeight="medium"
      color="rgba(0, 0, 0, 0.60)"
    >
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
              gap={2}
              px={4}
              py={1}
              align="center"
              key={index}
            >
              <Text as="a" href={navItem.linkURL}>
                {navItem.linkTitle}
              </Text>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {navItem.subURLs.length > 0 ? (
                <Icon as={IoIosArrowDown} />
              ) : (
                <></>
              )}
            </Flex>
          );
        })}
      </Flex>
      <Flex gap={4} color="gray.700">
        <Icon boxSize={5} as={BsTwitter} />
        <Icon boxSize={5} as={BsLinkedin} />
      </Flex>
    </Flex>
  );
};

export default Navigation;
