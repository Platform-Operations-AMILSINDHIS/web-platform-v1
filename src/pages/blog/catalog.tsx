import { Box, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Layout from "~/components/layout";
import { type PageBlogPostCollectionQuery } from "~/lib/__generated/sdk";
import { client } from "~/lib/client";
import FiltersSection from "~/sections/ReadingCatalogPage/FiltersSection";
import HeroSection from "~/sections/ReadingCatalogPage/HeroSection";

export const getServerSideProps: GetServerSideProps<{
  posts: PageBlogPostCollectionQuery;
}> = async () => {
  const posts = await client.pageBlogPostCollection();
  // const posts = await client.pageBlogPost({  });
  return { props: { posts } };
};

const CatalogPage = ({
  posts: { blogContentTypeCollection },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const blogPosts = blogContentTypeCollection?.items;
  const uniqueTags: string[] = [];
  const uniqueTypes: string[] = [];

  const [typeState, setTypeState] = useState("Blog");
  const handleState = (type: string) => {
    setTypeState(type);
  };

  blogPosts?.forEach((blog) => {
    blog?.blogTags?.forEach((tag) => {
      if (tag && !uniqueTags.includes(tag)) {
        uniqueTags.push(tag);
      }
    });
  });

  blogPosts?.forEach((blog) => {
    blog?.blogType?.forEach((type) => {
      if (type && !uniqueTypes.includes(type)) {
        uniqueTypes.push(type);
      }
    });
  });

  return (
    <Layout title="blog catalog">
      <Flex gap={5} flexDir="column">
        <HeroSection />
      </Flex>
      <FiltersSection
        typeState={typeState}
        stateHandler={handleState}
        uniqueTypes={uniqueTypes}
        uniqueTags={uniqueTags}
      />
    </Layout>
  );
};

export default CatalogPage;
