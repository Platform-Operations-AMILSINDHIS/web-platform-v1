import { Box, Flex, Text } from "@chakra-ui/react";
import { truncate } from "lodash";
import Link from "next/link";

interface BlogCatalogProps {
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

const BlogCatalogDisplay: React.FC<BlogCatalogProps> = ({
  blogPosts,
  blogType,
}) => {
  console.log(blogPosts);
  return (
    <Flex my={8} gap={8} flexDir="column">
      {blogPosts?.map((blog, index) => {
        return (
          <Flex gap={1} flexDir="column" key={index}>
            <Flex gap={3}>
              <Text fontSize="sm" color="gray.500" fontWeight={600}>
                {blog?.author}
              </Text>{" "}
              |
              <Text fontSize="sm" color="gray.500" fontWeight={600}>
                {new Date(blog?.dateOfBlog).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </Flex>
            <Link href={`/blog/${blog?.sys.id}`}>
              <Text
                _hover={{ textDecoration: "underline" }}
                fontWeight={600}
                fontSize="xl"
              >
                {blog?.blogTitle}
              </Text>
            </Link>
            <Text fontSize="sm" maxW={600}>
              {truncate(blog?.excerpt ?? "", { length: 200 })}
            </Text>
            <Flex mt={2} gap={2}>
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
                {blog?.blogType}
              </Box>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default BlogCatalogDisplay;
