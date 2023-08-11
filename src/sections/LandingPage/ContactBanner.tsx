import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";

interface sectionProps {
  ImageURL: string;
}

const ContactBanner = ({ ImageURL }: sectionProps) => {
  return (
    <>
      <Spacer h="5rem" />
      <Box
        maxW="1480px"
        mx="auto"
        py="4rem"
        px="10rem"
        background="linear-gradient(90deg, #0079FF 24.48%, #F100F6 99.99%, #FFC01F 100%)"
        borderRadius="20px"
        boxShadow="2px 4px 0px 3px rgba(0, 0, 0, 0.74);"
        position="relative"
      >
        <Flex align={"flex-start"} justify="space-between">
          <Flex flexDir="column" color="white">
            <Heading fontSize="6xl" fontWeight="extrabold">
              Have a question&nbsp;?
              <br />
              feel free to ask
            </Heading>
            <Text maxW={580} mt="1rem" fontSize="lg">
              Drop us an email & we&apos;ll get back to you with the responses
              to your queries
            </Text>
          </Flex>

          <Box h="100%">
            <InputGroup>
              <Input
                width={400}
                type="email"
                placeholder="Your email address"
                background="white"
              />
              <InputRightAddon
                background="#1F2937"
                cursor="pointer"
                border="#000"
              >
                <FaShare color="white" />
              </InputRightAddon>
            </InputGroup>

            <Box position="absolute" bottom="0">
              <img alt="" src={ImageURL} />
            </Box>
          </Box>
        </Flex>
      </Box>
      <Spacer h="5rem" />
    </>
  );
};

export default ContactBanner;
