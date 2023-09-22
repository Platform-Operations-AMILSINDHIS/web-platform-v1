import { Box, Flex, Text } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import BlogCatalogDisplay from "~/components/blog/BlogCatalogDisplay";
import BlogPreference from "~/components/blog/BlogPreference";
import BlogTopics from "~/components/blog/BlogTopics";
import TopPicks from "~/components/blog/TopPicks";
import Layout from "~/components/layout";
import { type PageBlogPostCollectionQuery } from "~/lib/__generated/sdk";
import { client } from "~/lib/client";
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

const createTypeOptions = (blogPosts: PageBlogPostCollectionQuery[]) => {
  const Types: string[] = [];

  blogPosts?.forEach((blog) => {
    blog?.blogType?.forEach((type) => {
      if (!Types.includes(type)) {
        Types.push(type);
      }
    });
  });

  return Types.reverse();
};

const generateRandomPicks = (
  blogPosts: PageBlogPostCollectionQuery[],
  numPicks: number
) => {
  const randomArray = [];
  const duplicate = [...blogPosts]; // Create a copy of the original array

  for (let i = 0; i < numPicks; i++) {
    const randomIndex = Math.floor(Math.random() * duplicate.length);
    randomArray.push(duplicate.splice(randomIndex, 1)[0]);
  }

  return randomArray;
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
          <Flex w="full" gap={1} flexDir="column">
            <Text fontWeight={600} fontSize={35}>
              Reading Catalog
            </Text>
            <Text maxW={850}>
              Browse, pick and decide your favorite reading habits, from our
              ever-growing collection of samachar, newsletters, and blogs. Stay
              tuned for more
            </Text>
            <Flex mt={8} w="full" justify="space-between" align="flex-start">
              <BlogCatalogDisplay blogPosts={blogPosts} />
              <Flex gap={8} flexDir="column">
                <TopPicks />
                <BlogPreference blogType={createTypeOptions(blogPosts)} />
                <BlogTopics blogTags={createUnquieTags(blogPosts)} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default CatalogPage;
