import { Box } from "@chakra-ui/react";
import AdminPageLayout from "~/layouts/AdminPageLayout";
import { useAdminAtom } from "~/lib/atom";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
  return (
    <AdminPageLayout adminUsername={admin?.admin_username as string}>
      <Box>SMD</Box>
    </AdminPageLayout>
  );
};

export default AdminPage;
