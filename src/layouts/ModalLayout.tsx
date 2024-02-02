import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

interface ModalLayoutProps {
  modalState: boolean;
  children: React.ReactNode;
  handleModal: () => void;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
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

export default ModalLayout;
