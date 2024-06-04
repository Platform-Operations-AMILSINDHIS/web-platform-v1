import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ModalLayoutProps {
  modalState: boolean;
  modalHeader?: string;
  children: React.ReactNode;
  handleModal: () => void;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  modalState,
  modalHeader,
  children,
  handleModal,
}) => {
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        {modalHeader ? <ModalHeader>{modalHeader}</ModalHeader> : <></>}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
