import type { NextPage } from "next";
import Layout from "~/components/layout";
import HeroSection from "~/sections/EventsPage/HeroSection";

const EventsPage: NextPage = () => {
  return (
    <Layout title="Events">
      <HeroSection />
    </Layout>
  );
};

export default EventsPage;
