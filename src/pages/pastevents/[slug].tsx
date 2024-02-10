/* eslint-disable */
import { Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import LinkButton from "~/components/buttons/LinkButton";
import ModalGallery from "~/components/events/ModalGallery";
import Layout from "~/components/layout";
import { type PastEventDetailQuery } from "~/lib/__generated/sdk";
import { client } from "~/lib/client";
import { convertDateV2 } from "~/utils/helper";

export const getServerSideProps: GetServerSideProps<{
  pastEvent: PastEventDetailQuery;
}> = async ({ params }) => {
  const slug = (params?.slug as string) ?? "";

  const pastEvent = await client.pastEventDetail({ id: slug });
  return { props: { pastEvent } };
};

const PastEventDetailPage = ({
  pastEvent: { pastEventContentType },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout
      title={
        pastEventContentType?.pastEventName
          ? pastEventContentType?.pastEventName
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
            pastEventContentType?.pastEventDisplayPicture?.url ?? ""
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
            >{`${pastEventContentType?.pastEventName}`}</Text>
          </Flex>
          <LinkButton
            onClick={() => onOpen()}
            CTAlabel="View Gallery"
            CTATheme={false}
            px={8}
            py={6}
          />
          <ModalGallery
            eventName={pastEventContentType?.pastEventName}
            galleryPictures={
              pastEventContentType?.pastEventPicturesCollection?.items as
                | Array<{ url?: string }>
                | undefined
            }
            handleModal={onClose}
            modalState={isOpen}
          />
        </Flex>

        <Flex mt={8} flexDir="column">
          <Flex w="full" justify="space-between" align="flex-start">
            <Flex flexDir="column">
              <Text fontSize={"4xl"} fontWeight={600}>
                {pastEventContentType?.pastEventLocation}
              </Text>
              <Text>
                {convertDateV2(pastEventContentType?.pastEventDate as Date)}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Flex gap={2}>
                {pastEventContentType?.pastEventSearchTags?.map(
                  (item, index) => {
                    return (
                      <Text
                        fontWeight={500}
                        border="1px solid"
                        borderColor="gray.600"
                        color="gray.700"
                        fontSize="small"
                        px={4}
                        py={0.5}
                        borderRadius={20}
                        key={index}
                      >
                        {item}
                      </Text>
                    );
                  }
                )}
              </Flex>
              <Text
                px={4}
                py={0.5}
                fontSize="small"
                fontWeight={500}
                background="orange.200"
                borderRadius={20}
              >
                {pastEventContentType?.pastEventType
                  ? pastEventContentType.pastEventType
                  : ""}
              </Text>
            </Flex>
          </Flex>
          <Divider mt={1} mb={3} border="solid 1px" borderColor="gray.300" />

          <Flex gap={3} flexDir="column">
            {/* eslint-disable-next-line */}
            {pastEventContentType?.pastEventDescription?.json?.content.map(
              (content: any, index: number) => {
                return <Text key={index}>{content.content[0].value}</Text>;
              }
            )}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default PastEventDetailPage;
