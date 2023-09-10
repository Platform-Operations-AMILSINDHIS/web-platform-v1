import { Box, Flex } from "@chakra-ui/react";
import type { EventCollectionQueryQuery } from "~/lib/__generated/sdk";
import EventCard from "./EventCard";

interface EventData {
  events: EventCollectionQueryQuery;
}

const EventSlider: React.FC<EventData> = ({ events }) => {
  const eventData = events.eventContentTypeCollection?.items;
  console.log(events);
  return (
    <Flex gap={3} align="center">
      {eventData?.map((item, key) => {
        return <EventCard key={key} event={item} />;
      })}
    </Flex>
  );
};

export default EventSlider;
