import ModalLayout from "~/layouts/ModalLayout";

interface MatrimonyApplicationWithdrawModalProps {
  handleModal: () => void;
  modalState: boolean;
}

const MatrimonyApplicationWithdrawModal: React.FC<
  MatrimonyApplicationWithdrawModalProps
> = ({ handleModal, modalState }) => {
  return (
    <ModalLayout
      modalHeader="Withdraw Application"
      handleModal={handleModal}
      modalState={modalState}
    >
      Withdraw
    </ModalLayout>
  );
};

export default MatrimonyApplicationWithdrawModal;
