import { Box, Button, Flex, Text } from "@chakra-ui/react";

const EventHeroCard = () => {
  return (
    <Box alignItems="flex-start" my={10} p={10} bg="red">
      <Flex gap={5} flexDir="column">
        <Text fontSize="xs">Amil Events & Drives</Text>
        <Text fontSize={"3xl"}>Attend connect & explore</Text>
        <Text>
          Join us in our mission to foster unity, celebrate our rich Sindhi
          heritage, and empower the Amil Sindhi community through a series of
          captivating events. RSVP Today or find out more
        </Text>
        <Flex align="center" gap={3}>
          <Button>Explore</Button>
          <Button>Gallery</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventHeroCard;
