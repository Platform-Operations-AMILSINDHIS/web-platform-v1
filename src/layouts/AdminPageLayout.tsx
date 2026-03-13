import { WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
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
    <Flex justify="center" minH="100vh" w="full" bg="gray.50">
      <AddAdminModal handleModal={onAdminAddClose} modalState={isAdminAddOpen} />
      {admin !== null ? (
        <Flex w="full" maxW="1400px" gap={0} px={6} py={0} flexDir="column">
          {/* Top nav bar */}
          <Flex
            justify="space-between"
            align="center"
            w="full"
            py={4}
            mb={2}
          >
            <Flex flexDir="column" gap={0.5}>
              <Text fontSize="xs" color="gray.400" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
                Admin Dashboard
              </Text>
              <Text fontWeight={700} fontSize="2xl" lineHeight="shorter" color="gray.800">
                Hey,{" "}
                <Text as="span" color="#FF4D00">
                  {admin?.admin_username ?? ""}
                </Text>
              </Text>
            </Flex>

            <Flex flexDir="row" gap={2} align="center">
              <Button
                onClick={onAdminAddOpen}
                size="sm"
                variant="outline"
                borderColor="gray.200"
                color="gray.700"
                fontWeight="medium"
                _hover={{ borderColor: "#00162B", bg: "#00162B", color: "white" }}
                transition="all 0.15s"
              >
                Add Admin
              </Button>
              <Button
                onClick={handleAdminLogout}
                size="sm"
                bg="#FF4D00"
                color="white"
                fontWeight="medium"
                _hover={{ bg: "#E03A00" }}
                transition="all 0.15s"
              >
                Sign out
              </Button>
            </Flex>
          </Flex>

          <Divider borderColor="gray.200" mb={5} />

          <Box pb={10}>{children}</Box>
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
              You have gained unauthorized access to this page. Please contact
              the site admin or login with a verified admin account.
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
                _hover={{ bg: "gray.800" }}
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
