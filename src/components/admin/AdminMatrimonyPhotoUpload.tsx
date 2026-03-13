import {
  Box,
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { api } from "~/utils/api";

interface AdminMatrimonyPhotoUploadProps {
  user_id: string;
}

const AdminMatrimonyPhotoUpload: React.FC<AdminMatrimonyPhotoUploadProps> = ({
  user_id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const getUploadURL = api.aws.getS3UploadURL.useMutation();
  const saveMetadata = api.actions.saveProfilePicture.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !user_id) return;

    setIsUploading(true);
    try {
      const s3Key = `matrimony/${user_id}/${Date.now()}_${selectedFile.name}`;

      // Get presigned upload URL
      const { uploadURL } = await getUploadURL.mutateAsync({
        s3_key: s3Key,
        content_type: selectedFile.type,
        file_size: selectedFile.size,
      });

      // Upload directly to S3
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        body: selectedFile,
        headers: { "Content-Type": selectedFile.type },
      });

      if (!uploadResponse.ok) {
        throw new Error(`S3 upload failed: ${uploadResponse.status}`);
      }

      // Save metadata
      await saveMetadata.mutateAsync({
        user_id,
        s3_key: s3Key,
        file_type: "matrimony_image",
        file_name: selectedFile.name,
        content_type: selectedFile.type,
        file_size: selectedFile.size,
      });

      toast({
        title: "Photo uploaded successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onClose();
    } catch (err) {
      console.error("Admin matrimony photo upload error:", err);
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Box mt={4}>
        <Button colorScheme="orange" variant="outline" size="sm" onClick={onOpen}>
          Upload Matrimony Photo
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Matrimony Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3} color="gray.600" fontSize="sm">
              Upload a photo on behalf of this approved matrimony applicant. Up
              to 3 matrimony images are allowed per profile.
            </Text>
            <Heading size="xs" mb={2}>
              Select Image
            </Heading>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              border="none"
              p={0}
            />
            {selectedFile && (
              <Text mt={2} fontSize="sm" color="gray.500">
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isUploading}>
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={handleUpload}
              isLoading={isUploading}
              isDisabled={!selectedFile}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminMatrimonyPhotoUpload;
