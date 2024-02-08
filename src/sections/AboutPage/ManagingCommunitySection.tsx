import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

interface ManagingCommunitySectionProps {
  otherMembers: {
    memberName: string;
    memberPosition: string;
    displayPictureUrl: string;
  }[];
}

const ManagingCommunitySection: React.FC<ManagingCommunitySectionProps> = ({
  otherMembers,
}) => {
  return (
    <Flex gap={10} align="center" flexDir="column">
      <Text textAlign="center" textColor="#FF4D00" fontWeight={600}>
        Meet Our Office Bearers
      </Text>
      <Grid gridTemplateColumns="repeat(4,1fr)" gap="4.5rem" rowGap={10}>
        {otherMembers?.map((member, index) => {
          return (
            <GridItem key={index}>
              <Flex gap={3} flexDir="column">
                <Image
                  alt={`${member.memberName} picture`}
                  src={member.displayPictureUrl}
                />
                <Flex flexDir="column">
                  <Text fontWeight={500}>{member.memberPosition}</Text>
                  <Text fontWeight={700}>{member.memberName}</Text>
                </Flex>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ManagingCommunitySection;
