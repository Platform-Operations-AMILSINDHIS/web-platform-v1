import {
  Box,
  Flex,
  Grid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { MatrimonyProfilesFetchResponse } from "~/types/api";
import { userAtomBody } from "~/types/atoms/users";
import MatrimonyProfileCard from "./MatrimonyProfileCard";
import MatrimonyProfileViewModal from "./MatrimonyProfileViewModal";
import { MatrimonyFormValues } from "~/types/forms/matrimony";

interface MatrimonyProfilesViewProps {
  isLoggedIn: boolean;
  matrimonyProfiles: MatrimonyProfilesFetchResponse[];
  profileRequests: string[];
  user: userAtomBody | null;
}

const MatrimonyProfilesView: React.FC<MatrimonyProfilesViewProps> = ({
  isLoggedIn,
  matrimonyProfiles,
  profileRequests,
  user,
}) => {
  const {
    isOpen: isProfileViewOpen,
    onClose: onCloseProfileView,
    onOpen: onOpenProfileView,
  } = useDisclosure();

  const [profileView, setProfileView] = useState<MatrimonyFormValues>();

  const handleViewProfile = (submission: MatrimonyFormValues) => {
    setProfileView(submission);
    onOpenProfileView();
  };

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
            <Grid
              gap={5}
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
            >
              {matrimonyProfiles
                .filter((e) => e.user_id !== user?.id)
                .filter((e) =>
                  user?.gender === "Male"
                    ? e.submission.personalInfo.gender !== "Male"
                    : e.submission.personalInfo.gender !== "Female"
                )
                .map((profile, index) => {
                  return (
                    <Box key={index}>
                      <MatrimonyProfileViewModal
                        handleModal={onCloseProfileView}
                        modalHeader="Profile View"
                        modalState={isProfileViewOpen}
                        submission={profileView}
                      />
                      <MatrimonyProfileCard
                        profileRequests={profileRequests}
                        handleOpenModal={handleViewProfile}
                        submission={profile.submission}
                        key={index}
                      />
                    </Box>
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
