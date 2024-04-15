import { Box, Button } from "@chakra-ui/react";
import AdminPageLayout from "~/layouts/AdminPageLayout";
import useServerActions from "~/layouts/useServerActions";
import { useAdminAtom } from "~/lib/atom";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
  const { handleFetch } = useServerActions();
  return (
    <AdminPageLayout adminUsername={admin?.admin_username as string}>
      <Box>SMD</Box>
    </AdminPageLayout>
  );
};

export default AdminPage;
