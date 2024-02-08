import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface ImageViewModalProps {
  modalState: boolean;
  handleModal: () => void;
  url: string | undefined;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({
  url,
  modalState,
  handleModal,
}) => {
  return (
    <Text>
      <Modal size="2xl" isOpen={modalState} onClose={handleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody position="relative" p={0}>
            <Image
              src={url}
              alt="Your Image Description"
              objectFit="cover"
              w="100%"
              h="auto"
            />
            <Button
              onClick={() => handleModal()}
              _hover={{
                cursor: "pointer",
              }}
              fontWeight={600}
              color="white"
              bg="#FF4D00"
              top={3}
              left={3}
              position="absolute"
            >
              Return
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Text>
  );
};

export default ImageViewModal;
