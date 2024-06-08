import { Box, Flex, Grid, Icon, Spinner, Text } from "@chakra-ui/react";
import { MdMale, MdFemale } from "react-icons/md";

import React from "react";

import { MatrimonyProfilesFetchResponse } from "~/types/api";
import { userAtomBody } from "~/types/atoms/users";
import { formatPDFAge } from "~/utils/helper";
import MatrimonyProfileCard from "./MatrimonyProfileCard";

interface MatrimonyProfilesViewProps {
  isLoggedIn: boolean;
  matrimonyProfiles: MatrimonyProfilesFetchResponse[];
  user: userAtomBody | null;
}

const MatrimonyProfilesView: React.FC<MatrimonyProfilesViewProps> = ({
  isLoggedIn,
  matrimonyProfiles,
  user,
}) => {
  return (
    <Box>
      {isLoggedIn ? (
        <Flex gap={8} flexDir="column">
          <Flex flexDir="column">
            <Text fontSize={"3xl"} color="#1F2937" fontWeight={700}>
              Matrimony Profiles
            </Text>
            <Text>
              Select from any of the profiles below to request their entire
              details.
            </Text>
          </Flex>
          {matrimonyProfiles.length > 0 ? (
            <Grid gap={5} templateColumns="repeat(3, 1fr)">
              {matrimonyProfiles
                .filter((e) => e.user_id !== user?.id)
                .map((profile, index) => {
                  return (
                    <MatrimonyProfileCard
                      submission={profile.submission}
                      key={index}
                    />
                  );
                })}
            </Grid>
          ) : (
            <Spinner />
          )}
        </Flex>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default MatrimonyProfilesView;
