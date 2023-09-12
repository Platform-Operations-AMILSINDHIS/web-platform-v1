import { Box, Divider, Flex, Text } from "@chakra-ui/react";
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
  console.log("hi");
  return (
    <Layout
      title={
        eventContentType?.eventTitle
          ? eventContentType?.eventTitle
          : "Event Details"
      }
    >
      <Flex mt={"45px"} flexDir="column">
        <Flex
          align="flex-end"
          p={6}
          width="full"
          height={350}
          // background={`url(${eventContentType?.eventDisplayImage?.url ?? ""})`}
          background={`linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${
            eventContentType?.eventDisplayImage?.url ?? ""
          }), lightgray 50% / cover no-repeat;
          `}
          backgroundPosition="center"
          // bgGradient={
          //   "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 0%), lightgray 50%"
          // }
          backgroundSize="cover"
          filter=""
          borderRadius={20}
          boxShadow="4px 4px 4px 0px rgba(0, 0, 0, 0.36)"
        >
          <Text
            fontSize={"3xl"}
            color="white"
            fontWeight={600}
          >{`${eventContentType?.eventTitle}`}</Text>
        </Flex>
        <Flex mt={10}>
          <Flex flexDir="column">
            <Text fontSize={"4xl"} fontWeight={600}>
              Event Details
            </Text>
            <Divider mt={1} mb={3} border="solid 1px" borderColor="gray.300" />
            <Text
              fontSize="lg"
              width="full"
              lineHeight="174.5%"
            >{`${eventContentType?.eventDescription?.json.content[0]?.content[0].value}`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default EventDetailPage;
