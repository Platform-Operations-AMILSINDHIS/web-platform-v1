import ModalLayout from "~/layouts/ModalLayout";

interface TCPPModalProps {
  modalState: boolean;
  handleModal: () => void;
}

const TCPPModal: React.FC<TCPPModalProps> = ({ handleModal, modalState }) => {
  return (
    <ModalLayout modalState={modalState} handleModal={handleModal}>
      hi
    </ModalLayout>
  );
};

export default TCPPModal;
