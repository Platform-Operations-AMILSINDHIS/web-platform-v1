import { Box, Flex } from "@chakra-ui/react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "~/components/layout";
import { EventDetailQuery } from "~/lib/__generated/sdk";
import { client } from "~/lib/client";

export const getServerSideProps: GetServerSideProps<{
  event: EventDetailQuery;
}> = async ({ params }) => {
  const slug = (params?.slug as string) ?? "";

  const event = await client.eventDetail({ id: slug });
  console.log({ event });
  return { props: { event } };
};

const EventDetailPage = ({
  event: { eventContentType },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout
      title={
        eventContentType?.eventTitle
          ? eventContentType?.eventTitle
          : "Event Details"
      }
    >
      <Flex mt={"45px"} flexDir="column">
        <Box
          width="full"
          height={350}
          background={`url(${eventContentType?.eventDisplayImage?.url ?? ""})`}
          backgroundPosition="center"
          backgroundSize="cover"
          filter=""
          borderRadius={7}
        />
      </Flex>
    </Layout>
  );
};

export default EventDetailPage;
