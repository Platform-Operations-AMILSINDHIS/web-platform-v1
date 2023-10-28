import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";

interface AuthModalProps {
  modalState: boolean;
  displayState: boolean;
  handleModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  modalState,
  handleModal,
  displayState,
}) => {
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{displayState ? <Login /> : <Signup />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
