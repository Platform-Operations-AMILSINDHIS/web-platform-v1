import { Box, Flex, Text } from "@chakra-ui/react";

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
    <Flex gap={5} flexDir="column">
      {blogPosts?.map((blog, index) => {
        return (
          <Flex key={index}>
            <Text>{blog?.blogTitle}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default BlogCatalogDisplay;
