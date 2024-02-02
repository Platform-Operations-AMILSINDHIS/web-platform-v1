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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePassword, MdOutlineLogout } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { useUserAtom, userAtomBody } from "~/lib/atom";
import DeleteModal from "../authentication/DeleteModal";

interface AccountDisplayProps {
  user: userAtomBody | null;
}

const AccountOptionsPopover: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [, setUser] = useUserAtom();
  const handleLogout = async () => {
    try {
      const response = await axios.post<{
        responseFlag: number;
        errorMessage: string;
      }>("/api/auth/logout");
      if (response.data.responseFlag === 1) {
        window.location.href = "/";
        setUser({ user: null });
      } else {
        console.log("Logout failed", response.data.errorMessage);
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

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
              color="red.400"
              _hover={{ color: "red.500", cursor: "pointer" }}
              gap={2}
              align="center"
              onClick={() => onOpen()}
            >
              <Icon boxSize={4} as={FaTrash}></Icon>
              <Text>Delete Account</Text>
            </Flex>
            <DeleteModal
              handleLogout={handleLogout}
              handleModal={onClose}
              modalState={isOpen}
            />
            <Flex
              _hover={{ color: "gray.800", cursor: "pointer" }}
              gap={2}
              align="center"
              onClick={() => (window.location.href = "/recovery")}
            >
              <Icon boxSize={4} as={MdOutlinePassword}></Icon>
              <Text>Reset Password</Text>
            </Flex>
            <Flex
              _hover={{ color: "gray.800", cursor: "pointer" }}
              gap={2}
              align="center"
            >
              <Icon boxSize={4} as={MdOutlineLogout}></Icon>
              <Text onClick={() => void handleLogout()}>Sign Out</Text>
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
