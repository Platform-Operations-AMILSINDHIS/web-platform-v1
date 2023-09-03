import { Box, Button, Flex, Text } from "@chakra-ui/react";

const CardBgImage = "/images/backgrounds/julian-myles-3G6Eu4Hh8gE-unsplash.jpg";

const EventHeroCard = () => {
  return (
    <Box
      backgroundImage={`url(${CardBgImage})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      borderRadius={20}
      alignItems="flex-start"
      my={10}
      p="65px"
      boxShadow={"0px 6px 0px 0px rgba(31, 41, 55, 0.27)"}
    >
      <Flex gap={7} flexDir="column">
        <Flex flexDir="column">
          <Text className="primary-accent-indicators" fontSize="md">
            Amil Events & Drives
          </Text>
          <Text fontWeight={600} fontSize={"5xl"}>
            Attend connect & explore
          </Text>
          <Text maxW={650} fontSize="md">
            Join us in our mission to foster unity, celebrate our rich Sindhi
            heritage, and empower the Amil Sindhi community through a series of
            captivating events. RSVP Today or find out more
          </Text>
        </Flex>
        <Flex align="center" gap={3}>
          <Button>Explore</Button>
          <Button>Gallery</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventHeroCard;
