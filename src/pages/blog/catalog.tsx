import { Box, Flex, Text } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { string } from "zod";
import BlogCatalogDisplay from "~/components/blog/BlogCatalogDisplay";
import BlogTopics from "~/components/blog/BlogTopics";
import Layout from "~/components/layout";
import { type PageBlogPostCollectionQuery } from "~/lib/__generated/sdk";
import { client } from "~/lib/client";
import { BlogPost } from "~/types/blog";
import { satoshi } from "~/utils/fonts";

export const getServerSideProps: GetServerSideProps<{
  posts: PageBlogPostCollectionQuery;
}> = async () => {
  const posts = await client.pageBlogPostCollection();
  return { props: { posts } };
};

const createUnquieTags = (blogPosts: PageBlogPostCollectionQuery[]) => {
  const uniqueTags: string[] = [];

  blogPosts?.forEach((blog) => {
    blog?.blogTags?.forEach((tag) => {
      if (!uniqueTags.includes(tag)) {
        uniqueTags.push(tag);
      }
    });
  });

  return uniqueTags;
};

const CatalogPage = ({
  posts: { blogContentTypeCollection },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // blogContentTypeCollection?.items[0].
  const blogPosts = blogContentTypeCollection?.items;

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
              ever-growing collection of samachar, newsletters, and blogs. Stay
              tuned for more
            </Text>
            <BlogCatalogDisplay blogPosts={blogPosts} />
            <BlogTopics blogTags={createUnquieTags(blogPosts)} />
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default CatalogPage;
