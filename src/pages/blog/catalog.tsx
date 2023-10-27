import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { filter, truncate } from "lodash";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import BlogPostThumb from "~/components/blog/blogPostThumb";
import Layout from "~/components/layout";
import {
  BlogContentType,
  type PageBlogPostCollectionQuery,
} from "~/lib/__generated/sdk";
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogPosts =
    blogPosts?.filter((post) => post?.blogType?.[0] === typeState) || [];

  const handleState = (type: string) => {
    setTypeState(type);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const queryResults = filteredBlogPosts.filter((blog) =>
      blog?.blogTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(queryResults);
    console.log(value);
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
      <HeroSection handleSearch={handleSearch} />
      <FiltersSection
        typeState={typeState}
        stateHandler={handleState}
        uniqueTypes={uniqueTypes}
        uniqueTags={uniqueTags}
      />
      {filteredBlogPosts?.length && filteredBlogPosts?.length > 1 && (
        <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={2}>
          {filteredBlogPosts.length &&
            filteredBlogPosts.length >= 1 &&
            filteredBlogPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post?.sys.id}`}>
                <BlogPostThumb
                  key={i}
                  orientation="vertical"
                  post={{
                    title: post?.blogTitle ?? "",
                    author: post?.author ?? "",
                    date: new Date(post?.dateOfBlog as string) ?? new Date(),
                    excerpt: truncate(post?.excerpt ?? "", { length: 100 }),
                    tags: post?.blogTags,
                    image: post?.blogDisplayPicture?.url ?? "",
                    type: post?.blogType?.[0] ?? null,
                  }}
                />
              </Link>
            ))}
        </Grid>
      )}
    </Layout>
  );
};

export default CatalogPage;
