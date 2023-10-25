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
  imageUrl: string;
}

const ContactBanner = ({ imageUrl }: sectionProps) => {
  return (
    <>
      <Spacer h="5rem" />
      <Box
        maxW="1350px"
        mx="auto"
        py="5rem"
        px="9rem"
        // background="linear-gradient(90deg, #FFBE1E 0%, #FF4D00 68.8%)"
        borderRadius="20px"
        boxShadow="2px 4px 0px 3px rgba(0, 0, 0, 0.74);"
        style={{
          backgroundImage: "url('/images/backgrounds/ajrak_bg_legacy.jpg')",
          position: "relative",
          zIndex: 1,
        }}
        // position="relative"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(270deg, rgba(255, 77, 0, 0.9) 26.52%, rgba(255, 192, 31, 0.5) 100%)",
            zIndex: -1,
            borderRadius: "20px",
          }}
        />
        <Flex align={"flex-start"} justify="space-between">
          <Flex flexDir="column" color="white">
            <Heading fontSize="6xl" fontWeight={800}>
              Have a question&nbsp;?
              <br />
              feel free to ask
            </Heading>
          </Flex>

          <Flex gap={5} flexDir="column" h="100%">
            <Text
              color="white"
              maxW={580}
              mt="1rem"
              fontSize="lg"
              fontWeight={400}
            >
              Drop us an email & we&apos;ll get back to you with the <br />{" "}
              responses to your queries
            </Text>
            <InputGroup>
              <Input
                width={380}
                type="email"
                placeholder="Send a message..."
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
          </Flex>
        </Flex>
      </Box>
      <Spacer h="5rem" />
    </>
  );
};

export default ContactBanner;
