import { Flex, Icon, Text } from "@chakra-ui/react";
import { BsLinkedin, BsTwitter } from "react-icons/bs";

interface NavigationProps {
  navigationItems: {
    linkTitle: string;
    linkURL: string;
    subURL?: {
      linkTitle: string;
      linkURL: string;
    }[];
  }[];
  userLocation: string;
}

const Navigation: React.FC<NavigationProps> = ({ navigationItems }) => {
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
      <Flex transition="all 0.3s ease-out" gap="60px">
        {navigationItems.map((navItem, index) => {
          return (
            <Flex key={index}>
              <Text as="a" href={navItem.linkURL}>
                {navItem.linkTitle}
              </Text>
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
