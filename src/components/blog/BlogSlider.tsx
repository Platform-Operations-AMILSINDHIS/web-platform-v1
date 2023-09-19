import Link from "next/link";
import { SwiperSlide, Swiper } from "swiper/react";
import BlogPostThumb from "./blogPostThumb";
import { truncate } from "lodash";
import { Autoplay, Navigation } from "swiper/modules";

interface BlogPostSliderProps {
  blogPosts:
    | {
        sys: {
          id: string;
        };
        blogTitle: string;
        author: string;
        dateOfBlog: string;
        excerpt: string;
        blogTags: string[];
        blogDisplayPicture: {
          url: string | undefined;
        };
      }[]
    | null;
}
const BlogSlider: React.FC<BlogPostSliderProps> = ({ blogPosts }) => {
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
                    date: new Date(post?.dateOfBlog) ?? new Date(),
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
