import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import type {
  PastEventContentTypeQueryQuery,
  PastEventContentType,
} from "~/lib/__generated/sdk";
import PastEventCard from "./PastEventCard";

interface PastEventSliderProps {
  pastEvents: PastEventContentTypeQueryQuery;
}

const PastEventSlider: React.FC<PastEventSliderProps> = ({ pastEvents }) => {
  const pastEventData = pastEvents.pastEventContentTypeCollection?.items;
  return (
    <Flex gap={5} flexDir="column">
      <Text fontSize="xl" fontWeight={600}>
        Previously Conducted Events
      </Text>
      <Flex direction={["column", "row"]} width="full" gap={10} align="center">
        {pastEventData?.map((item, index) => {
          return (
            <PastEventCard
              key={index}
              pastEvent={item as PastEventContentType}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default PastEventSlider;
