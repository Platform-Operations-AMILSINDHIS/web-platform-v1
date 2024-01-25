import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

interface AuthModalProps {
  modalState: boolean;
  displayState: boolean;
  handleModal: () => void;
  displayFunction: (state: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  modalState,
  handleModal,
  displayState,
  displayFunction,
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
            <Login
              displayFunction={displayFunction}
              setCloseModal={setCloseModal}
            />
          ) : (
            <Signup
              displayFunction={displayFunction}
              setCloseModal={setCloseModal}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
