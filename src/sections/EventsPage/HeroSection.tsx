import { Box, Flex } from "@chakra-ui/react";
import EventHeroCard from "~/components/events/EventsHeroCard";

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
