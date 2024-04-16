import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BufferSearch from "~/components/admin/BufferSearch";
import DropDown from "~/components/admin/DropDown";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
import useServerActions from "~/hooks/useServerActions";
import AdminPageLayout from "~/layouts/AdminPageLayout";

import { useAdminAtom } from "~/lib/atom";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
  const [isLoadingMemBuf, setIsLoadingMemBuf] = useState<boolean>(false);

  const {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    membershipBufferData,
  } = useServerActions();
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
      <Flex w="full" mb={8}>
        <BufferSearch />
        <DropDown MenuItems={["Memberships", "Matrimony"]} />
      </Flex>
      {membershipBufferData && membershipBufferData.length > 0 ? (
        <MembershipBufferTable membershipBufferData={membershipBufferData} />
      ) : (
        <Spinner />
      )}
    </AdminPageLayout>
  );
};

export default AdminPage;
