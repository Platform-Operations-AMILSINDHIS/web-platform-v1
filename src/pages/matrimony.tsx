import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";

import MatrimonyHero from "~/components/matrimony/HeroSection";

const MatrimonyPage = () => {
  return (
    <Layout title="Matrimony">
      <Spacer h="6rem" />

      <MatrimonyHero />

      <Spacer h="6rem" />
    </Layout>
  );
};

export default MatrimonyPage;
