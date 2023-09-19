import Link from "next/link";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import BlogPostThumb from "./blogPostThumb";

const BlogSlider = ({ blogPosts }) => {
  return (
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
                    date: new Date(post?.dateOfBlog as string) ?? new Date(),
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
  );
};

export default BlogSlider;
