import { Box } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";

interface ProfileRequestsViewModalProps {
  handleModal: () => void;
  modalState: boolean;
}

const ProfileRequestsViewModal: React.FC<ProfileRequestsViewModalProps> = ({
  handleModal,
  modalState,
}) => {
  return (
    <ModalLayout handleModal={handleModal} modalState={modalState}>
      Hi there
    </ModalLayout>
  );
};

export default ProfileRequestsViewModal;
