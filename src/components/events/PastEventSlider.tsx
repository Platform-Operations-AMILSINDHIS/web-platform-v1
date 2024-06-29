import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

import type {
  PastEventContentTypeQueryQuery,
  PastEventContentType,
} from "~/lib/__generated/sdk";
import PastEventCard from "./PastEventCard";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper CSS (choose one method)
import "swiper/css"; // Download method
// import 'swiper/css/swiper.min.css';  // CSS bundler method (if applicable)

interface PastEventSliderProps {
  pastEvents: PastEventContentTypeQueryQuery;
}

const PastEventSlider: React.FC<PastEventSliderProps> = ({ pastEvents }) => {
  const pastEventData = pastEvents.pastEventContentTypeCollection?.items;

  return (
    <>
      {" "}
      {/* Wrap the Swiper outside the Flex component (optional) */}
      <Text mb={5} fontSize="xl" fontWeight={600}>
        Previously Conducted Events
      </Text>
      <Swiper
        direction="horizontal"
        spaceBetween={20}
        slidesPerView={3}
        modules={[Autoplay, Navigation]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        style={{ flexDirection: "row" }} // Override flexDirection (optional)
      >
        {pastEventData?.length && pastEventData.length >= 1 ? (
          pastEventData.map((event, i) => (
            <SwiperSlide key={i}>
              <Box>
                <PastEventCard pastEvent={event as PastEventContentType} />
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <Box>No events</Box>
        )}
      </Swiper>
    </>
  );
};

export default PastEventSlider;
