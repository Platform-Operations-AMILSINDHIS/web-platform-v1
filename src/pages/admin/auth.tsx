import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillLock } from "react-icons/ai";

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
        <Flex py={4} px={5} gap={6} flexDir="column">
          <Flex gap={2} align="center" w="full">
            <Icon color="#FF4D00" boxSize={6} as={AiFillLock} />
            <Text fontWeight={700} fontSize="20px">
              Admin Login
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AdminAuthPage;
