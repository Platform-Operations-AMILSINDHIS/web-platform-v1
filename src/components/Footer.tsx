import { Box, Flex, Text } from "@chakra-ui/react";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <Box
      pt="65px"
      color="gray.200"
      bg="rgba(0,22,43)"
      px={40}
      w="full"
      as="footer"
    >
      <Flex>
        <Flex flexDir="column">
          <Text fontSize="3xl">Logo</Text>
          <Text fontSize="md" color="gray.400">
            Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
          </Text>
        </Flex>
        <Flex></Flex>
        <Flex></Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
