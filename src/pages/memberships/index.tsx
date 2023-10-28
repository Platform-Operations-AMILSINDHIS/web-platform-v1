import type { NextPage } from "next";
import Layout from "~/components/layout";
import HeroSection from "~/sections/MembersPage/HeroSection";

const MembershipsHomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <HeroSection />
    </Layout>
  );
};

export default MembershipsHomePage;
