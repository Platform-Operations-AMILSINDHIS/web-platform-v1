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
      <Flex flexDir="column" mt={3}>
        <Text mb={-1} color="#FF4D00" fontWeight={600} fontSize="md">
          {convertDATE(event?.eventDates as Date)}
        </Text>
        <Text
          as="a"
          href={`/events/${event?.sys.id}`}
          transition="all .3s"
          _hover={{
            color: "purple.500",
            textDecoration: "underline",
          }}
          fontWeight={600}
          fontSize="2xl"
        >
          {event?.eventTitle}
        </Text>
        <Flex mt={2} gap={3}>
          <Flex gap={3}>
            {event?.eventSearchTags?.map((item, index) => {
              return (
                <Text
                  fontWeight={500}
                  border="2px solid"
                  px={3}
                  borderRadius={20}
                  key={index}
                >
                  {item}
                </Text>
              );
            })}
          </Flex>
          <Text
            pt={0.5}
            fontWeight={500}
            background="rgba(251, 31, 255, 0.40);"
            px={3}
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
