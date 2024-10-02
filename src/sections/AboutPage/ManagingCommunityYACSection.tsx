import React from "react";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";

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
    <Box>
      <Text textAlign="center" color="#FF4D00" fontWeight={600} mb={8}>
        Meet Our YAC Managing Committee
      </Text>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        rowGap={8}
        columnGap={16}
      >
        {yacMembers?.map((member, index) => (
          <GridItem key={index}>
            <Flex direction="column">
              <Box position="relative" width="100%" height={300} mb={0}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  alt={`${member.yacMemberName}_image`}
                  src={member.yacDisplayPictureUrl}
                />
              </Box>
              <Box p={2}>
                <Text fontWeight={500} fontSize="sm">
                  {member.yacMemberPosition}
                </Text>
                <Text fontWeight={700} fontSize="md">
                  {member.yacMemberName}
                </Text>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ManagingCommunityYACSection;
