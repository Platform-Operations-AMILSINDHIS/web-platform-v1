import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

interface ManagingCommunityYACSectionProps {
  yacMembers: {
    yacMemberName: string;
    yacMemberPosition: string;
    yacDisplayPictureUrl: string;
  }[];
}

const ManagingCommunityYACSection: React.FC<
  ManagingCommunityYACSectionProps
> = ({ yacMembers }) => {
  return (
    <Flex gap={10} align="center" flexDir="column">
      <Text textAlign="center" textColor="#FF4D00" fontWeight={600}>
        Meet Our YAC Managing Committee
      </Text>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap="4.5rem"
        rowGap={10}
      >
        {yacMembers?.map((member, index) => {
          return (
            <GridItem key={index}>
              <Flex gap={3} flexDir="column">
                <Image
                  alt={`${member.yacMemberName} picture`}
                  src={member.yacDisplayPictureUrl}
                />
                <Flex flexDir="column">
                  <Text fontWeight={500}>{member.yacMemberPosition}</Text>
                  <Text fontWeight={700}>{member.yacMemberName}</Text>
                </Flex>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ManagingCommunityYACSection;
