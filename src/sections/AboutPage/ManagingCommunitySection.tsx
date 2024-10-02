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
        rowGap={8}
        columnGap={16}
      >
        {otherMembers?.map((member, index) => (
          <GridItem key={index}>
            <Flex direction="column">
              <Box position="relative" width="100%" height={300} mb={4}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  alt={`${member.memberName}_image`}
                  src={member.displayPictureUrl}
                />
              </Box>
              <Text fontWeight={500} fontSize="sm">
                {member.memberPosition}
              </Text>
              <Text fontWeight={700} fontSize="md">
                {member.memberName}
              </Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default ManagingCommunitySection;
