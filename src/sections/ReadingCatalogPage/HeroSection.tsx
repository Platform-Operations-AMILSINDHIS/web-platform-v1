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
          background: "yellow.400",
          borderRadius: "20px",
          mt: "-0.5rem",
        }}
      >
        Reading Catalog
      </Text>

      <Text textAlign="center" maxW={600} mt="1rem" textColor="#1F2937">
        Browse, pick and decide your favorite reading habits, from our
        ever-growing collection of samachar, newsletter and blogs. Stay tuned
        for more
      </Text>
    </Flex>
  );
};

export default HeroSection;
