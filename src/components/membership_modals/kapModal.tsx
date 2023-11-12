import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface kapModalProps {
  modalState: boolean;
  displayState: boolean;
  handleModal: () => void;
}

const kapModal: React.FC<kapModalProps> = ({
  displayState,
  modalState,
  handleModal,
}) => {
  return (
    <Modal onClose={handleModal} isOpen={displayState}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>KAP Membership</ModalHeader>
        <ModalBody>Hi there, this is the KAP details here</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default kapModal;
