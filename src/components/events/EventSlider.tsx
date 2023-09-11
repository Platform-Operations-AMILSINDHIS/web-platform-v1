import { Box, Flex } from "@chakra-ui/react";
import type { EventCollectionQueryQuery } from "~/lib/__generated/sdk";

interface EventData {
  events: EventCollectionQueryQuery;
}

const EventSlider: React.FC<EventData> = ({ events }) => {
  //   const eventData = events.eventContentTypeCollection?.items;
  //   console.log(eventData);
  console.log(events);
  return <Flex gap={3} align="center"></Flex>;
};

export default EventSlider;
