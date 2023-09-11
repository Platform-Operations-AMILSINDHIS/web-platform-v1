import type { InferGetServerSidePropsType } from "next";
import Layout from "~/components/layout";
import HeroSection from "~/sections/EventsPage/HeroSection";
import EventSlider from "~/components/events/EventSlider";
import type { EventCollectionQueryQuery } from "~/lib/__generated/sdk";
import type { GetServerSideProps } from "next";
import { client } from "~/lib/client";

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
      <HeroSection />
      <EventSlider events={events} />
    </Layout>
  );
};

export default EventsPage;
