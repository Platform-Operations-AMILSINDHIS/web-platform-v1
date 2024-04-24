import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BufferSearch from "~/components/admin/BufferSearch";
import DropDown from "~/components/admin/DropDown";
import MatrimonyBufferTable from "~/components/admin/MatrimonyBufferTable";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
import useServerActions from "~/hooks/useServerActions";
import AdminPageLayout from "~/layouts/AdminPageLayout";

import { useAdminAtom } from "~/lib/atom";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
  const {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    membershipBufferData,
    matrimonyBufferData,
  } = useServerActions();

  const [isLoadingMemBuf, setIsLoadingMemBuf] = useState<boolean>(false);
  const [isLoadingMatBuf, setIsLoadingMatBuf] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("Memberships");

  useEffect(() => {
    async function f() {
      await handleMemberBufferFetch();
      await handleMatrimonyBufferFetch();
    }

    f().catch(console.error);
  }, []);

  useEffect(() => {
    if (membershipBufferData && membershipBufferData.length > 0) {
      setIsLoadingMemBuf(false);
    }
  }, [membershipBufferData]);

  useEffect(() => {
    if (matrimonyBufferData && matrimonyBufferData.length > 0) {
      setIsLoadingMatBuf(false);
    }
  }, [matrimonyBufferData]);

  console.log(membershipBufferData);
  return (
    <AdminPageLayout adminUsername={admin?.admin_username ?? ""}>
      <Flex justify="space-between" align="center" w="full" mb={8}>
        <BufferSearch />
        <DropDown
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          MenuItems={["Memberships", "Matrimony"]}
        />
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
            <MatrimonyBufferTable matrimonyBufferData={matrimonyBufferData} />
          )}
        </Box>
      )}
    </AdminPageLayout>
  );
};

export default AdminPage;
