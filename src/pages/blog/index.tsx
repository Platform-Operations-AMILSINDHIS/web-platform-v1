import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { truncate } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import Layout from "~/components/layout";
import BlogPostThumb from "~/components/blog/blogPostThumb";

import { client } from "~/lib/client";

import { satoshi } from "~/utils/fonts";
import {
  AssetLinkingCollectionsEventImageSliderCollectionOrder,
  type PageBlogPostCollectionQuery,
} from "~/lib/__generated/sdk";

import "swiper/css";
import "swiper/css/navigation";
import HeroSection from "~/sections/BlogsPage/HeroSection";

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
  console.log(blogPosts[0]?.blogType);

  if (blogPosts?.length === 0) {
    return (
      <Layout title="Blog">
        <div>no blog posts to show</div>
      </Layout>
    );
  }

  return (
    <Layout title="Blog">
      <HeroSection />
      <div className="my-6">
        <div
          className={`${satoshi.variable} font-heading text-2xl font-semibold text-[#1F2937]`}
        >
          Recent blog posts
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2">
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
                    {/* <img
                  className="rounded"
                  alt=""
                  src={blogPosts[0]?.blogDisplayPicture?.url ?? undefined}
                /> */}
                  </div>

                  <div className="mt-8 font-semibold text-[#1F2937] opacity-70">
                    {blogPosts[0]?.author} &middot;{" "}
                    {new Date(
                      blogPosts[0]?.dateOfBlog as string
                    ).toLocaleDateString("en-GB", {
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
                      <div
                        key={i}
                        className={`rounded-full border border-[#1F2937] px-2 py-1 text-xs`}
                      >
                        {tag}
                      </div>
                    ))}
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
                      }}
                    />
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* All posts section */}
        <div className="my-6">
          <div
            className={`${satoshi.variable} font-heading text-2xl font-semibold text-[#1F2937]`}
          >
            All our blog posts
          </div>

          <div className="mt-6">
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              modules={[Autoplay, Navigation]}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: true,
              }}
              // navigation={true}
            >
              {blogPosts?.length && blogPosts?.length > 1 && (
                <>
                  {/* <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6"> */}
                  {blogPosts.map((post, i) => (
                    <Link key={i} href={`/blog/${post?.sys.id}`}>
                      <SwiperSlide>
                        <BlogPostThumb
                          key={i}
                          orientation="vertical"
                          post={{
                            title: post?.blogTitle ?? "",
                            author: post?.author ?? "",
                            date:
                              new Date(post?.dateOfBlog as string) ??
                              new Date(),
                            excerpt: truncate(post?.excerpt ?? "", {
                              length: 100,
                            }),
                            tags: post?.blogTags,
                            image: post?.blogDisplayPicture?.url ?? "",
                          }}
                        />
                      </SwiperSlide>
                    </Link>
                  ))}
                  {/* </div> */}
                </>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
