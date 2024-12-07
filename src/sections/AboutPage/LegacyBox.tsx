import { Flex, Heading, Text } from "@chakra-ui/react";

const LegacyBox = () => {
  return (
    <Flex
      flexDir={["column", "column", "row"]}
      align="flex-end"
      p="5rem"
      backgroundImage="/images/backgrounds/ajrak_bg_legacy.jpg"
    >
      <Flex flexDir="column">
        <Text mb={2} fontWeight={600} color="#FF4D00">
          Our History and Founders
        </Text>
        <Heading fontSize={["2xl", "5xl"]} fontWeight="semibold">
          A Legacy of Service & Community Building
        </Heading>
      </Flex>

      <Text mt={[5, 0, 0]} fontSize={["sm", "md"]} maxW={550}>
        From Khudabad to Mumbai, the journey of the Amils has been
        ever-evolving. After the partition of India in 1947, pioneering Amils
        came together in Mumbai to form the Khudabadi Amil Panchayat in 1952 to
        preserve the community&apos;s identity and heritage. Over the years, the
        Panchayat has engaged in socio-economic activities, supporting the ones
        in need through housing, financial aid, and educational assistance.
      </Text>
    </Flex>
  );
};

export default LegacyBox;
