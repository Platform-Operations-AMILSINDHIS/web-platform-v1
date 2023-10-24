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
  handleModal: () => void;
}

const AuthModal: React.FC<LoginModalProps> = ({ modalState, handleModal }) => {
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>hi</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
