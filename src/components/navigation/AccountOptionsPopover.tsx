import { MdOutlinePassword, MdOutlineLogout } from "react-icons/md";
import { PiFilesFill } from "react-icons/pi";
import { FaTrash } from "react-icons/fa6";
import { useUserAtom } from "~/lib/atom";
import axios from "axios";
import {
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import useRecovery from "~/hooks/UseRecovery";
import DeleteModal from "../authentication/DeleteModal";

interface AccountOptionsPopoverProps {
  children: React.ReactNode;
}

const AccountOptionsPopover: React.FC<AccountOptionsPopoverProps> = ({
  children,
}) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const toast = useToast();
  const { handleSendRecoveryURL } = useRecovery();

  const [{ user }, setUser] = useUserAtom();

  const [sendingResetURL, setSendingResetURL] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post<{
        responseFlag: number;
        errorMessage: string;
      }>("/api/auth/logout");
      if (response.data.responseFlag === 1) {
        setUser({ user: null });
      } else {
        console.log("Logout failed", response.data.errorMessage);
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const handleResetPassword = async () => {
    setSendingResetURL(true);
    toast({
      title: "Sending URL to email ID",
      description: "Please wait...",
      status: "info",
    });

    try {
      const { message, toastType } = await handleSendRecoveryURL(
        user?.email_id ?? ""
      );

      // Hide loading toast and show result toast
      toast({
        title: message,
        status: (toastType as "success") || "error",
        duration: 5000, // Optional: Set toast duration (5 seconds)
      });
    } catch (error) {
      console.error("Error sending reset password URL:", error);

      // Hide loading toast and show error toast
      toast({
        title: "Error Sending Reset URL",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 5000, // Optional: Set toast duration (5 seconds)
      });
    } finally {
      setSendingResetURL(false);
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
              handleLogout={() => void handleLogout()}
              handleModal={onClose}
              modalState={isOpen}
            />
            <Flex
              _hover={{ color: "gray.800", cursor: "pointer" }}
              gap={2}
              align="center"
              onClick={handleResetPassword}
            >
              <Icon boxSize={4} as={MdOutlinePassword}></Icon>
              <Text>Reset Password</Text>
            </Flex>
            <Flex
              _hover={{ color: "gray.800", cursor: "pointer" }}
              gap={2}
              align="center"
              onClick={() => (window.location.href = "/matches")}
            >
              <Icon boxSize={4} as={PiFilesFill}></Icon>
              <Text>Matrimony Profiles</Text>
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

export default AccountOptionsPopover;
