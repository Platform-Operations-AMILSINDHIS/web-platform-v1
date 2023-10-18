import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowCircleRight } from "react-icons/fa";

interface sectionProps {
  imageUrl: string;
}

const WhatSection = ({ imageUrl }: sectionProps) => {
  const router = useRouter();

  return (
    <Box>
      <Spacer h="5rem" />
      <Flex
        py="7rem"
        w="100vw"
        justify="center"
        align="center"
        style={{
          backgroundImage: "url('/images/backgrounds/ajrak_bg_legacy.jpg')",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(270deg, rgba(255, 77, 0, 0.8) 26.52%, rgba(255, 192, 31, 0.8) 100%)",
            zIndex: -1,
          }}
        />
        <Flex gap={20} align={"center"}>
          <Image width={550} height={0} alt="" src={imageUrl} />

          <Flex flexDir="column" maxW="600px">
            <Heading color="white" fontWeight="bold" fontSize="7xl">
              What are <span style={{ color: "#FFCF54" }}>we&nbsp;?</span>
            </Heading>
            <Text
              mt="0.5rem"
              color="white"
              maxW="100%"
              fontSize="lg"
              lineHeight="30px"
            >
              We the Khudabadi Amil Panchayat offer a range of services. Joining
              our community is now easier than ever with our simple and
              convenient online membership process. As a member, you gain access
              to various benefits and opportunities to connect with fellow
              Amils.
            </Text>
            {/* <Link href="/blog"> */}
            <Button
              onClick={() => {
                router.push("/blog").catch(console.error);
              }}
              rightIcon={<FaArrowCircleRight />}
              h="3rem"
              mt="2rem"
              w="40%"
              colorScheme="yellow"
            >
              Connecting Amils
            </Button>
            {/* </Link> */}
          </Flex>
        </Flex>
      </Flex>

      <Spacer h="8rem" />
    </Box>
  );
};

export default WhatSection;
