import { Box, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import BlogCatalogDisplay from "~/components/blog/blogCatalogDisplay";
import Layout from "~/components/layout";
import { satoshi } from "~/utils/fonts";

const CatalogPage: NextPage = () => {
  return (
    <Layout title="Catalog">
      <Box fontFamily={satoshi} px={10}>
        <Flex my={10}>
          <Flex gap={1} flexDir="column">
            <Text fontWeight={600} fontSize={35}>
              Reading Catalog
            </Text>
            <Text maxW={850}>
              Browse, pick and decide your favorite reading habits, from our
              ever growing collection of samachar, newsletters and blogs. Stay
              tuned for more
            </Text>
            <BlogCatalogDisplay />
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default CatalogPage;
