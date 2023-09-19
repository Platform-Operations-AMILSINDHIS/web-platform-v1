import Link from "next/link";
import { SwiperSlide, Swiper } from "swiper/react";
import BlogPostThumb from "./blogPostThumb";
import { toLength, toLower, truncate } from "lodash";
import { Autoplay, Navigation } from "swiper/modules";
import { Box, Text } from "@chakra-ui/react";
import { satoshi } from "~/utils/fonts";

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
        blogType: string[];
        blogDisplayPicture: {
          url: string | undefined;
        };
      }[]
    | null
    | undefined;
  blogType: string;
}
const BlogSlider: React.FC<BlogPostSliderProps> = ({ blogPosts, blogType }) => {
  return (
    <Box>
      <Text
        className={`${satoshi.variable}`}
        pl={5}
        fontSize="2xl"
        fontWeight={600}
      >
        The latest&nbsp;
        <span
          style={{
            color: "red",
            textDecoration: "underline",
          }}
        >
          {`${toLower(blogType)} posts`}
        </span>
      </Text>
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
            {blogPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post?.sys.id}`}>
                <SwiperSlide>
                  <Box display={post.blogType[0] === blogType ? "" : "none"}>
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
                  </Box>
                </SwiperSlide>
              </Link>
            ))}
          </>
        )}
      </Swiper>
    </Box>
  );
};

export default BlogSlider;
