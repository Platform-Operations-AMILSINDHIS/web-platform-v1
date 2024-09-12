"use-client";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BufferSearch from "~/components/admin/BufferSearch";
import DropDown from "~/components/admin/DropDown";
import MatrimonyBufferTable from "~/components/admin/MatrimonyBufferTable";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
import ProfileRequestsViewModal from "~/components/admin/ProfileRequestsViewModal";
import { btnThemeLight } from "~/components/buttons/BtnThemes";
import useRealTime from "~/hooks/useRealTime";
import useServerActions from "~/hooks/useServerActions";
import AdminPageLayout from "~/layouts/AdminPageLayout";

import { useAdminAtom } from "~/lib/atom";
import { ProfileRequestsDataType } from "~/types/requests";

import {
  MatrimonyBufferDataType,
  MembershipBufferDataType,
} from "~/types/tables/dataBuffer";

const AdminPage = () => {
  const [{ admin }, setAdminAtom] = useAdminAtom();
  const {
    isOpen: isProfileRequestsModalOpen,
    onOpen: onOpenProfileRequestsModal,
    onClose: onCloseProfileRequestsModal,
  } = useDisclosure();
  const {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    handleFetchProfileRequests,
  } = useServerActions();

  const [membershipBufferData, setMembershipBufferData] = useState<
    MembershipBufferDataType[]
  >([]);
  const [matrimonyBufferData, setMatrimonyBufferData] = useState<
    MatrimonyBufferDataType[]
  >([]);
  const [profileRequestsData, setProfileRequestsData] = useState<
    ProfileRequestsDataType[]
  >([]);

  const [isLoadingMemBuf, setIsLoadingMemBuf] = useState<boolean>(false);
  const [isLoadingMatBuf, setIsLoadingMatBuf] = useState<boolean>(false);

  const [isSelected, setIsSelected] = useState<string>("Memberships");
  const [statusType, setStatusType] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleFetch = async () => {
    const allMemBufferData = await handleMemberBufferFetch();
    const allMatBufferData = await handleMatrimonyBufferFetch();
    const allProfileRequestsData = await handleFetchProfileRequests();
    setMatrimonyBufferData(allMatBufferData);
    setMembershipBufferData(allMemBufferData);
    setProfileRequestsData(allProfileRequestsData);
  };

  // seperated calls for real time reaction to changes made to specific tables
  // please refactor and optimize code below for later stages
  const handleRealTimeMemAndMatDataFetch = async () => {
    const allMemBufferData = await handleMemberBufferFetch();
    setMembershipBufferData(allMemBufferData);
  };

  const handleRealTimeProfileDataFetch = async () => {
    const allProfileRequestsData = await handleFetchProfileRequests();
    setProfileRequestsData(allProfileRequestsData);
  };

  useRealTime(handleRealTimeMemAndMatDataFetch, "form_buffer");
  useRealTime(handleRealTimeProfileDataFetch, "profile_requests");

  const handleAdminLogout = () => {
    setAdminAtom({ admin: null });
    window.location.href = "/";
  };

  useEffect(() => {
    async function f() {
      await handleFetch();
    }

    f().catch(console.error);
  }, []);

  useEffect(() => {
    if (membershipBufferData && membershipBufferData.length > 0) {
      setIsLoadingMemBuf(false);
    } else {
      setIsLoadingMemBuf(true);
    }
  }, [membershipBufferData]);

  useEffect(() => {
    if (matrimonyBufferData && matrimonyBufferData.length > 0) {
      setIsLoadingMatBuf(false);
    } else {
      setIsLoadingMatBuf(true);
    }
  }, [matrimonyBufferData]);

  return (
    <AdminPageLayout handleAdminLogout={handleAdminLogout} admin={admin}>
      <Flex justify="space-between" align="center" w="full" mb={8}>
        <BufferSearch setSearchTerm={setSearchTerm} />
        <Flex alignItems="center" gap={3}>
          <Box position="relative">
            <Box
              fontSize="small"
              borderRadius={5}
              p={1}
              px={2}
              color="white"
              fontWeight={600}
              top={-3}
              left={-2}
              bg="#FF4D00"
              position="absolute"
              zIndex={1}
            >
              {profileRequestsData.length}
            </Box>
            <Button
              onClick={onOpenProfileRequestsModal}
              style={btnThemeLight}
              size="md"
              fontSize="small"
            >
              Profile Requests
            </Button>
            <ProfileRequestsViewModal
              matrimonyProfileRequests={profileRequestsData}
              handleModal={onCloseProfileRequestsModal}
              modalState={isProfileRequestsModalOpen}
            />
          </Box>
          <DropDown
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            MenuItems={["Matrimony", "Memberships"]}
          />
          <DropDown
            isSelected={statusType}
            setIsSelected={setStatusType}
            MenuItems={["Approved", "Pending", "All"]}
          />
        </Flex>
      </Flex>
      {isSelected === "Memberships" ? (
        <Box>
          {isLoadingMemBuf ? (
            <Flex gap={2} align="center">
              <Spinner color="#FF4D00" boxSize={4} />
              <Text>Fetching Data...</Text>
            </Flex>
          ) : (
            <MembershipBufferTable
              searchTerm={searchTerm}
              filterState={statusType}
              membershipBufferData={membershipBufferData}
            />
          )}
        </Box>
      ) : (
        <Box>
          {isLoadingMatBuf ? (
            <Spinner />
          ) : (
            <MatrimonyBufferTable
              searchTerm={searchTerm}
              filterState={statusType}
              matrimonyBufferData={matrimonyBufferData}
            />
          )}
        </Box>
      )}
    </AdminPageLayout>
  );
};

export default AdminPage;
