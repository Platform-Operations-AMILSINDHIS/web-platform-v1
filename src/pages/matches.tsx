// src/pages/matches.tsx
import {
  Badge,
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { MatrimonyLoginValues } from "~/hooks/useForm";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { FormikHelpers } from "formik";
import { useUserAtom } from "~/lib/atom";
import useServerActions from "~/hooks/useServerActions";
import MatrimonyAuthModal from "~/components/authentication/MatrimonyAuthModal";
import MatrimonyApplicationWithdrawModal from "~/components/matrimony/MatrimonyApplicationWithdrawModal";
import MatrimonyProfilesView from "~/components/matrimony/MatrimonyProfilesView";
import MatrimonyRequestsTab from "~/components/matrimony/MatrimonyRequestsTab";
import type {
  MatrimonyProfilesFetchResponse,
  ProfileRequestsFetchResponse,
} from "~/types/api";
import type { SpousePreferences } from "~/types/forms/matrimony";

const ProfilePage = () => {
  const [{ user }] = useUserAtom();

  const {
    isOpen: isOpenWithdrawModal,
    onClose: onCloseWithdrawModal,
    onOpen: onOpenWithdrawModal,
  } = useDisclosure();

  const {
    handleMatrimonyLogin,
    handleMatrimonyProfilesFetch,
    handleMatrimonyIdFetch,
    handleFetchProfileRequests,
    handleFetchUserSubmission,
    handleMatrimonyRequestProfile,
  } = useServerActions();

  const handlersRef = useRef({
    handleMatrimonyProfilesFetch,
    handleFetchProfileRequests,
    handleFetchUserSubmission,
  });
  handlersRef.current = {
    handleMatrimonyProfilesFetch,
    handleFetchProfileRequests,
    handleFetchUserSubmission,
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [matrimonyID, setMatrimonyID] = useState<string>("");
  const [matrimonyProfiles, setMatrimonyProfiles] = useState<
    MatrimonyProfilesFetchResponse[]
  >([]);
  const [profilesRequested, setProfilesRequested] = useState<string[]>([]);
  const [profileRequestsData, setProfileRequestsData] = useState<
    ProfileRequestsFetchResponse[]
  >([]);
  const [userSpousePreferences, setUserSpousePreferences] =
    useState<SpousePreferences | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleFormSubmit = async (
    values: MatrimonyLoginValues,
    { setErrors }: FormikHelpers<MatrimonyLoginValues>
  ) => {
    setIsSubmitting(true);
    const { loggedIn, message } = await handleMatrimonyLogin(
      values.matrimony_id,
      user?.id ?? ""
    );
    if (!loggedIn) {
      setErrors({ matrimony_id: message });
      setIsSubmitting(false);
      return;
    }
    setMatrimonyID(values.matrimony_id);
    setIsSubmitting(false);
    setIsLoggedIn(true);
  };

  const fetchProfiles = useCallback(async () => {
    const data = await handlersRef.current.handleMatrimonyProfilesFetch();
    if (data.length > 0) setMatrimonyProfiles(data);
  }, []);

  const fetchProfileRequests = useCallback(async (email_id: string) => {
    const data =
      await handlersRef.current.handleFetchProfileRequests(email_id);
    if (data && data.length > 0) {
      setProfileRequestsData(data);
      const names = [...new Set(data.map((r) => r.requested_name))];
      setProfilesRequested(names);
    }
  }, []);

  const fetchOwnPreferences = useCallback(async (user_id: string) => {
    try {
      const own =
        await handlersRef.current.handleFetchUserSubmission(
          user_id,
          "MATRIMONY"
        );
      if (own?.submission?.spousePreferences) {
        setUserSpousePreferences(own.submission.spousePreferences);
      }
    } catch {
      // Non-critical — page still works without preferences
    }
  }, []);

  useEffect(() => {
    if (user && isLoggedIn) {
      void fetchProfiles();
      void fetchProfileRequests(user.email_id);
      void fetchOwnPreferences(user.id);
    }
  }, [isLoggedIn, user, fetchProfiles, fetchProfileRequests, fetchOwnPreferences]);

  const handleRequestSent = (fullName: string) => {
    setProfilesRequested((prev) =>
      prev.includes(fullName) ? prev : [...prev, fullName]
    );
    if (user?.email_id) {
      void fetchProfileRequests(user.email_id);
    }
  };

  return (
    <Flex h="100vh" w="full">
      <Flex gap={4} p={5} flexDir="column" w="full">
        {/* Top bar */}
        <Flex
          align="center"
          justify="space-between"
          flexWrap="wrap"
          gap={3}
        >
          <Box>
            <Text fontSize="2xl" fontWeight={700} color="#1F2937">
              Matrimony Profiles
            </Text>
            <Text fontSize="sm" color="gray.500">
              Browse and connect with compatible profiles
            </Text>
          </Box>
          <Button
            variant="outline"
            borderColor="red.300"
            color="red.500"
            size="sm"
            _hover={{ bg: "red.50" }}
            onClick={onOpenWithdrawModal}
          >
            Withdraw Application
          </Button>
        </Flex>

        {/* Tabs */}
        <Tabs
          index={activeTab}
          onChange={setActiveTab}
          colorScheme="orange"
          variant="line"
        >
          <TabList borderBottomColor="gray.200">
            <Tab
              fontWeight={600}
              _selected={{ color: "#FF4D00", borderColor: "#FF4D00" }}
            >
              Browse Profiles
            </Tab>
            <Tab
              fontWeight={600}
              _selected={{ color: "#FF4D00", borderColor: "#FF4D00" }}
            >
              My Requests
              {profileRequestsData.length > 0 && (
                <Badge
                  ml={2}
                  colorScheme="orange"
                  borderRadius="full"
                  fontSize="xs"
                >
                  {profileRequestsData.length}
                </Badge>
              )}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0} pt={5}>
              <MatrimonyProfilesView
                isLoggedIn={isLoggedIn}
                matrimonyProfiles={matrimonyProfiles}
                profileRequests={profilesRequested}
                user={user}
                matchPreferences={userSpousePreferences}
                matrimonyID={matrimonyID}
                handleMatrimonyIdFetch={handleMatrimonyIdFetch}
                handleMatrimonyRequestProfile={handleMatrimonyRequestProfile}
                onRequestSent={handleRequestSent}
              />
            </TabPanel>

            <TabPanel px={0} pt={5}>
              <MatrimonyRequestsTab requests={profileRequestsData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

      {/* Modals */}
      <MatrimonyApplicationWithdrawModal
        user_id={user?.id ?? ""}
        modalState={isOpenWithdrawModal}
        handleModal={onCloseWithdrawModal}
        name={user?.first_name ?? ""}
      />
      <MatrimonyAuthModal
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        modalState={!isLoggedIn}
        handleModal={() => undefined}
      />
    </Flex>
  );
};

export default ProfilePage;
