/* eslint-disable-next-line */
// @ts-nocheck
import { Flex, Text } from "@chakra-ui/react";
import type { EventCollectionQueryQuery } from "~/lib/__generated/sdk";
import EventCard from "./EventCard";

interface EventData {
  events: EventCollectionQueryQuery;
}

const EventSlider: React.FC<EventData> = ({ events }) => {
  const eventData = events.eventContentTypeCollection?.items;
  console.log(events);
  return (
    <Flex gap={5} flexDir="column">
      <Text fontSize="xl" fontWeight={600}>
        Upcoming Events
      </Text>
      <Flex width="full" justify="space-between" align="center">
        {eventData?.map((item, key) => {
          return <EventCard key={key} event={item} />;
        })}
      </Flex>
    </Flex>
  );
};

export default EventSlider;
