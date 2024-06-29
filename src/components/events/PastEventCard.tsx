import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { truncate } from "lodash";
import { PastEventContentType } from "~/lib/__generated/sdk";
import { convertDateV2 } from "~/utils/helper";

interface PastEventCardProps {
  pastEvent: PastEventContentType | undefined | null;
}

const PastEventCard: React.FC<PastEventCardProps> = ({ pastEvent }) => {
  console.log(pastEvent);
  return (
    <Flex
      transition="all .2s ease-in"
      _hover={{
        transform: "translateY(-2px)",
      }}
      cursor="pointer"
      color="#1F2937"
      flexDir="column"
      onClick={() =>
        (window.location.href = `/pastevents/${pastEvent?.sys.id}`)
      }
    >
      <Image
        boxShadow="4px 4px 4px 0px rgba(0, 0, 0, 0.36);"
        width={380}
        height={210}
        src={pastEvent?.pastEventDisplayPicture?.url ?? ""}
        backgroundPosition="center"
        backgroundSize="cover"
        objectFit="cover"
        borderRadius={7}
      />
      <Flex flexDir="column" mt={4}>
        <Text mt={1} color="gray.500" fontWeight={600} fontSize="small">
          {convertDateV2(pastEvent?.pastEventDate as Date)}
        </Text>
        <Text
          as="a"
          href={`/pastevents/${pastEvent?.sys.id}`}
          transition="all .3s"
          _hover={{
            color: "orange.500",
          }}
          fontWeight={600}
          fontSize="2xl"
        >
          {truncate(pastEvent?.pastEventName ?? "", { length: 30 })}
        </Text>
        <Flex mt={2} gap={2}>
          <Flex gap={2}>
            {pastEvent?.pastEventSearchTags?.slice(0, 3).map((item, index) => {
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
                  {truncate(item ?? "", { length: 15 })}
                </Text>
              );
            })}
          </Flex>
          <Text
            px={4}
            py={0.5}
            fontSize="small"
            fontWeight={500}
            background="orange.200"
            borderRadius={20}
          >
            {pastEvent?.pastEventType ? pastEvent.pastEventType : ""}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PastEventCard;
