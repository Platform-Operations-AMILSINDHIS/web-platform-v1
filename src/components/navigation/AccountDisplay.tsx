import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePassword, MdOutlineLogout } from "react-icons/md";
import { userAtomBody } from "~/lib/atom";

interface AccountDisplayProps {
  user: userAtomBody | null;
}

const AccountOptionsPopover: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Account Options</PopoverHeader>
        <PopoverBody className="shadow-xl" color="gray.600">
          <Flex gap={2} flexDir="column">
            <Flex
              _hover={{ color: "gray.800", cursor: "pointer" }}
              gap={2}
              align="center"
            >
              <Icon boxSize={4} as={IoMdSettings}></Icon>
              <Text>Settings</Text>
            </Flex>
            <Flex
              _hover={{ color: "gray.800", cursor: "pointer" }}
              gap={2}
              align="center"
            >
              <Icon boxSize={4} as={MdOutlinePassword}></Icon>
              <Text>Send Password Recovery</Text>
            </Flex>
            <Flex
              _hover={{ color: "gray.800", cursor: "pointer" }}
              gap={2}
              align="center"
            >
              <Icon boxSize={4} as={MdOutlineLogout}></Icon>
              <Text>Sign Out</Text>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

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
