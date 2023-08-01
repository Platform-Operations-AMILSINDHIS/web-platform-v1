import type { NextPage } from "next";
import type { BlogPost } from "~/types/blog";

import { BlogPostThumb } from "~/components/blog/blog-landing";
import Layout from "~/components/layout";

import { eudoxus } from "~/utils/fonts";

const blogPosts = [
  {
    title: "Conversations with the Amil Folk",
    author: "Karan Kishore",
    // date: "13 Feb 2023",
    date: new Date("02/13/2023"), // this is mm/dd/yyyy, NOT dd/mm/yyyy
    excerpt:
      "Amongst Sindhi Hindus, socially this clan ranks first in the hierarchical ranking among followed by Bhaiband.[2] The Amils held the highest administrative offices under Muslim ...",
    tags: ["History", "Tradition", "Blog"],
    image: "/images/blog-post-1.jpg",
  },
  {
    title: "Khadjyun ji mithai",
    author: "Karan Kishore",
    // date: "01 Jan 2021",
    date: new Date("01/01/2021"),
    excerpt:
      "The Union began pasteurizing milk in June 1948, for the Bombay Milk Scheme...",
    tags: ["Tradition", "Food", "Blog"],
    image: "/images/blog-post-2.jpg",
  },
  {
    title: "The Amil Gandhi Mohan Jhanglani",
    author: "Snigdha Kapoor",
    // date: "30 Dec 2020",
    date: new Date("12/30/2020"),
    excerpt:
      "Mohan Jhangiani was the youngest of ten children. The family lived in Lahore... ",
    tags: ["History", "Blog"],
    image: "/images/blog-post-3.jpg",
  },
  {
    title: "Hyderabad, Sind.",
    author: "Snigdha Kapoor",
    // date: "13 Feb 2023",
    date: new Date("02/13/2023"),
    excerpt:
      "Mohan Jhangiani was the youngest of ten children. The family lived in Lahore... ",
    tags: ["History", "Blog"],
    image: "/images/blog-post-4.jpg",
  },
];

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-screen-lg text-center text-[#1F2937]">
        {/* Hero */}
        <div
          className={`${eudoxus.variable} mt-16 font-heading text-7xl font-bold leading-normal`}
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
          {blogPosts.length > 0 && blogPosts[0] && (
            <div className="">
              <div>
                <img className="rounded" alt="" src={blogPosts[0].image} />
              </div>

              <div className="mt-8 font-semibold text-[#1F2937] opacity-70">
                {blogPosts[0].author} &middot;{" "}
                {blogPosts[0].date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="mt-2 text-3xl font-semibold">
                {blogPosts[0].title}
              </div>
              <div className="mt-4">{blogPosts[0].excerpt}</div>
              <div className="my-4 flex gap-2">
                {blogPosts[0].tags.map((tag, i) => (
                  <div
                    key={i}
                    className={`rounded-full border border-[#1F2937] px-2 py-1 text-xs`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}

          {blogPosts.length > 1 && (
            <div className="flex flex-col gap-6">
              {blogPosts.slice(1).map((post: BlogPost, i) => (
                <BlogPostThumb key={i} orientation="horizontal" post={post} />
              ))}
            </div>
          )}
        </div>

        {/* All posts section */}
        <div></div>
      </div>
    </Layout>
  );
};

export default Home;
