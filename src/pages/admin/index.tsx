"use-client";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BufferSearch from "~/components/admin/BufferSearch";
import DropDown from "~/components/admin/DropDown";
import AdminHelpDrawer from "~/components/admin/AdminHelpDrawer";
import MatrimonyBufferTable from "~/components/admin/MatrimonyBufferTable";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
import ProfileRequestsViewModal from "~/components/admin/ProfileRequestsViewModal";
import useRealTime from "~/hooks/useRealTime";
import useServerActions from "~/hooks/useServerActions";
import AdminPageLayout from "~/layouts/AdminPageLayout";

import { useAdminAtom } from "~/lib/atom";
import { ProfileRequestsDataType } from "~/types/requests";

import {
  MatrimonyBufferDataType,
  MembershipBufferDataType,
} from "~/types/tables/dataBuffer";

interface LabeledDropDownProps {
  label: string;
  isSelected: string;
  setIsSelected: (v: string) => void;
  menuItems: string[];
}

const LabeledDropDown: React.FC<LabeledDropDownProps> = ({ label, isSelected, setIsSelected, menuItems }) => (
  <Flex flexDir="column" gap={1}>
    <Text fontSize="10px" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wider" px={0.5}>
      {label}
    </Text>
    <DropDown isSelected={isSelected} setIsSelected={setIsSelected} MenuItems={menuItems} />
  </Flex>
);

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
    handleFetchAllProfileRequestsAdmin,
  } = useServerActions();

  const [membershipBufferData, setMembershipBufferData] = useState<MembershipBufferDataType[]>([]);
  const [matrimonyBufferData, setMatrimonyBufferData] = useState<MatrimonyBufferDataType[]>([]);
  const [profileRequestsData, setProfileRequestsData] = useState<ProfileRequestsDataType[]>([]);

  const [isLoadingMemBuf, setIsLoadingMemBuf] = useState<boolean>(false);
  const [isLoadingMatBuf, setIsLoadingMatBuf] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusType, setStatusType] = useState<string>("All");
  const [membershipType, setMembershipType] = useState<string>("All members");
  const [isSelected, setIsSelected] = useState<string>("Memberships");
  const [applicantType, setapplicantType] = useState<string>("All applicants");

  const handleFetch = async () => {
    const allMemBufferData = await handleMemberBufferFetch();
    const allMatBufferData = await handleMatrimonyBufferFetch();
    const allProfileRequestsData = await handleFetchAllProfileRequestsAdmin();
    setMatrimonyBufferData(allMatBufferData);
    setMembershipBufferData(allMemBufferData);
    setProfileRequestsData(allProfileRequestsData);
  };

  const handleRealTimeMemAndMatDataFetch = async () => {
    const allMemBufferData = await handleMemberBufferFetch();
    setMembershipBufferData(allMemBufferData);
  };

  const handleRealTimeProfileDataFetch = async () => {
    const allProfileRequestsData = await handleFetchAllProfileRequestsAdmin();
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
    setIsLoadingMemBuf(!(membershipBufferData && membershipBufferData.length > 0));
  }, [membershipBufferData]);

  useEffect(() => {
    setIsLoadingMatBuf(!(matrimonyBufferData && matrimonyBufferData.length > 0));
  }, [matrimonyBufferData]);

  return (
    <AdminPageLayout handleAdminLogout={handleAdminLogout} admin={admin}>
      {/* Toolbar */}
      <Box
        bg="white"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.100"
        boxShadow="sm"
        px={5}
        py={4}
        mb={6}
      >
        {/* Row 1: Search + primary controls */}
        <Flex justify="space-between" align="flex-end" gap={4} flexWrap="wrap">
          <Box flex={1} minW="240px" maxW="380px">
            <Text fontSize="10px" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wider" mb={1} px={0.5}>
              Search
            </Text>
            <BufferSearch setSearchTerm={setSearchTerm} />
          </Box>

          <Flex align="flex-end" gap={3} flexWrap="wrap">
            {/* Profile Requests button with badge */}
            <Flex flexDir="column" gap={1}>
              <Text fontSize="10px" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wider" px={0.5}>
                Requests
              </Text>
              <Button
                onClick={onOpenProfileRequestsModal}
                size="md"
                fontSize="sm"
                variant="outline"
                borderColor="gray.200"
                color="gray.700"
                _hover={{ borderColor: "#FF4D00", color: "#FF4D00" }}
                transition="all 0.15s"
                rightIcon={
                  <Badge
                    colorScheme={profileRequestsData.length > 0 ? "orange" : "gray"}
                    borderRadius="full"
                    fontSize="xs"
                    px={1.5}
                  >
                    {profileRequestsData.length}
                  </Badge>
                }
              >
                Profile Requests
              </Button>
            </Flex>

            <Divider orientation="vertical" h="52px" borderColor="gray.200" />

            <LabeledDropDown
              label="View"
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              menuItems={["Memberships", "Matrimony"]}
            />
            <LabeledDropDown
              label="Status"
              isSelected={statusType}
              setIsSelected={setStatusType}
              menuItems={["All", "Approved", "Pending"]}
            />
          </Flex>
        </Flex>

        {/* Row 2: Member-specific filters (only when Memberships is selected) */}
        {isSelected === "Memberships" && (
          <>
            <Divider my={3} borderColor="gray.100" />
            <Flex align="flex-end" gap={3} flexWrap="wrap">
              <Text fontSize="xs" color="gray.400" fontWeight="medium" pb={2} mr={1}>
                Member filters:
              </Text>
              <LabeledDropDown
                label="Applicant Type"
                isSelected={applicantType}
                setIsSelected={setapplicantType}
                menuItems={["All applicants", "New applicants", "Current Members"]}
              />
              <LabeledDropDown
                label="Membership"
                isSelected={membershipType}
                setIsSelected={setMembershipType}
                menuItems={["All members", "KAP members", "YAC members"]}
              />
            </Flex>
          </>
        )}
      </Box>

      {/* Table area */}
      {isSelected === "Memberships" ? (
        <Box>
          {isLoadingMemBuf ? (
            <Flex gap={3} align="center" py={10} justify="center">
              <Spinner color="#FF4D00" boxSize={5} />
              <Text color="gray.500" fontSize="sm">Loading membership applications…</Text>
            </Flex>
          ) : (
            <MembershipBufferTable
              membershipType={membershipType}
              applicantType={applicantType}
              searchTerm={searchTerm}
              filterState={statusType}
              membershipBufferData={membershipBufferData}
            />
          )}
        </Box>
      ) : (
        <Box>
          {isLoadingMatBuf ? (
            <Flex gap={3} align="center" py={10} justify="center">
              <Spinner color="#FF4D00" boxSize={5} />
              <Text color="gray.500" fontSize="sm">Loading matrimony applications…</Text>
            </Flex>
          ) : (
            <MatrimonyBufferTable
              searchTerm={searchTerm}
              filterState={statusType}
              matrimonyBufferData={matrimonyBufferData}
            />
          )}
        </Box>
      )}

      <ProfileRequestsViewModal
        matrimonyProfileRequests={profileRequestsData}
        handleModal={onCloseProfileRequestsModal}
        modalState={isProfileRequestsModalOpen}
      />

      <AdminHelpDrawer />
    </AdminPageLayout>
  );
};

export default AdminPage;
