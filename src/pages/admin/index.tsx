import { Box, Button, Checkbox, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BufferSearch from "~/components/admin/BufferSearch";
import DropDown from "~/components/admin/DropDown";
import MatrimonyBufferTable from "~/components/admin/MatrimonyBufferTable";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
import useServerActions from "~/hooks/useServerActions";
import AdminPageLayout from "~/layouts/AdminPageLayout";

import { useAdminAtom } from "~/lib/atom";

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

  const [isLoadingBuf, setIsLoadingBuf] = useState<boolean>(false);
  const [isLoadingMemBuf, setIsLoadingMemBuf] = useState<boolean>(false);
  const [isLoadingMatBuf, setIsLoadingMatBuf] = useState<boolean>(false);
  const [showApprovedMatProfiles, setShowApprovedMatProfiles] =
    useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("Memberships");

  const handleBufferFetch = async () => {
    const allBufferData = await handleFetchFormBufferData();
    const allMemBufferData = await handleMemberBufferFetch();
    const allMatBufferData = await handleMatrimonyBufferFetch();
    console.log({ allBufferData, allMatBufferData, allMemBufferData });
  };

  useEffect(() => {
    async function f() {
      await handleBufferFetch();
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
