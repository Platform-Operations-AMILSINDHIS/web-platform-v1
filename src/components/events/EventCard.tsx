import { Flex, Text } from "@chakra-ui/react";
import type { EventContentType } from "~/lib/__generated/sdk";

interface eventData {
  event: EventContentType | undefined | null;
}

const EventCard: React.FC<eventData> = ({ event }) => {
  return (
    <Flex flexDir="column">
      <Text>{event?.eventTitle}</Text>
    </Flex>
  );
};

export default EventCard;
