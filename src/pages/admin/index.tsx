import { Box, Button, Checkbox, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BufferSearch from "~/components/admin/BufferSearch";
import DropDown from "~/components/admin/DropDown";
import MatrimonyBufferTable from "~/components/admin/MatrimonyBufferTable";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
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
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    handleFetchFormBufferData,
    handleFetchProfileRequests,
  } = useServerActions();

  const [formBufferData, setFormBufferData] = useState<FormBufferDataType[]>(
    []
  );
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
  const [showApprovedMatProfiles, setShowApprovedMatProfiles] =
    useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("Memberships");

  const handleFetch = async () => {
    const allBufferData = await handleFetchFormBufferData();
    const allMemBufferData = await handleMemberBufferFetch();
    const allMatBufferData = await handleMatrimonyBufferFetch();
    const allProfileRequestsData = await handleFetchProfileRequests();
    setFormBufferData(allBufferData);
    setMatrimonyBufferData(allMatBufferData);
    setMembershipBufferData(allMemBufferData);
    setProfileRequestsData(allProfileRequestsData);
    console.log({
      allBufferData,
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

  const handleCheckBoxChange = () => {
    setShowApprovedMatProfiles(!showApprovedMatProfiles);
    console.log({ showApprovedMatProfiles });
  };

  return (
    <AdminPageLayout adminUsername={admin?.admin_username ?? ""}>
      <Flex justify="space-between" align="center" w="full" mb={8}>
        <BufferSearch />
        <Flex alignItems="center" gap={3}>
          <DropDown
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            MenuItems={["Memberships", "Matrimony"]}
          />
          {isSelected === "Matrimony" ? (
            <Checkbox onChange={handleCheckBoxChange} fontWeight={500}>
              Approved Profiles
            </Checkbox>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
      {isSelected === "Memberships" ? (
        <Box>
          {isLoadingMemBuf ? (
            <Spinner />
          ) : (
            <MembershipBufferTable
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
              showApproved={showApprovedMatProfiles}
              matrimonyBufferData={matrimonyBufferData}
            />
          )}
        </Box>
      )}
    </AdminPageLayout>
  );
};

export default AdminPage;
