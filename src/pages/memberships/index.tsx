import type { NextPage } from "next";
import Layout from "~/components/layout";
import HeroSection from "~/sections/MembersPage/HeroSection";
import RequirementSection from "~/sections/MembersPage/RequirementSection";

const MembershipsHomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <HeroSection />
      <RequirementSection />
    </Layout>
  );
};

export default MembershipsHomePage;
