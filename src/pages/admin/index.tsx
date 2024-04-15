import { Box, Button } from "@chakra-ui/react";
import AdminPageLayout from "~/layouts/AdminPageLayout";
import useServerActions from "~/layouts/useServerActions";
import { useAdminAtom } from "~/lib/atom";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
  const { handleMemberBufferFetch, handleMatrimonyBufferFetch } =
    useServerActions();
  return (
    <AdminPageLayout adminUsername={admin?.admin_username as string}>
      <Box>SMD</Box>
      <Button onClick={handleMemberBufferFetch}>Hi</Button>
      <Button onClick={handleMatrimonyBufferFetch}>The</Button>
    </AdminPageLayout>
  );
};

export default AdminPage;
