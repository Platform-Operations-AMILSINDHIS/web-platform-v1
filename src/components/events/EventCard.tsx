import { Box, Flex, Text } from "@chakra-ui/react";
import type { EventContentType } from "~/lib/__generated/sdk";
import { convertDATE } from "~/utils/helper";

interface eventData {
  event: EventContentType | undefined | null;
}

const EventCard: React.FC<eventData> = ({ event }) => {
  return (
    <Flex
      transition="all .2s ease-in"
      _hover={{
        transform: "translateY(-2px)",
      }}
      cursor="pointer"
      color="#1F2937"
      flexDir="column"
      onClick={() => (window.location.href = `/events/${event?.sys.id}`)}
    >
      <Box
        boxShadow="4px 4px 4px 0px rgba(0, 0, 0, 0.36);"
        width={380}
        height={210}
        background={`url(${event?.eventDisplayImage?.url ?? ""})`}
        backgroundPosition="center"
        backgroundSize="cover"
        borderRadius={7}
      />
      <Flex flexDir="column" mt={4}>
        <Text mt={1} color="gray.500" fontWeight={600} fontSize="small">
          {convertDATE(event?.eventDates as Date)}
        </Text>
        <Text
          as="a"
          href={`/events/${event?.sys.id}`}
          transition="all .3s"
          _hover={{
            color: "orange.500",
          }}
          fontWeight={600}
          fontSize="2xl"
        >
          {event?.eventTitle}
        </Text>
        <Flex mt={2} gap={2}>
          <Flex gap={2}>
            {event?.eventSearchTags?.map((item, index) => {
              return (
                <Text
                  fontWeight={500}
                  border="1px solid"
                  borderColor="gray.600"
                  color="gray.700"
                  fontSize="small"
                  px={4}
                  py={0.5}
                  borderRadius={20}
                  key={index}
                >
                  {item}
                </Text>
              );
            })}
          </Flex>
          <Text
            px={4}
            py={0.5}
            fontSize="small"
            fontWeight={500}
            background="orange.200"
            borderRadius={20}
          >
            {event?.eventType ? event.eventType[0] : ""}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default EventCard;
