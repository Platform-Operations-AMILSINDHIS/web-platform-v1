import { Box } from "@chakra-ui/react";

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
  return <Box></Box>;
};

export default BlogCatalogDisplay;
