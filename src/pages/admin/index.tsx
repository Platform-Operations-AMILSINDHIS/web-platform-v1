import { Button } from "@chakra-ui/react";
import MembershipBufferTable from "~/components/admin/MembershipBufferTable";
import AdminPageLayout from "~/layouts/AdminPageLayout";
import useServerActions from "~/layouts/useServerActions";
import { useAdminAtom } from "~/lib/atom";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
  const {
    handleMemberBufferFetch,
    handleMatrimonyBufferFetch,
    isLoadingMemBuf,
  } = useServerActions();
  return (
    <AdminPageLayout adminUsername={admin?.admin_username as string}>
      <Button isLoading={isLoadingMemBuf} onClick={handleMemberBufferFetch}>
        Click
      </Button>
      <MembershipBufferTable />
    </AdminPageLayout>
  );
};

export default AdminPage;
