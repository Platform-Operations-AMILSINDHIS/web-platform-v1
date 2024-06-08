import ModalLayout from "~/layouts/ModalLayout";

interface MatrimonyApplicationSelectionModalProps {
  handleModal: () => void;
  modalState: boolean;
}

const MatrimonyApplicationSelectionModal: React.FC<
  MatrimonyApplicationSelectionModalProps
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

export default MatrimonyApplicationSelectionModal;
