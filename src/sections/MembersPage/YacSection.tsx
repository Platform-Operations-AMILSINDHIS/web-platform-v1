import { Flex, Box, Text, Grid } from "@chakra-ui/react";
import Image from "next/image";

import YacSectionPic01 from "../../../public/images/membership/KAPImage02.svg";
import YAC_illustration from "../../../public/images/membership/YAC_illustration.svg";
import { FaPeopleGroup } from "react-icons/fa6";
import TextDisplay from "~/components/members/TextDisplay";

const YacSection = () => {
  return (
    <Flex gap={10} my={20} flexDir="column">
      <Flex align="center" w="full">
        <Flex gap={1} w={650} flexDir="column">
          <Text color="orange.500" fontWeight={600}>
            Young Amil Circle
          </Text>
          <Text fontWeight={500} fontSize="4xl">
            Joining The YAC Community
          </Text>
          <Text fontSize="lg" w={600}>
            The youth wing of KAP, Young Amil Circle (YAC), welcomes Amil youth
            to come forward and take responsibility for their society while
            providing numerous possibilities for self-development.
          </Text>
        </Flex>
        <Box>
          <Image width={600} src={YacSectionPic01} alt="Image" />
        </Box>
      </Flex>
      <Flex gap={10} flexDir="column">
        <Flex flexDir="column">
          <Text fontWeight={500} fontSize={"3xl"}>
            Offerings from KAP
          </Text>
          <Text w={450}>
            As an official member of KAP, you will have posses various benefits
            like
          </Text>
        </Flex>
        <Flex>
          <Image alt="yac_illustration" width={450} src={YAC_illustration} />
          <Grid templateColumns="repeat(2, 1fr)" gap={3}></Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default YacSection;
