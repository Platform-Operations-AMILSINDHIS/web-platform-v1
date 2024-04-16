import { Box, Flex, Text } from "@chakra-ui/react";
import SideBarNav from "~/components/admin/SideBarNav";

interface AdminPageLayoutProps {
  children: React.ReactNode;
  adminUsername: string | undefined;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  adminUsername,
}) => {
  return (
    <Flex h="100vh" w="full">
      <Flex p={5} flexDir="column">
        <Text fontWeight={600} fontSize="xx-large">
          Hey there,{" "}
          <span
            style={{
              color: "#FF4D00",
            }}
          >
            {adminUsername ?? ""}
          </span>
        </Text>
        <Box>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default AdminPageLayout;
