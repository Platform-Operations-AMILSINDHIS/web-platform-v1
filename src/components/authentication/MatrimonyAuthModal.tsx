import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import MatrimonyLogin from "./MatrimonyLogin";

interface MatrimonyAuthModalProps {
  modalState: boolean;
  handleModal: () => void;
}

const MatrimonyAuthModal: React.FC<MatrimonyAuthModalProps> = ({
  modalState,
  handleModal,
}) => {
  const [closeModal] = useState(false);
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
          <MatrimonyLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MatrimonyAuthModal;
