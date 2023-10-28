import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import MatrimonyHero from "~/sections/MatrimonyPage/HeroSection";
import WhyChooseSection from "~/sections/MatrimonyPage/WhyChooseSection";
import MatrimonyFormSection from "~/sections/MatrimonyPage/MatrimonyFormSection";
import ContactUsSection from "~/sections/MatrimonyPage/ContactUsSection";

const MatrimonyPage = () => {
  return (
    <Layout title="Matrimony">
      <Spacer h="6rem" />

      <MatrimonyHero />

      <Spacer h="6rem" />

      <WhyChooseSection />

      <Spacer h="6rem" />

      <ContactUsSection />

      <Spacer h="6rem" />

      <MatrimonyFormSection />

      <Spacer h="6rem" />
    </Layout>
  );
};

export default MatrimonyPage;
