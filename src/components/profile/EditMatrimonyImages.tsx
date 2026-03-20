import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUserCircle } from "react-icons/fa";
import useAWS from "~/hooks/useAWS";
import useServerActions from "~/hooks/useServerActions";

interface MatrimonyImageSlot {
  slotNumber: 1 | 2 | 3;
  s3_key: string | null;
  signedUrl: string | null;
  isUploading: boolean;
}

interface EditMatrimonyImagesProps {
  userId: string;
  existingImages: { s3_key: string; file_type: string }[];
  onSuccess?: () => void;
}

const EditMatrimonyImages: React.FC<EditMatrimonyImagesProps> = ({
  userId,
  existingImages,
  onSuccess,
}) => {
  const toast = useToast();
  const { handleUploadImageToS3 } = useAWS();
  const { handleSaveMatrimonyImage, handleDeleteMatrimonyImage } =
    useServerActions();

  // Initialize 3 slots
  const [slots, setSlots] = useState<MatrimonyImageSlot[]>([
    { slotNumber: 1, s3_key: null, signedUrl: null, isUploading: false },
    { slotNumber: 2, s3_key: null, signedUrl: null, isUploading: false },
    { slotNumber: 3, s3_key: null, signedUrl: null, isUploading: false },
  ]);

  // Load existing images into slots
  useEffect(() => {
    const matrimonyImages = existingImages.filter(
      (img) => img.file_type === "matrimony_image"
    );

    setSlots((prevSlots) =>
      prevSlots.map((slot) => {
        const expectedKey = `users/${userId}/matrimony/${slot.slotNumber}.jpg`;
        const existingImage = matrimonyImages.find(
          (img) => img.s3_key === expectedKey
        );
        return {
          ...slot,
          s3_key: existingImage?.s3_key ?? null,
        };
      })
    );
  }, [existingImages, userId]);

  const handleUpload = async (slotNumber: 1 | 2 | 3, file: File) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.slotNumber === slotNumber
          ? { ...slot, isUploading: true }
          : slot
      )
    );

    try {
      toast({
        title: `Uploading image ${slotNumber}...`,
        status: "loading",
        duration: 1000,
        isClosable: true,
      });

      const s3_key = `users/${userId}/matrimony/${slotNumber}.jpg`;
      const uploadStatus = await handleUploadImageToS3(file, s3_key);

      if (!uploadStatus) {
        throw new Error("Failed to upload image to S3");
      }

      await handleSaveMatrimonyImage(userId, s3_key, file);

      toast({
        title: "Success!",
        description: `Matrimony image ${slotNumber} uploaded`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setSlots((prev) =>
        prev.map((slot) =>
          slot.slotNumber === slotNumber
            ? { ...slot, s3_key, isUploading: false }
            : slot
        )
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error uploading matrimony image:", error);
      toast({
        title: "Error uploading image",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setSlots((prev) =>
        prev.map((slot) =>
          slot.slotNumber === slotNumber
            ? { ...slot, isUploading: false }
            : slot
        )
      );
    }
  };

  const handleDelete = async (slotNumber: 1 | 2 | 3, s3_key: string) => {
    try {
      toast({
        title: `Deleting image ${slotNumber}...`,
        status: "loading",
        duration: 1000,
        isClosable: true,
      });

      await handleDeleteMatrimonyImage(userId, s3_key);

      toast({
        title: "Success!",
        description: `Matrimony image ${slotNumber} deleted`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setSlots((prev) =>
        prev.map((slot) =>
          slot.slotNumber === slotNumber
            ? { ...slot, s3_key: null, signedUrl: null }
            : slot
        )
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting matrimony image:", error);
      toast({
        title: "Error deleting image",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mb={8}>
      <Text color="gray.900" fontSize="xl" fontWeight="bold" mb={4}>
        Matrimony Photos
      </Text>
      <Text color="gray.600" fontSize="sm" mb={4}>
        Upload up to 3 photos for your matrimony profile. These will be visible
        to other users browsing profiles.
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        {slots.map((slot) => (
          <MatrimonyImageSlot
            key={slot.slotNumber}
            slot={slot}
            userId={userId}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />
        ))}
      </Grid>
    </Box>
  );
};

interface MatrimonyImageSlotProps {
  slot: MatrimonyImageSlot;
  userId: string;
  onUpload: (slotNumber: 1 | 2 | 3, file: File) => Promise<void>;
  onDelete: (slotNumber: 1 | 2 | 3, s3_key: string) => Promise<void>;
}

const MatrimonyImageSlot: React.FC<MatrimonyImageSlotProps> = ({
  slot,
  userId,
  onUpload,
  onDelete,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Fetch signed URL for existing image
  const { profileImageSignedURL, isFetchingProfileImage } = useAWS({
    s3_key: slot.s3_key ?? undefined,
  });

  useEffect(() => {
    if (profileImageSignedURL && slot.s3_key) {
      setPreview(profileImageSignedURL);
    } else {
      setPreview(null);
    }
  }, [profileImageSignedURL, slot.s3_key]);

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
    disabled: slot.isUploading,
  });

  const handleUploadClick = async () => {
    if (file) {
      await onUpload(slot.slotNumber, file);
      setFile(null);
    }
  };

  const handleDeleteClick = () => {
    if (slot.s3_key) {
      void onDelete(slot.slotNumber, slot.s3_key);
    }
  };

  const handleCancelPreview = () => {
    setFile(null);
    if (slot.s3_key && profileImageSignedURL) {
      setPreview(profileImageSignedURL);
    } else {
      setPreview(null);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box
        h="200px"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {isFetchingProfileImage && slot.s3_key ? (
          <Text color="gray.500">Loading...</Text>
        ) : preview ? (
          <>
            <Image
              src={preview}
              alt={`Matrimony photo ${slot.slotNumber}`}
              objectFit="cover"
              w="100%"
              h="100%"
            />
            {file && (
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                aria-label="Cancel"
                position="absolute"
                top="2"
                right="2"
                borderRadius="full"
                colorScheme="red"
                onClick={handleCancelPreview}
              />
            )}
          </>
        ) : (
          <Box
            {...getRootProps()}
            w="100%"
            h="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            cursor={slot.isUploading ? "not-allowed" : "pointer"}
            _hover={
              slot.isUploading
                ? {}
                : {
                    bg: "gray.100",
                  }
            }
          >
            <input {...getInputProps()} />
            <Icon as={FaUserCircle} boxSize="50px" color="gray.400" mb={2} />
            <Text color="gray.600" fontSize="sm" textAlign="center" px={2}>
              {isDragActive ? "Drop here" : "Click or drag to upload"}
            </Text>
          </Box>
        )}
      </Box>

      <VStack p={3} spacing={2}>
        <Text fontSize="sm" fontWeight="600" color="gray.700">
          Photo {slot.slotNumber}
        </Text>

        {file ? (
          <Button
            size="sm"
            colorScheme="orange"
            w="100%"
            onClick={() => void handleUploadClick()}
            isLoading={slot.isUploading}
          >
            Upload
          </Button>
        ) : slot.s3_key ? (
          <Flex gap={2} w="100%">
            <Box {...getRootProps()} flex={1}>
              <input {...getInputProps()} />
              <Button size="sm" variant="outline" w="100%">
                Replace
              </Button>
            </Box>
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Flex>
        ) : (
          <Box {...getRootProps()} w="100%">
            <input {...getInputProps()} />
            <Button size="sm" variant="outline" w="100%">
              Choose File
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default EditMatrimonyImages;
