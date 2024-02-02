import { Box, Flex, Text } from "@chakra-ui/react";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";

import Image from "next/image";

import KAPImage01 from "../../../public/images/membership/KAPImage01.svg";
import TextDisplay from "~/components/members/TextDisplay";

const KAPSection = () => {
  return (
    <Flex id="memberships-learn-more" gap={20} flexDir="column" mb={20}>
      <Flex align="center" justify="space-between" w="full">
        <Box>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image width={550} src={KAPImage01} alt="Image" />
        </Box>
        <Flex gap={1} w={650} flexDir="column">
          <Text color="orange.500" fontWeight={600}>
            Khudabadi Amil Panchayat
          </Text>
          <Text fontWeight={500} fontSize="4xl">
            Joining The KAP Community
          </Text>
          <Text fontSize="lg" w={500}>
            Becoming a KAP member will not only provide you with opportunities
            for networking within your community but also for giving back to
            your society by taking up various initiatives for a cause.
          </Text>
        </Flex>
      </Flex>
      <Flex w="full" align="center" flexDir="column">
        <Flex gap={1} align="center" flexDir="column">
          <Text fontWeight={500} fontSize={"3xl"}>
            Offerings from KAP
          </Text>
          <Text textAlign="center" w={450}>
            As an official member of KAP, you will have posses various benefits
            like
          </Text>
        </Flex>
        <Flex gap={10} flexDir="column" mt={8}>
          <Flex gap={10}>
            <TextDisplay
              content="Attending the AGM and connecting with fellow community members from all walks of life"
              icon={FaPeopleGroup}
            />
            <TextDisplay
              content="Joining the organizing committee of social initiatives like Health Checkup Camps, etc."
              icon={FaGlobeAmericas}
            />
          </Flex>
          <TextDisplay
            content="Receiving the Amil Samachar, which provides the current affairs of KAP, YAC, and the community."
            icon={ImNewspaper}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default KAPSection;
