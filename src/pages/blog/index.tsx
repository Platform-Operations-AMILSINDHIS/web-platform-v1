// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { truncate } from "lodash";

import Layout from "~/components/layout";
import BlogPostThumb from "~/components/blog/blogPostThumb";

import { client } from "~/lib/client";

import { type PageBlogPostCollectionQuery } from "~/lib/__generated/sdk";

import "swiper/css";
import "swiper/css/navigation";
import HeroSection from "~/sections/BlogsPage/HeroSection";
import BlogSlider from "~/components/blog/BlogSlider";
import { Box, Flex } from "@chakra-ui/react";
import { useUserAtom } from "~/lib/atom";

export const getServerSideProps: GetServerSideProps<{
  posts: PageBlogPostCollectionQuery;
}> = async () => {
  const posts = await client.pageBlogPostCollection();
  // const posts = await client.pageBlogPost({  });
  return { props: { posts } };
};

const BlogPage = ({
  posts: { blogContentTypeCollection },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // blogContentTypeCollection?.items[0].
  const blogPosts = blogContentTypeCollection?.items;

  if (blogPosts?.length === 0) {
    return (
      <Layout title="Blog">
        <div>no blog posts to show</div>
      </Layout>
    );
  }

  const [user, _] = useUserAtom();
  console.log(user);
  return (
    <Layout title="Blog">
      <HeroSection />
      <div className="my-6">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
          {/* Big landing blog post (only for desktop) */}
          {/* TODO: Hide this on mobile */}
          {blogPosts?.length && blogPosts?.length > 0 && (
            <Link href={`/blog/${blogPosts[0]?.sys.id}`}>
              <div className="cursor-pointer rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto select-none">
                  <div
                    className="h-[400px] w-full rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${
                        blogPosts[0]?.blogDisplayPicture?.url ?? undefined
                      }")`,
                    }}
                  >
                    <div></div>
                  </div>

                  <div className="mt-8 font-semibold text-[#1F2937] opacity-70">
                    {blogPosts[0]?.author} &middot;{" "}
                    {new Date(
                      blogPosts[0]?.dateOfBlog as string
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="mt-2 text-3xl font-semibold">
                    {blogPosts[0]?.blogTitle}
                  </div>
                  <div className="mt-4 w-11/12">
                    {truncate(blogPosts[0]?.excerpt ?? "", { length: 250 })}
                  </div>
                  {/* <div className="mt-4">Excerpt goes here</div> */}
                  <div className="my-4 flex select-none gap-2">
                    {blogPosts[0]?.blogTags?.map((tag, i) => (
                      <Box
                        fontWeight={500}
                        key={i}
                        className={`rounded-full border border-[#1F2937] px-3 py-1 text-xs`}
                      >
                        {tag}
                      </Box>
                    ))}
                    <Box
                      fontWeight={500}
                      className={`rounded-full border border-[#1F2937] px-3 py-1 text-xs`}
                    >
                      {blogPosts[0]?.blogType?.[0] ?? ""}
                    </Box>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {blogPosts?.length && blogPosts?.length > 1 && (
            <div className="flex flex-col gap-1">
              {/* TODO: Don't slice on mobile, show from 0th index + make post thumbs vertical */}
              {blogPosts.length &&
                blogPosts.length >= 1 &&
                blogPosts.slice(1, 4).map((post, i) => (
                  <Link key={i} href={`/blog/${post?.sys.id}`}>
                    <BlogPostThumb
                      key={i}
                      orientation="horizontal"
                      post={{
                        title: post?.blogTitle ?? "",
                        author: post?.author ?? "",
                        date:
                          new Date(post?.dateOfBlog as string) ?? new Date(),
                        excerpt: truncate(post?.excerpt ?? "", { length: 100 }),
                        tags: post?.blogTags,
                        image: post?.blogDisplayPicture?.url ?? "",
                        type: post?.blogType?.[0] ?? null,
                      }}
                    />
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* All posts section */}
        <div className="my-6">
          {/* <div
            className={`${satoshi.variable} font-heading text-2xl font-semibold text-[#1F2937]`}
          >
            All our blog posts
          </div> */}
          <Flex flexDir="column" gap={8}>
            <BlogSlider blogPosts={blogPosts} blogType="blog" />
            <BlogSlider blogPosts={blogPosts} blogType="newsletter" />
            <BlogSlider blogPosts={blogPosts} blogType="publication" />
          </Flex>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
