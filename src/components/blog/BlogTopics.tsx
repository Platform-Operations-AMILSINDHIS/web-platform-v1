import { Box, Flex, Grid, Text } from "@chakra-ui/react";

interface BlogTopicProps {
  blogTags: string[];
}

const BlogTopics: React.FC<BlogTopicProps> = ({ blogTags }) => {
  console.log(blogTags);
  return (
    <Flex gap={2} flexDir="column">
      <Flex my={3} flexDir="column">
        <Text fontWeight={600} fontSize="xl">
          Recommended{" "}
          <span
            style={{
              color: "#FF4D00",
            }}
          >
            Topics
          </span>
        </Text>
        <Text fontSize="sm">
          Choose from the topics you prefer to read from
        </Text>
      </Flex>
      <Grid gap={3} templateColumns="repeat(4,1fr)">
        {blogTags?.map((tag, index) => {
          return (
            <Box
              fontWeight={500}
              key={index}
              bg="gray.100"
              textAlign="center"
              className={`rounded-full  px-3 py-2 text-xs`}
            >
              {tag}
            </Box>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default BlogTopics;
