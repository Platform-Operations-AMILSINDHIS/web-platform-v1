import { Box, Flex, Text } from "@chakra-ui/react";
import EventHeroCard from "~/components/events/eventsHeroCard";

const HeroSection = () => {
  return (
    <Box as="section">
      <Flex flexDir="column">
        <EventHeroCard />
      </Flex>
    </Box>
  );
};

export default HeroSection;
