import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";

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
        Meet Our KAP Managing Committee
      </Text>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        columnGap="2rem"
        rowGap="5rem"
      >
        {otherMembers?.map((member, index) => {
          return (
            <GridItem key={index}>
              <Flex alignItems="baseline" gap={3} flexDir="column">
                <Box position="relative" width={"100%"} height={400}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt={`${member.memberName} picture`}
                    src={member.displayPictureUrl}
                  />
                </Box>
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
