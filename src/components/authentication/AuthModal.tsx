import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  const [closeModal, setCloseModal] = useState(false);
  useEffect(() => {
    if (closeModal) {
      handleModal();
    }
  }, [closeModal]);
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          {displayState ? (
            <Login setCloseModal={setCloseModal} />
          ) : (
            <Signup setCloseModal={setCloseModal} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
