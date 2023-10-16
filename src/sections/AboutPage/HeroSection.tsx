import { Flex, Box, Text, Spacer } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Flex py="2rem" direction="column" w="100%" alignItems="center">
      <Text fontSize="2xl" fontWeight="semibold" textColor="#1F293780">
        Welcome to the
      </Text>
      <Text
        fontSize="7xl"
        fontWeight="semibold"
        _after={{
          content: '""',
          display: "block",
          width: "100%",
          height: "0.5rem",
          background: "#FF4D00",
          borderRadius: "20px",
          mt: "-0.5rem",
        }}
      >
        &nbsp;Khudabadi Amil{" "}
        <Box as="span" color="#FF4D00">
          Panchayat
        </Box>
        &nbsp;
      </Text>

      <Text mt="1rem" textColor="#1F2937">
        &quot;Serving the Amil Sindhi Community Since 1952&quot;
      </Text>
    </Flex>
  );
};

export default HeroSection;
