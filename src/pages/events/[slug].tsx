import { Box } from "@chakra-ui/react";
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
      <Box>{eventContentType?.eventTitle}</Box>
    </Layout>
  );
};

export default EventDetailPage;
