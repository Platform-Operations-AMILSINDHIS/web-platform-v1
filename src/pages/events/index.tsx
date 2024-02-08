import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type {
  EventCollectionQueryQuery,
  PastEventContentTypeQueryQuery,
} from "~/lib/__generated/sdk";

import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import HeroSection from "~/sections/EventsPage/HeroSection";
import EventSlider from "~/components/events/EventSlider";
import PerksSection from "~/sections/EventsPage/PerksSection";

import { client } from "~/lib/client";
import { Box } from "@chakra-ui/react";
import PastEventSlider from "~/components/events/PastEventSlider";
import EventTypesSection from "~/sections/EventsPage/EventTypesSection";

export const getServerSideProps: GetServerSideProps<{
  events: EventCollectionQueryQuery;
  pastEvents: PastEventContentTypeQueryQuery;
}> = async () => {
  const events = await client.eventCollectionQuery();
  const pastEvents = await client.pastEventContentTypeQuery();
  return { props: { events, pastEvents } };
};

const EventsPage = ({
  events,
  pastEvents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log({ events, pastEvents });
  return (
    <Layout title="Events">
      <Box mb={10}>
        <HeroSection />
        <Spacer h="4rem" />
        <EventSlider events={events} />
        <Spacer h="4rem" />

        <PastEventSlider pastEvents={pastEvents} />
        <Spacer h="4rem" />
        <EventTypesSection />
        <Spacer h="4rem" />
        <PerksSection />
      </Box>
    </Layout>
  );
};

export default EventsPage;
