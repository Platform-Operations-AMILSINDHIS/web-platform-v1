import { Box, Flex } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";
import ModalButton from "../buttons/ModalButtons";

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
      modalSize="5xl"
      modalHeader={modalTitle}
      modalState={modalState}
      handleModal={handleModal}
    >
      <Flex align="flex-start" p={5} flexDir="column" gap={5}>
        <Box dangerouslySetInnerHTML={{ __html: modalText }} />
        <ModalButton CTAlabel="Close" CTAaction={handleModal} />
      </Flex>
    </ModalLayout>
  );
};

export default TCPPModal;
