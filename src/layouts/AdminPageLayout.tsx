import { WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import AddAdminModal from "~/components/admin/AddAdminModal";
import { adminAtomBody } from "~/types/atoms/admin";

interface AdminPageLayoutProps {
  children: React.ReactNode;
  admin: adminAtomBody | null;
  handleAdminLogout: () => void;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  admin,
  handleAdminLogout,
}) => {
  const {
    isOpen: isAdminAddOpen,
    onOpen: onAdminAddOpen,
    onClose: onAdminAddClose,
  } = useDisclosure();

  return (
    <Flex justify="center" h="100vh" w="full">
      <AddAdminModal
        handleModal={onAdminAddClose}
        modalState={isAdminAddOpen}
      />
      {admin !== null ? (
        <Flex minW={1200} gap={5} p={5} flexDir="column">
          <Flex justify="space-between" align="center" w="full">
            <Text fontWeight={600} fontSize="xx-large">
              Hey there,{" "}
              <span
                style={{
                  color: "#FF4D00",
                }}
              >
                {admin?.admin_username ?? ""}
              </span>
            </Text>
            <Flex flexDir="row" gap={3}>
              <Button
                onClick={handleAdminLogout}
                color="white"
                bg="#FF4D00"
                variant="none"
              >
                {" "}
                Sign out
              </Button>
              <Button
                onClick={onAdminAddOpen}
                color="#00162B"
                bg="white"
                border="1px solid"
                variant="none"
                _hover={{ color: "white", bg: "#00162B" }}
              >
                {" "}
                Add Admin
              </Button>
            </Flex>
          </Flex>
          <Box mt={3}>{children}</Box>
        </Flex>
      ) : (
        <Flex w="full" h="100vh" justify="center" align="center">
          <Flex align="center" gap={3} w={550} flexDir="column">
            <Flex align="center" flexDir="column" gap={2}>
              <Icon boxSize={5} color="red" as={WarningIcon} />
              <Text fontSize="2xl" fontWeight={700}>
                Unauthorized page access
              </Text>
            </Flex>
            <Text w={500} textAlign="center" fontWeight={400}>
              You have gained unauthorized access to this page please contact
              the site admin or login with a verified admin account
            </Text>
            <Flex gap={2} flexDir="row">
              <Button
                onClick={() => (window.location.href = "/admin/auth")}
                _hover={{ bg: "#FF2D00" }}
                bg="#FF4D00"
                color="white"
              >
                Admin login
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                _hover={{ bg: "green.500" }}
                bg="black"
                color="white"
              >
                Return to home
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default AdminPageLayout;
