import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import MatrimonyHero from "~/components/matrimony/HeroSection";
import WhyChooseSection from "~/components/matrimony/WhyChooseSection";
import MatrimonyFormSection from "~/components/matrimony/MatrimonyFormSection";

const MatrimonyPage = () => {
  return (
    <Layout title="Matrimony">
      <Spacer h="6rem" />

      <MatrimonyHero />

      <Spacer h="6rem" />

      <WhyChooseSection />

      <Spacer h="6rem" />

      <MatrimonyFormSection />

      <Spacer h="6rem" />
    </Layout>
  );
};

export default MatrimonyPage;
