import { Flex, Box, Text, Spacer, useMediaQuery } from "@chakra-ui/react";
//Hero section here to be updated later
const HeroSection = () => {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");

  return (
    <Flex py="2rem" direction="column" w="100%" alignItems="center">
      <Text fontSize="2xl" fontWeight="semibold" textColor="#1F293780">
        Welcome to the
      </Text>
      <Text
        fontSize={["4xl", "5xl", "7xl"]}
        fontWeight="semibold"
        textAlign={["center", "center", "left"]}
        _after={
          isSmallerThan800
            ? {}
            : {
                content: '""',
                display: "block",
                width: "100%",
                height: "0.5rem",
                background: "#FF4D00",
                borderRadius: "20px",
                mt: "-0.5rem",
              }
        }
      >
        &nbsp;Khudabadi Amil <Box as="span">Panchayat</Box>
        &nbsp;
      </Text>
      <Text fontSize={["4xl", "6xl"]} fontWeight="semibold">
        <Box as="span" color="#FF4D00">
          of Bombay
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
