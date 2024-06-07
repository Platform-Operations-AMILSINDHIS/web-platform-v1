import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import type { userAtomBody } from "~/types/atoms/users";
import AccountOptionsPopover from "./AccountOptionsPopover";

interface AccountDisplayProps {
  user: userAtomBody | null;
}

const AccountDisplay: React.FC<AccountDisplayProps> = ({ user }) => {
  return (
    <Flex align="center" color="gray.800" gap={3}>
      <Icon color="#FF4D00" boxSize={5} as={FaUserCircle} />
      <AccountOptionsPopover>
        <Text
          transition="all 0.3s"
          _hover={{ cursor: "pointer", color: "#FF4D00" }}
        >
          {user?.account_name}
        </Text>
      </AccountOptionsPopover>
    </Flex>
  );
};

export default AccountDisplay;
