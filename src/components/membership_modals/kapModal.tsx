import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface kapModalProps {
  modalState: boolean;
  handleModal: () => void;
}

const KapModal: React.FC<kapModalProps> = ({ modalState, handleModal }) => {
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>KAP Membership</ModalHeader>
        <ModalBody>Hi there, this is the KAP details here</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KapModal;
