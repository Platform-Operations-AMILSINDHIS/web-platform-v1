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
      modalHeader={modalTitle}
      modalState={modalState}
      handleModal={handleModal}
    >
      {modalText}
    </ModalLayout>
  );
};

export default TCPPModal;
