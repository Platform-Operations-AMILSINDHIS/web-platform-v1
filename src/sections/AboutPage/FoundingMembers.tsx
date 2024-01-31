import { Flex, Grid, Box, Text, Spacer, Icon } from "@chakra-ui/react";
import Image from "next/image";

import InduShaniImage from "../../../public/images/Presidents/InduShaniCircle.jpg";
import { BsChatLeftQuoteFill } from "react-icons/bs";

const FoundingMembers = ({ induShaniWords }: { induShaniWords: string }) => {
  return (
    <Box textAlign="center">
      <Text textColor="#FF4D00" fontWeight={600}>
        Meet Our Founding Members
      </Text>

      <Spacer h="2rem" />

      <Grid templateColumns="repeat(5, 1fr)" gap="1.5rem">
        {[
          {
            image: "",
            role: "President",
            name: "Fatechand Assudmal Jhangiani",
            description:
              "A dedicated leader and visionary who played a pivotal role in establishing the Panchayat.",
          },
          {
            image: "",
            role: "Vice-President",
            name: "Jagatrai Issardas Shivdasani",
            description:
              "An integral part of the founding team, contributing his expertise and leadership.",
          },
          {
            image: "",
            role: "Honorary Secretary",
            name: "Wadhumal Hukumatrai Alimchandani",
            description:
              "The driving force behind the Panchayat's administrative foundation.",
          },
          {
            image: "",
            role: "Joint Secretary",
            name: "Tahilram Assudmal Gurbaxani",
            description:
              "A key member responsible for the Panchayat's early organization and operations.",
          },
          {
            image: "",
            role: "Advocate",
            name: "Hassasingh H. Advani",
            description:
              "A key member responsible for the Panchayat's early organization and operations.",
          },
        ].map(({ image, role, name, description }, i) => (
          <Flex
            key={i}
            direction="column"
            alignItems="baseline"
            textAlign="left"
          >
            <Image alt="" src={image} />
            <Text mt="0.75rem" fontWeight={500}>
              {role}
            </Text>
            <Text fontWeight={700}>{name}</Text>
            <Text>{description}</Text>
          </Flex>
        ))}
      </Grid>
      <Spacer h="5rem" />
      <Flex gap={10} align="center" flexDir="column">
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
      </Flex>
    </Box>
  );
};

export default FoundingMembers;
