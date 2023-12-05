import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { userAtomBody } from "~/lib/atom";

interface AccountDisplayProps {
  user: userAtomBody | null;
}

const AccountDisplay: React.FC<AccountDisplayProps> = ({ user }) => {
  return (
    <Flex
      _hover={{ cursor: "pointer" }}
      align="center"
      color="gray.800"
      gap={3}
    >
      <Icon color="#FF4D00" boxSize={5} as={FaUserCircle} />
      <Text>{user.account_name}</Text>
    </Flex>
  );
};

export default AccountDisplay;
