import { Flex, Grid, Box, Text, Spacer, Icon } from "@chakra-ui/react";
import Image from "next/image";

import InduShaniImage from "../../../public/images/Presidents/InduShaniCircle.jpg";
import { BsChatLeftQuoteFill } from "react-icons/bs";

const FoundingMembers = ({
  induShaniWords,
  foundingMembers,
}: {
  induShaniWords: string;
  foundingMembers: {
    name: string;
    position: string;
    displayPictureUrl: string;
  }[];
}) => {
  return (
    <Box textAlign="center">
      <Text textColor="#FF4D00" fontWeight={600}>
        Meet Our Office Bearers
      </Text>
      <Spacer h="2rem" />
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
        gap="1.5rem"
      >
        {foundingMembers
          .reverse()
          .map(({ name, position, displayPictureUrl }, i) => (
            <Flex
              key={i}
              direction="column"
              alignItems="baseline"
              textAlign="left"
            >
              <Image width={300} height={300} alt="" src={displayPictureUrl} />
              <Text mt="0.75rem" fontWeight={500}>
                {position}
              </Text>
              <Text fontWeight={700}>{name}</Text>
              {/* <Text>{description}</Text> */}
            </Flex>
          ))}
      </Grid>
      <Spacer h="5rem" />
      <Flex gap={8} align="center" flexDir="column">
        <Flex position="relative" gap={3} align="center" flexDir="column">
          <Image width={100} alt="" src={InduShaniImage} />
          <Icon
            bottom={10}
            left={115}
            color="orange.500"
            boxSize={8}
            position="absolute"
            as={BsChatLeftQuoteFill}
          />

          <Text fontWeight={600} fontSize="xl">
            President Speaks
          </Text>
        </Flex>
        <Box mx="auto" maxW="62%" textAlign="center">
          <Text whiteSpace="pre-wrap">{induShaniWords}</Text>
        </Box>
        <Flex flexDir="column" align="center">
          <Text fontWeight="bold" fontSize="lg">
            - Dr. Indu Shahani
          </Text>
          <Text>President of Khudabadi Amil Panchayat of Bombay</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FoundingMembers;
