import { Box, Flex } from "@chakra-ui/react";
import Admin from "~/components/authentication/Admin";

const AdminAuthPage = () => {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Box
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
        border="1px solid"
        borderRadius={5}
        borderColor="gray.200"
        w={500}
      >
        <Admin />
      </Box>
    </Flex>
  );
};

export default AdminAuthPage;
