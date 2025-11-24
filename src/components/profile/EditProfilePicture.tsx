import { CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  useToast,
  Text,
  Button,
  IconButton,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useAWS from "~/hooks/useAWS";
import useServerActions from "~/hooks/useServerActions";

interface EditProfilePictureProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentImageUrl?: string;
  userName: string;
  onSuccess?: () => void;
}

const EditProfilePicture: React.FC<EditProfilePictureProps> = ({
  isOpen,
  onClose,
  userId,
  currentImageUrl,
  userName,
  onSuccess,
}) => {
  const toast = useToast();
  const { handleUploadImageToS3 } = useAWS();
  const { handleSaveUserProfilePicture } = useServerActions();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "image/webp": [],
    },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUpdateProfilePicture = async () => {
    if (!file) return;

    setSubmitting(true);
    try {
      toast({
        title: "Uploading profile picture...",
        status: "loading",
        duration: 1000,
        isClosable: true,
      });

      // Create S3 Key + Upload
      const s3_key = `users/${userId}/profile/profile.jpg`;
      const uploadStatus = await handleUploadImageToS3(file, s3_key);

      if (!uploadStatus) {
        throw new Error("Something went wrong while uploading profile image");
      }

      await handleSaveUserProfilePicture(userId, s3_key, file);

      toast({
        title: "Success!",
        description: "Profile picture updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Reset state
      setPreview(null);
      setFile(null);

      // Call success callback and close modal
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast({
        title: "Error updating profile picture",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setFile(null);
  };

  const handleModalClose = () => {
    handleRemovePreview();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="lg" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
      <ModalContent borderRadius="2xl" overflow="hidden">
        <ModalHeader
          bgGradient="linear(to-r, #FF4D00, #FF8C42)"
          color="white"
          fontSize="xl"
          fontWeight={600}
        >
          Update Profile Picture
        </ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody py={8} px={6}>
          <VStack spacing={4}>
            {preview ? (
              <Text
                fontWeight={500}
                color="gray.600"
                textAlign="center"
                fontSize="md"
              >
                Your new profile picture looks great
              </Text>
            ) : (
              <></>
            )}

            {/* Profile Picture Preview */}
            {preview ? (
              <Box position="relative">
                <Avatar size="2xl" src={preview} boxShadow="xl" />
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  aria-label="Remove image"
                  position="absolute"
                  top="0"
                  right="0"
                  borderRadius="full"
                  colorScheme="red"
                  onClick={handleRemovePreview}
                />
              </Box>
            ) : currentImageUrl ? (
              <VStack spacing={4}>
                <Text fontSize="sm" color="gray.500">
                  Current Picture
                </Text>
                <Avatar size="2xl" src={currentImageUrl} boxShadow="lg" />
              </VStack>
            ) : (
              <Avatar
                size="2xl"
                name={userName}
                bg="purple.500"
                boxShadow="lg"
              />
            )}

            {/* Dropzone when no preview */}
            {!preview && (
              <Box
                {...getRootProps()}
                w="100%"
                h="180px"
                border="3px dashed"
                borderColor={isDragActive ? "orange.400" : "gray.300"}
                bg={isDragActive ? "orange.50" : "gray.50"}
                borderRadius="xl"
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                transition="all 0.3s ease"
                cursor="pointer"
                _hover={{
                  borderColor: "orange.300",
                  bg: "orange.50",
                }}
              >
                <input {...getInputProps()} />
                <Text fontSize="4xl" mb={2}>
                  📸
                </Text>
                <Text
                  color="gray.700"
                  fontWeight="600"
                  textAlign="center"
                  px={4}
                >
                  {isDragActive
                    ? "Drop your image here..."
                    : "Drag & drop a new picture"}
                </Text>
                <Text color="gray.500" fontSize="sm" mt={1}>
                  or click to browse
                </Text>
                <Text color="gray.400" fontSize="xs" mt={2}>
                  Supports: PNG, JPEG, JPG, WEBP
                </Text>
              </Box>
            )}

            {/* Action buttons */}
            <Flex gap={3} w="100%" pt={2}>
              <Button
                flex={1}
                bg="#FF4D00"
                color="white"
                _hover={{ bg: "#E64500" }}
                isDisabled={!file || !preview}
                isLoading={submitting}
                onClick={() => void handleUpdateProfilePicture()}
              >
                Update Picture
              </Button>

              <Button
                onClick={handleModalClose}
                variant="outline"
                borderColor="gray.300"
                _hover={{ bg: "gray.50" }}
              >
                Cancel
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfilePicture;
