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

interface ApplicationS3Meta {
  s3_key: string;
  file_type: string;
  file_name: string;
  content_type: string;
}

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
  const [profileMedia, setProfileMedia] = useState<ApplicationS3Meta[]>([]);
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");

  const handleViewProfile = (
    submission: MatrimonyFormValues,
    profileMedia: ApplicationS3Meta[],
    profilePictureURL: string
  ) => {
    setProfileView(submission);
    setProfileMedia(profileMedia);
    setProfilePictureURL(profilePictureURL);
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
                    <MatrimonyProfileCard
                      profileRequests={profileRequests}
                      handleOpenModal={handleViewProfile}
                      submission={profile.submission}
                      profileMedia={profile.application_s3_meta ?? []}
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
      <MatrimonyProfileViewModal
        handleModal={onCloseProfileView}
        modalHeader="Profile View"
        modalState={isProfileViewOpen}
        submission={profileView}
        profileMedia={profileMedia}
        profilePictureURL={profilePictureURL}
      />
    </Box>
  );
};

export default MatrimonyProfilesView;
