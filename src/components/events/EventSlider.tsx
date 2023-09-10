import { Box } from "@chakra-ui/react";
import { EventCollectionQueryQuery } from "~/lib/__generated/sdk";

interface EventData {
  events: EventCollectionQueryQuery;
}

const EventSlider: React.FC<EventData> = ({ events }) => {
  const eventData = events.eventContentTypeCollection?.items;
  console.log(eventData);
  return <Box>hi</Box>;
};

export default EventSlider;
