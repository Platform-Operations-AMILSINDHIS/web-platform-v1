import {
  Box,
  Button,
  Checkbox,
  Circle,
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
import useServerActions from "~/hooks/useServerActions";
import AdminPageLayout from "~/layouts/AdminPageLayout";

import { useAdminAtom } from "~/lib/atom";
import { ProfileRequestsDataType } from "~/types/requests";

import {
  FormBufferDataType,
  MatrimonyBufferDataType,
  MembershipBufferDataType,
} from "~/types/tables/dataBuffer";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
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
    console.log({
      allMatBufferData,
      allMemBufferData,
      allProfileRequestsData,
    });
  };

  useEffect(() => {
    async function f() {
      await handleFetch();
    }

    f().catch(console.error);
  }, []);

  useEffect(() => {
    setIsLoadingMemBuf(true);
    if (membershipBufferData && membershipBufferData.length > 0) {
      setIsLoadingMemBuf(false);
    } else {
      setIsLoadingMemBuf(false);
    }
  }, [membershipBufferData]);

  useEffect(() => {
    setIsLoadingMatBuf(true);
    if (matrimonyBufferData && matrimonyBufferData.length > 0) {
      setIsLoadingMatBuf(false);
    } else {
      setIsLoadingMatBuf(false);
    }
  }, [matrimonyBufferData]);

  return (
    <AdminPageLayout adminUsername={admin?.admin_username ?? ""}>
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
            <Spinner />
          ) : (
            <MembershipBufferTable
              searchTerm={searchTerm}
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
