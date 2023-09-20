import { Box } from "@chakra-ui/react";

interface BlogTopicProps {
  blogTags: string[];
}

const BlogTopics: React.FC<BlogTopicProps> = ({ blogTags }) => {
  console.log(blogTags);
  return <Box>hi</Box>;
};

export default BlogTopics;
