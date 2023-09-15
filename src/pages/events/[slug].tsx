import { Divider, Flex, Text } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import LinkButton from "~/components/buttons/LinkButton";
import EventDetailModule from "~/components/events/EventDetailModule";
import Layout from "~/components/layout";
import {
  EventDetailDocument,
  type EventDetailQuery,
} from "~/lib/__generated/sdk";
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
      <Flex mb={10} mt={"45px"} flexDir="column">
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
          <Flex width="full" justify="space-between">
            <Text
              fontSize={"3xl"}
              color="white"
              fontWeight={600}
            >{`${eventContentType?.eventTitle}`}</Text>
            <LinkButton
              CTATheme={false}
              CTAlabel="View Gallery"
              CTAlink="/gallery"
            />
          </Flex>
        </Flex>
        <Flex gap={20} mt={10}>
          <Flex flexDir="column">
            <Text fontSize={"4xl"} fontWeight={600}>
              Event Details
            </Text>
            <Divider mt={1} mb={3} border="solid 1px" borderColor="gray.300" />
            <Text maxW="2700px" fontSize="lg" lineHeight="174.5%">{`${
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              (eventContentType?.eventDescription?.json?.content[0]?.content[0]
                ?.value as string) || ""
            }`}</Text>
          </Flex>
          <EventDetailModule
            title={eventContentType?.eventTitle}
            location={eventContentType?.eventLocation}
            date={new Date(eventContentType?.eventDates as string)}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default EventDetailPage;
