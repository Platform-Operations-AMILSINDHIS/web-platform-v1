import { Box, Text, useDisclosure } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";

interface UserBlockModalProps {
  modalState: boolean;
  handleModal: () => void;
}

const UserBlockModal: React.FC<UserBlockModalProps> = ({
  handleModal,
  modalState,
}) => {
  return (
    <Box bg="red" h={100} w={100}>
      <Text>hi</Text>
    </Box>
  );
};

export default UserBlockModal;
