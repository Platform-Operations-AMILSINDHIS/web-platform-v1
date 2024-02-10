import { Flex, Box, Text, Grid } from "@chakra-ui/react";

import Image from "next/image";
import FeatureDisplay from "~/components/members/FeatureDisplay";

import YacSectionPic01 from "../../../public/images/membership/KAPImage02.svg";
import YAC_illustration from "../../../public/images/membership/YAC_illustration.svg";
import YAC_FeatureIcon01 from "../../../public/images/membership/YAC_icon01.svg";
import YAC_FeatureIcon02 from "../../../public/images/membership/YAC_icon02.svg";
import YAC_FeatureIcon03 from "../../../public/images/membership/YAC_icon03.svg";
import YAC_FeatureIcon04 from "../../../public/images/membership/YAC_icon04.svg";
import YAC_FeatureIcon05 from "../../../public/images/membership/YAC_icon05.svg";

const YacSection = () => {
  return (
    <Flex gap={10} my={20} flexDir="column">
      <Flex gap={[5, 0]} direction={["column-reverse", "row"]} align="center" w="full">
        <Flex gap={1} w={["90%", 650]} flexDir="column">
          <Text color="orange.500" fontWeight={600}>
            Young Amil Circle
          </Text>
          <Text fontWeight={500} fontSize="4xl">
            Joining The YAC Community
          </Text>
          <Text fontSize="lg" w={["90%", 600]}>
            The youth wing of KAP, Young Amil Circle (YAC), welcomes Amil youth
            to come forward and take responsibility for their society while
            providing numerous possibilities for self-development.
          </Text>
        </Flex>
        <Box transform={["translateX(-10px)", ""]}>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image width={600} src={YacSectionPic01} alt="Image" />
        </Box>
      </Flex>
      <Flex gap={10} flexDir="column">
        <Flex gap={1} flexDir="column">
          <Text fontWeight={500} fontSize={"3xl"}>
            Offerings from KAP
          </Text>
          <Text w={["90%", 450]}>
            As an official member of KAP, you will have posses various benefits
            like
          </Text>
        </Flex>
        <Flex my={5} justify="space-between">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Box display={["none", "block"]}>
            <Image alt="yac_illustration" width={400} src={YAC_illustration} />
          </Box>
          <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={10}>
            <FeatureDisplay
              content="Participate in YAC events, ranging from social initiatives to fun gatherings."
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              icon={YAC_FeatureIcon01}
            />
            <FeatureDisplay
              content="Participate in YAC events, ranging from social initiatives to fun gatherings."
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              icon={YAC_FeatureIcon02}
            />
            <FeatureDisplay
              content="Participate in YAC events, ranging from social initiatives to fun gatherings."
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              icon={YAC_FeatureIcon03}
            />
            <FeatureDisplay
              content="Participate in YAC events, ranging from social initiatives to fun gatherings."
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              icon={YAC_FeatureIcon04}
            />
            <FeatureDisplay
              content="Participate in YAC events, ranging from social initiatives to fun gatherings."
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              icon={YAC_FeatureIcon05}
            />
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default YacSection;
