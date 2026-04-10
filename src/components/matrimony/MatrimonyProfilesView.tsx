// src/components/matrimony/MatrimonyProfilesView.tsx
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useMemo, useState } from "react";
import type { MatrimonyProfilesFetchResponse, MatrimonyIdFetchResponse } from "~/types/api";
import type { userAtomBody } from "~/types/atoms/users";
import type { SpousePreferences, MatrimonyFormValues } from "~/types/forms/matrimony";
import MatrimonyProfileCard from "./MatrimonyProfileCard";
import MatrimonyProfileViewModal from "./MatrimonyProfileViewModal";
import MatrimonyPreferencesStrip from "./MatrimonyPreferencesStrip";
import { computeMatchScore } from "~/utils/matrimonyMatch";
import { calculateAge } from "~/utils/helper";

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
  matchPreferences: SpousePreferences | null;
  matrimonyID: string;
  handleMatrimonyIdFetch: (user_id: string) => Promise<MatrimonyIdFetchResponse>;
  handleMatrimonyRequestProfile: (
    requestee_name: string,
    requestee_id: string,
    requested_name: string,
    requested_id: string,
    email_id: string
  ) => Promise<void>;
  onRequestSent: (firstName: string) => void;
}

const MatrimonyProfilesView: React.FC<MatrimonyProfilesViewProps> = ({
  isLoggedIn,
  matrimonyProfiles,
  profileRequests,
  user,
  matchPreferences,
  matrimonyID,
  handleMatrimonyIdFetch,
  handleMatrimonyRequestProfile,
  onRequestSent,
}) => {
  const toast = useToast();
  const {
    isOpen: isProfileViewOpen,
    onClose: onCloseProfileView,
    onOpen: onOpenProfileView,
  } = useDisclosure();

  const [profileView, setProfileView] = useState<MatrimonyFormValues | undefined>();
  const [profileMedia, setProfileMedia] = useState<ApplicationS3Meta[]>([]);
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isRequestingProfile, setIsRequestingProfile] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [minAge, setMinAge] = useState<number | undefined>(undefined);
  const [maxAge, setMaxAge] = useState<number | undefined>(undefined);

  const handleViewProfile = (
    submission: MatrimonyFormValues,
    media: ApplicationS3Meta[],
    pictureURL: string,
    userId: string
  ) => {
    setProfileView(submission);
    setProfileMedia(media);
    setProfilePictureURL(pictureURL);
    setSelectedUserId(userId);
    onOpenProfileView();
  };

  const handleRequestFromModal = async () => {
    if (!selectedUserId || !matrimonyID || !profileView || !user) return;
    setIsRequestingProfile(true);
    try {
      const idResp = await handleMatrimonyIdFetch(selectedUserId);
      if (!idResp?.matrimony_id) {
        toast({ title: "Could not find profile ID", status: "error", duration: 3000 });
        return;
      }
      await handleMatrimonyRequestProfile(
        user.account_name ?? "",
        matrimonyID,
        `${profileView.personalInfo.firstName} ${profileView.personalInfo.lastName}`,
        idResp.matrimony_id,
        user.email_id ?? ""
      );
      onRequestSent(
        `${profileView.personalInfo.firstName} ${profileView.personalInfo.lastName}`
      );
      toast({
        title: "Profile Requested!",
        description: "The team will respond in 3-4 days.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onCloseProfileView();
    } catch {
      toast({ title: "Request failed", status: "error", duration: 3000 });
    } finally {
      setIsRequestingProfile(false);
    }
  };

  const visibleProfiles = useMemo(() => {
    return matrimonyProfiles
      .filter((p) => p.user_id !== user?.id)
      .filter((p) =>
        user?.gender === "Male"
          ? p.submission.personalInfo.gender !== "Male"
          : p.submission.personalInfo.gender !== "Female"
      )
      .map((p) => ({
        ...p,
        match: computeMatchScore(matchPreferences, p.submission.personalInfo),
      }))
      .sort((a, b) => b.match.score - a.match.score)
      .filter((p) => {
        const fullName = `${p.submission.personalInfo.firstName} ${p.submission.personalInfo.lastName}`.toLowerCase();
        if (searchTerm && !fullName.includes(searchTerm.toLowerCase())) return false;
        const age = calculateAge(p.submission.personalInfo.dateAndTimeOfBirth);
        if (minAge && age !== null && age < minAge) return false;
        if (maxAge && age !== null && age > maxAge) return false;
        return true;
      });
  }, [matrimonyProfiles, user, matchPreferences, searchTerm, minAge, maxAge]);

  const isCurrentProfileRequested = profileView
    ? profileRequests.includes(
        `${profileView.personalInfo.firstName} ${profileView.personalInfo.lastName}`
      )
    : false;

  if (!isLoggedIn) return null;

  return (
    <Box>
      <Flex gap={6} flexDir="column">
        {/* Preferences strip */}
        <MatrimonyPreferencesStrip prefs={matchPreferences} />

        {/* Search + age filter bar */}
        <Flex gap={3} align="flex-end" flexWrap="wrap">
          <InputGroup maxW="320px" flex={1}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderColor="gray.300"
              _hover={{ borderColor: "#FF4D00" }}
              focusBorderColor="#FF4D00"
              h="44px"
            />
          </InputGroup>

          <Flex align="center" gap={2}>
            <Text fontSize="sm" color="gray.500" fontWeight={500} whiteSpace="nowrap">
              Age:
            </Text>
            <NumberInput
              min={18}
              max={80}
              w="80px"
              value={minAge ?? ""}
              onChange={(_, val) => setMinAge(isNaN(val) ? undefined : val)}
              focusBorderColor="#FF4D00"
            >
              <NumberInputField
                placeholder="Min"
                h="44px"
                borderColor="gray.300"
                _hover={{ borderColor: "#FF4D00" }}
              />
            </NumberInput>
            <Text fontSize="sm" color="gray.400">
              –
            </Text>
            <NumberInput
              min={18}
              max={80}
              w="80px"
              value={maxAge ?? ""}
              onChange={(_, val) => setMaxAge(isNaN(val) ? undefined : val)}
              focusBorderColor="#FF4D00"
            >
              <NumberInputField
                placeholder="Max"
                h="44px"
                borderColor="gray.300"
                _hover={{ borderColor: "#FF4D00" }}
              />
            </NumberInput>
          </Flex>

          {(searchTerm !== "" || minAge != null || maxAge != null) && (
            <Button
              size="sm"
              variant="ghost"
              color="#FF4D00"
              fontWeight={600}
              onClick={() => {
                setSearchTerm("");
                setMinAge(undefined);
                setMaxAge(undefined);
              }}
            >
              Clear
            </Button>
          )}

          <Text fontSize="sm" color="gray.400" ml="auto" whiteSpace="nowrap">
            {visibleProfiles.length} profile{visibleProfiles.length !== 1 ? "s" : ""}
          </Text>
        </Flex>

        {/* Profile grid */}
        {matrimonyProfiles.length === 0 ? (
          <Grid
            gap={5}
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                height="340px"
                borderRadius="10px"
                startColor="gray.100"
                endColor="gray.200"
              />
            ))}
          </Grid>
        ) : visibleProfiles.length === 0 ? (
          <Flex
            py={12}
            align="center"
            justify="center"
            flexDir="column"
            gap={3}
            color="gray.400"
          >
            <Text fontWeight={700} fontSize="lg" color="gray.500">
              No profiles match your search
            </Text>
            <Text fontSize="sm">Try adjusting the filters above</Text>
          </Flex>
        ) : (
          <Grid
            gap={5}
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
          >
            {visibleProfiles.map((profile) => (
              <MatrimonyProfileCard
                key={profile.id}
                profileRequests={profileRequests}
                handleOpenModal={handleViewProfile}
                submission={profile.submission}
                profileMedia={profile.application_s3_meta ?? []}
                userId={profile.user_id}
                matchLabel={profile.match.label}
              />
            ))}
          </Grid>
        )}
      </Flex>

      <MatrimonyProfileViewModal
        handleModal={onCloseProfileView}
        modalHeader="Profile View"
        modalState={isProfileViewOpen}
        submission={profileView}
        profileMedia={profileMedia}
        profilePictureURL={profilePictureURL}
        isRequested={isCurrentProfileRequested}
        isRequesting={isRequestingProfile}
        onRequestProfile={() => void handleRequestFromModal()}
      />
    </Box>
  );
};

export default MatrimonyProfilesView;
