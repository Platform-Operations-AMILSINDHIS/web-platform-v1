/* eslint-disable-next-line */
// @ts-nocheck
import { SwiperSlide, Swiper } from "swiper/react";
import { Flex, Text, Box } from "@chakra-ui/react";
import type { EventCollectionQueryQuery } from "~/lib/__generated/sdk";
import EventCard from "./EventCard";
import { Autoplay, Navigation } from "swiper/modules";
import useWindowDimensions from "~/hooks/useWindowDemensions";

interface EventData {
  events: EventCollectionQueryQuery;
}

const EventSlider: React.FC<EventData> = ({ events }) => {
  const { width } = useWindowDimensions();
  const eventData = events.eventContentTypeCollection?.items;
  console.log(events);
  return (
    <>
      <Text fontSize="xl" fontWeight={600}>
        Upcoming Events
      </Text>
      <Swiper
        spaceBetween={20}
        slidesPerView={width && width < 600 ? 1 : width && width < 900 ? 2 : 3}
        modules={[Autoplay, Navigation]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        // navigation={true}
      >
        {eventData && eventData.length >= 1 ? (
          <>
            {eventData.map((event, i) => {
              return (
                <SwiperSlide key={i}>
                  <Box>
                    <EventCard event={event} key={i} />
                  </Box>
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <Box>No events</Box>
        )}
      </Swiper>
      {/* <Flex
        direction={["column", "row"]}
        mx={[2, 0]}
        width="full"
        gap={10}
        align="center"
      >
        {eventData?.map((item, key) => {
          return <EventCard key={key} event={item} />;
        })}
      </Flex> */}
    </>
  );
};

export default EventSlider;
