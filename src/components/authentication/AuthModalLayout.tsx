import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface LoginModalProps {
  modalState: boolean;
  children: React.ReactNode;
  handleModal: () => void;
}

const AuthModalLayout: React.FC<LoginModalProps> = ({
  modalState,
  children,
  handleModal,
}) => {
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
