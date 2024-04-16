import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BufferSearch from "~/components/admin/BufferSearch";
import DropDown from "~/components/admin/DropDown";
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
  } = useServerActions();

  const [isLoadingMemBuf, setIsLoadingMemBuf] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("Memberships");

  useEffect(() => {
    handleMemberBufferFetch();
  }, []);

  useEffect(() => {
    if (membershipBufferData.length > 0) {
      setIsLoadingMemBuf(false);
    }
  }, [membershipBufferData]);

  console.log(membershipBufferData);
  return (
    <AdminPageLayout adminUsername={admin?.admin_username as string}>
      <Flex justify="space-between" align="center" w="full" mb={8}>
        <BufferSearch />
        <DropDown
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          MenuItems={["Memberships", "Matrimony"]}
        />
      </Flex>
      <Box>
        {membershipBufferData && membershipBufferData.length > 0 ? (
          <MembershipBufferTable membershipBufferData={membershipBufferData} />
        ) : (
          <Spinner />
        )}
      </Box>
    </AdminPageLayout>
  );
};

export default AdminPage;
