import { Box, Flex } from "@chakra-ui/react";
import Layout from "~/components/layout";
import HeroSection from "~/sections/ReadingCatalogPage/HeroSection";

const CatalogPage = () => {
  return (
    <Layout title="blog catalog">
      <Flex flexDir="column">
        <HeroSection />
      </Flex>
    </Layout>
  );
};

export default CatalogPage;
