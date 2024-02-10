import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { EventThumb } from "~/components/events";

import { EventCollectionQueryQuery } from "~/lib/__generated/sdk";
import EventSlider from "~/components/events/EventSlider";

const CuriousSection = ({ events }: { events: EventCollectionQueryQuery }) => {
  // console.log(events);
  return (
    <>
      <Spacer h="8rem" />
      {/* Curious about our events section */}
      <Box>
        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap="3rem">
          <Flex flexDir="column" align="baseline" gap="0.5rem">
            <Text color="#FF4D00" fontWeight={500}>
              Sindhi events & Occasions
            </Text>
            <Heading fontSize={["5xl", "6xl"]}>
              Curious about <br /> our{" "}
              <span style={{ color: "#FF4D00" }}>events ?</span>
            </Heading>
          </Flex>
          <Flex flexDir="column" align="baseline" gap="2rem">
            <Text lineHeight="30px">
              At Khudabadi Amil Panchayat, we organise a wide range of events
              that cater to the well-being and progress of our community. Click
              the button below to begin exploring our events.
            </Text>
            <Link href="/events">
              <Button
                px="2.5rem"
                py="1.75rem"
                bgColor="#FFFFFF"
                border="1px solid rgba(31, 41, 55, 0.45);"
                boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
              >
                Explore events
              </Button>
            </Link>
          </Flex>
        </Grid>

        <Spacer h="5rem" />

        <EventSlider events={events} />
      </Box>
    </>
  );
};

export default CuriousSection;
