import { Flex, Text, Heading, useDisclosure } from "@chakra-ui/react";
import InformationBox from "~/components/members/InformationBox";

const info1 = [
  `Patron Membership - This membership is for individuals aged 21 and above for a lifetime.`,
  `Life Membership - This membership is also for individuals aged 21 and above for a lifetime.`,
];

const info2 = [
  `Young Amil Circle Membership - This membership is for individuals aged 16 to 30.`,
];

const RequirementSection = () => {
  return (
    <Flex id="memberships-forms" w="full" align="center" flexDir="column">
      <Text fontWeight={500} fontSize="3xl">
        Become a member now
      </Text>
      <Flex py={5} mx={20} gap={8}>
        <InformationBox
          modalDisplayState={true}
          URL="/memberships/khudabadi-amil-panchayat"
          identifier="KAP Membership"
          title="Exclusive to only amil sindhis"
          content={info1}
        />
        <InformationBox
          modalDisplayState={false}
          URL="/memberships/young-amil-circle"
          identifier="YAC membership"
          title="Exclusive for the youth of amil sindhis"
          content={info2}
        />
      </Flex>
    </Flex>
  );
};

export default RequirementSection;
