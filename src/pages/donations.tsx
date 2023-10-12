import type { NextPage } from "next";
import Layout from "~/components/layout";

import HeroSection from "~/sections/DonationsPage/HeroSection";

const DonationsPage: NextPage = () => {
  return (
    <Layout title="Home">
      <HeroSection />
    </Layout>
  );
};

export default DonationsPage;
