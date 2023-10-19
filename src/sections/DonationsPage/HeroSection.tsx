import { Flex, Box, Text, Spacer } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Flex py="2rem" direction="column" w="100%" alignItems="center">
      <Text fontSize="6xl" fontWeight="semibold" textAlign="center">
        Donate to Make a <br />
        <Box as="span" color="#FF4D00">
          Difference
        </Box>
        &nbsp;
      </Text>

      <Box w="60%" textAlign="center">
        <Text mt="1rem" textColor="#1F2937">
          We, the Khudabadi Amil Panchayat of Bombay, are a global community of
          Amil Sindhis. We are committed to helping society by uplifting the
          lives of the underprivileged. We also take up aiding initiatives for
          young Amil aspirants who wish to sparkle in their educational path
        </Text>
        <Text mt="1rem" textColor="#1F2937">
          Giving is not just about donating. It is about making a difference
        </Text>
      </Box>
    </Flex>
  );
};

export default HeroSection;
