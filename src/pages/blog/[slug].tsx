/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type {
  NextPage,
  GetServerSideProps,
  GetStaticPaths,
  InferGetServerSidePropsType,
} from "next";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import Layout from "~/components/layout";
import { client } from "~/lib/client";

import type { PageBlogPostQuery } from "~/lib/__generated/sdk";

type TypeColorMapping = Record<string, string>;

const colorMapping: TypeColorMapping = {
  Blog: "#FFA882",
  Publication: "#D0FF82",
  NewsLetter: "rgba(255, 31, 152, 0.27)",
};

export const getServerSideProps: GetServerSideProps<{
  post: PageBlogPostQuery;
}> = async ({ params }) => {
  // const id = "2r8kXEx9bu8TiwGOD81rWz";

  // TODO: Replace with slug instead of post ID
  const slug = (params?.slug as string) ?? "";

  const post = await client.pageBlogPost({ id: slug });
  return { props: { post } };
};

const BlogPostPage = ({
  post: { blogContentType },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout
      title={
        blogContentType?.blogTitle ? blogContentType?.blogTitle : "Blog Post"
      }
      blogPostPage
    >
      <Box mb={10} maxW="950px" mx="auto">
        {/* <pre>{JSON.stringify(blogContentType, null, 2)}</pre> */}

        {/* Tags */}
        <Flex gap="10px">
          {blogContentType?.blogTags?.map((tag, i) => (
            <Box
              key={i}
              px="10px"
              py="2px"
              border="1px solid #1F2937"
              borderRadius="15px"
            >
              <Text fontSize="xs">{tag}</Text>
            </Box>
          ))}

          {/* TODO: Check if content type is blog for this */}
          <Box
            bg={
              colorMapping[
                blogContentType?.blogType && blogContentType?.blogType[0]
                  ? blogContentType.blogType[0]
                  : ""
              ] ?? "white"
            }
            fontWeight={500}
            className={`rounded-full  px-3 py-1 text-xs`}
          >
            {blogContentType?.blogType && blogContentType?.blogType[0]
              ? blogContentType.blogType[0]
              : ""}
          </Box>
        </Flex>

        <Spacer h="1rem" />

        {/* Heading */}
        <Heading>{blogContentType?.blogTitle}</Heading>

        <Spacer h="0.5rem" />

        {/* Author & Date */}
        <Box>
          <Text color="#1F2937AD" fontWeight="medium">
            {blogContentType?.author} &middot;{" "}
            {new Date(blogContentType?.dateOfBlog as string).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </Text>
        </Box>

        <Spacer h="2rem" />

        {/* Image */}
        <Box
          w="100%"
          h="300px"
          backgroundImage={blogContentType?.blogDisplayPicture?.url ?? ""}
          backgroundSize="cover"
          backgroundPosition="center"
          borderRadius="10px"
        />

        <Spacer h="3rem" />

        {/* Conditional PDF Render */}
        {blogContentType?.blogType &&
          blogContentType?.blogType[0] === "NewsLetter" &&
          blogContentType?.blogContent?.links?.assets?.block[0]?.url && (
            <Box mt="3rem">
              <iframe
                src={blogContentType.blogContent.links.assets.block[0].url}
                width="100%"
                height="600px"
                style={{ border: "none" }}
              />
            </Box>
          )}

        {/* Content */}
        <Box>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                nodeType: "document",
                content: blogContentType?.blogContent?.json?.content,
                data: {},
              }),
            }}
          />
        </Box>

        {/* Similar Reads */}
      </Box>
    </Layout>
  );
};

export default BlogPostPage;
