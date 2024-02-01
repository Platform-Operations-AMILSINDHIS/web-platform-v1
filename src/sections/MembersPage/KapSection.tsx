import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import KAPImage01 from "../../../public/images/membership/KAPImage01.jpg";

const KAPSection = () => {
  return (
    <Flex gap={20} flexDir="column" mb={20}>
      <Flex align="center" justify="space-between" w="full">
        <Box>
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
        <Flex align="center" flexDir="column">
          <Text fontWeight={500} fontSize={"3xl"}>
            Offerings from KAP
          </Text>
          <Text textAlign="center" w={450}>
            As an official member of KAP, you will have posses various benefits
            like
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default KAPSection;
