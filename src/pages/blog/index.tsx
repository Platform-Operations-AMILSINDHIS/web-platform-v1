import type {
  NextPage,
  GetStaticProps,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { truncate } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import Layout from "~/components/layout";
import { BlogPostThumb } from "~/components/blog/blog-landing";

import { client } from "~/lib/client";

import { eudoxus } from "~/utils/fonts";
import type { PageBlogPostCollectionQuery } from "~/lib/__generated/sdk";

import "swiper/css";
import "swiper/css/navigation";

// const blogPosts = [
//   {
//     title: "Conversations with the Amil Folk",
//     author: "Karan Kishore",
//     // date: "13 Feb 2023",
//     date: new Date("02/13/2023"), // this is mm/dd/yyyy, NOT dd/mm/yyyy
//     excerpt:
//       "Amongst Sindhi Hindus, socially this clan ranks first in the hierarchical ranking among followed by Bhaiband.[2] The Amils held the highest administrative offices under Muslim ...",
//     tags: ["History", "Tradition", "Blog"],
//     image: "/images/blog-post-1.jpg",
//   },
//   {
//     title: "Khadjyun ji mithai",
//     author: "Karan Kishore",
//     // date: "01 Jan 2021",
//     date: new Date("01/01/2021"),
//     excerpt:
//       "The Union began pasteurizing milk in June 1948, for the Bombay Milk Scheme...",
//     tags: ["Tradition", "Food", "Blog"],
//     image: "/images/blog-post-2.jpg",
//   },
//   {
//     title: "The Amil Gandhi Mohan Jhanglani",
//     author: "Snigdha Kapoor",
//     // date: "30 Dec 2020",
//     date: new Date("12/30/2020"),
//     excerpt:
//       "Mohan Jhangiani was the youngest of ten children. The family lived in Lahore... ",
//     tags: ["History", "Blog"],
//     image: "/images/blog-post-3.jpg",
//   },
//   {
//     title: "Hyderabad, Sind.",
//     author: "Snigdha Kapoor",
//     // date: "13 Feb 2023",
//     date: new Date("02/13/2023"),
//     excerpt:
//       "Mohan Jhangiani was the youngest of ten children. The family lived in Lahore... ",
//     tags: ["History", "Blog"],
//     image: "/images/blog-post-4.jpg",
//   },
// ];

export const getServerSideProps: GetServerSideProps<{
  posts: PageBlogPostCollectionQuery;
}> = async () => {
  const posts = await client.pageBlogPostCollection();
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

  // return (
  //   <Layout title="Blog">
  //     <pre>{JSON.stringify(blogPosts, null, 2)}</pre>
  //   </Layout>
  // );

  return (
    <Layout title="Blog">
      <div className="mx-auto max-w-screen-lg text-center text-[#1F2937]">
        {/* Hero */}
        <div
          className={`${eudoxus.variable} mt-16 font-heading text-3xl font-bold leading-normal md:text-7xl`}
        >
          Amil Blogs, <span className="text-[#0079FF]">Samachar &</span>{" "}
          Publications all in{" "}
          <span className="underline decoration-[#FFB84C] decoration-8">
            one place
          </span>
        </div>
        <div className="mx-auto mt-4 max-w-xl text-lg">
          Subscribe to our amil blogs, samachar and publications today and stay
          up to date with all amil related news
        </div>
      </div>

      {/* Recent blog posts section */}
      <div className="my-6">
        <div
          className={`${eudoxus.variable} font-heading text-2xl font-bold text-[#1F2937]`}
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
                blogPosts.slice(1).map((post, i) => (
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
            className={`${eudoxus.variable} font-heading text-2xl font-bold text-[#1F2937]`}
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
              navigation={true}
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
