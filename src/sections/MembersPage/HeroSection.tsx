import { Flex, Box, Text, Spacer } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Flex py="2rem" direction="column" w="100%" alignItems="center">
      <Text fontSize="2xl" fontWeight="semibold" textColor="#1F293780">
        We need you
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
        &nbsp;Become a{" "}
        <Box as="span" color="#FF4D00">
          Member
        </Box>
        &nbsp;
      </Text>

      <Text maxW={800} textAlign="center" mt="1rem" textColor="#1F2937">
        Are you an Amil Sindhi looking out for opportunities to reconnect to
        your roots? Do you wish to give back to your community and society?
        Then, this is the place to be! With open arms, we invite our fellow Amil
        Sindhis to be a part of our vibrant community!
      </Text>
    </Flex>
  );
};

export default HeroSection;
