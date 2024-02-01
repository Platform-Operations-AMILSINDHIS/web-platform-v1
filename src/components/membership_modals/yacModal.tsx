import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface yacModalProps {
  modalState: boolean;
  handleModal: () => void;
}

const YacModal: React.FC<yacModalProps> = ({ handleModal, modalState }) => {
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>YAC Membership</ModalHeader>
        <ModalBody>Hi there, this is the YAC details here</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default YacModal;
