import type { NextPage } from "next";
import Layout from "~/components/layout";
import HeroSection from "~/sections/MembersPage/HeroSection";
import KAPSection from "~/sections/MembersPage/KapSection";
import PaymentSection from "~/sections/MembersPage/PaymentSection";
import RequirementSection from "~/sections/MembersPage/RequirementSection";
import YacSection from "~/sections/MembersPage/YacSection";

const MembershipsHomePage: NextPage = () => {
  return (
    <Layout title="Memberships">
      <HeroSection />
      <KAPSection />
      <YacSection />
      <RequirementSection />
      <PaymentSection />
    </Layout>
  );
};

export default MembershipsHomePage;
