import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import MatrimonyLogin from "./MatrimonyLogin";
import { MatrimonyLoginValues } from "~/hooks/useForm";
import { FormikHelpers } from "formik";

interface MatrimonyAuthModalProps {
  modalState: boolean;
  isSubmitting: boolean;
  handleModal: () => void;
  handleFormSubmit: (
    values: MatrimonyLoginValues,
    setErrors: FormikHelpers<MatrimonyLoginValues>
  ) => Promise<void>;
}

const MatrimonyAuthModal: React.FC<MatrimonyAuthModalProps> = ({
  modalState,
  isSubmitting,
  handleModal,
  handleFormSubmit,
}) => {
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <MatrimonyLogin
            handleFormSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MatrimonyAuthModal;
