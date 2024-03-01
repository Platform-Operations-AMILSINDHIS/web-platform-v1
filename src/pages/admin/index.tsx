import { Box } from "@chakra-ui/react";
import { useAdminAtom } from "~/lib/atom";

const AdminPage = () => {
  const [{ admin }] = useAdminAtom();
  console.log(admin);
  return <Box>hello {admin?.admin_username} page here</Box>;
};

export default AdminPage;
