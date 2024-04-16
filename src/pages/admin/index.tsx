import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
import AdminPageLayout from "~/layouts/AdminPageLayout";
import useServerActions from "~/layouts/useServerActions";
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
      {membershipBufferData && membershipBufferData.length > 0 ? (
        <MembershipBufferTable membershipBufferData={membershipBufferData} />
      ) : (
        <Spinner />
      )}
    </AdminPageLayout>
  );
};

export default AdminPage;
