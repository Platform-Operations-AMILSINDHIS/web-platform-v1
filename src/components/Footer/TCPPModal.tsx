import { Box } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";

interface TCPPModalProps {
  modalState: boolean;
  handleModal: () => void;
  modalText: string;
  modalTitle: string;
}

const TCPPModal: React.FC<TCPPModalProps> = ({
  handleModal,
  modalState,
  modalText,
  modalTitle,
}) => {
  return (
    <ModalLayout
      modalSize="3xl"
      modalHeader={modalTitle}
      modalState={modalState}
      handleModal={handleModal}
    >
      <Box dangerouslySetInnerHTML={{ __html: modalText }} />
    </ModalLayout>
  );
};

export default TCPPModal;
