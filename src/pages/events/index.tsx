import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { EventCollectionQueryQuery } from "~/lib/__generated/sdk";

import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import HeroSection from "~/sections/EventsPage/HeroSection";
import EventSlider from "~/components/events/EventSlider";
import PerksSection from "~/sections/EventsPage/PerksSection";

import { client } from "~/lib/client";
import { Box } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps<{
  events: EventCollectionQueryQuery;
}> = async () => {
  const events = await client.eventCollectionQuery();
  return { props: { events } };
};

const EventsPage = ({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(events);
  return (
    <Layout title="Events">
      <Box mb={10}>
        <HeroSection />
        <EventSlider events={events} />
        <Spacer h="4rem" />
        <PerksSection />
      </Box>
    </Layout>
  );
};

export default EventsPage;
