import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface AdminPageLayoutProps {
  children: React.ReactNode;
  adminUsername: string | undefined;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  adminUsername,
}) => {
  return (
    <Flex justify="center" h="100vh" w="full">
      <Flex minW={1200} gap={5} p={5} flexDir="column">
        <Flex justify="space-between" align="center" w="full">
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
          <Flex gap={3}>
            <Button color="white" bg="#FF4D00" variant="none">
              {" "}
              Manage Access
            </Button>
            <Button color="#FF4D00" variant="none">
              {" "}
              Sign Out
            </Button>
          </Flex>
        </Flex>
        <Box mt={3}>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default AdminPageLayout;
