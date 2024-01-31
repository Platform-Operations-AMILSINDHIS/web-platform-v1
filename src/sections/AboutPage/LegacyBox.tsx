import { Flex, GridItem, Heading, Text } from "@chakra-ui/react";

const LegacyBox = () => {
  return (
    <Flex
      align="flex-end"
      p="5rem"
      backgroundImage="/images/backgrounds/ajrak_bg_legacy.jpg"
    >
      <Flex flexDir="column">
        <Text mb={2} fontWeight={600} color="#FF4D00">
          Our History and Founders
        </Text>
        <Heading fontSize="5xl" fontWeight="semibold">
          A Legacy of Service & Community Building
        </Heading>
      </Flex>

      <Text maxW={550}>
        The Khudabadi Amil Panchayat of Bombay has a storied history that
        reflects a legacy of unwavering service and a commitment to nurturing a
        vibrant Amil Sindhi community. Founded on the 24th of February, 1952, by
        a group of ten visionary individuals, the Panchayat emerged as a beacon
        of hope for underprivileged Sindhis who were displaced from their
        homeland.
      </Text>
    </Flex>
  );
};

export default LegacyBox;
