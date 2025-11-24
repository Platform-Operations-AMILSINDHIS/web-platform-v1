// ProfilePicture.tsx
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  useToast,
  Text,
  Image,
  Button,
  IconButton,
  Avatar,
  Badge,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useAWS from "~/hooks/useAWS";
import useServerActions from "~/hooks/useServerActions";

interface ProfilePictureProps {
  signUpFormValues: Values | null;
  setSignUpFormValues: (input: Values | null) => void;
  setCloseModal: (input: boolean) => void;
  authStateHandleFunction: (
    authState: "login" | "signup" | "forgotPassword" | "addprofilepic"
  ) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  authStateHandleFunction,
  setSignUpFormValues,
  setCloseModal,
  signUpFormValues,
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

  const dbUpdation = async (auth_id: string, values: Values, file: File) => {
    try {
      toast({
        title: "Registering account details...",
        status: "loading",
        duration: 1000,
        isClosable: true,
      });

      const response = await axios.post("/api/auth/db", {
        email: values.email,
        account_name: values.accountName,
        KAP_member: false,
        YAC_member: false,
        age: values.age,
        gender: values.gender,
        first_name: values.firstName,
        last_name: values.lastName,
        authID: auth_id,
        password: values.password,
      });

      // Validate DB response
      if (!response.data?.data || response.data.data.length === 0) {
        throw new Error("Failed to create user account in database");
      }

      const userId = response.data.data[0].id;
      if (!userId) {
        throw new Error("User ID not returned from database");
      }

      toast({
        title: "Account created! Uploading profile picture...",
        status: "loading",
        duration: 1000,
        isClosable: true,
      });
      // Create S3 Key + Upload
      const s3_key = `users/${userId}/profile/profile.jpg`;
      const uploadStatus = await handleUploadImageToS3(file, s3_key);

      if (!uploadStatus)
        throw new Error(`Something went wrong while uploading profile image`);

      await handleSaveUserProfilePicture(userId, s3_key, file);

      toast({
        title: "Success!",
        description: "Account registered & profile picture saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // remove all form values
      setSignUpFormValues(null);
    } catch (error: unknown) {
      alert(`Error occured during submission : ${error as string}`);
    }
  };

  const handleCreateAccount = async () => {
    if (!signUpFormValues || !file) return;

    setSubmitting(true);
    try {
      const response = await axios.post<{ auth_id: string }>(
        "/api/auth/signup",
        {
          email: signUpFormValues.email,
          password: signUpFormValues.password,
          phonenumber: signUpFormValues.phonenumber,
        }
      );

      const { auth_id } = response.data;

      await dbUpdation(auth_id, signUpFormValues, file);
      toast({
        title: "Activate your account",
        description: "An activation link has been sent to your Email ID",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setCloseModal(true);
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex
      py={5}
      px={4}
      gap={6}
      align="center"
      flexDir="column"
      maxW="500px"
      mx="auto"
    >
      <Flex gap={2} align="center" flexDir="column">
        <Text fontSize="25px" fontWeight={800}>
          {preview ? "Your all set to go !" : "Upload profile picture"}
        </Text>
        <Text fontWeight={500} color="gray.600" textAlign="center">
          {preview
            ? "Review your profile below. You can update your picture anytime, but account details can't be changed after signup."
            : "This picture will be tied to your account and all future submissions."}
        </Text>
      </Flex>

      {/* Profile Card Preview */}
      {preview && signUpFormValues ? (
        <Box
          w="100%"
          bg="white"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          border="1px solid"
          borderColor="gray.200"
        >
          {/* Header with gradient background */}
          <Box
            h="120px"
            bgGradient="linear(to-r, #FF4D00, #FF7A00)"
            position="relative"
          >
            {/* Profile Picture overlapping header */}
            <Box
              position="absolute"
              bottom="-50px"
              left="50%"
              transform="translateX(-50%)"
            >
              <Box position="relative">
                <Avatar
                  size="2xl"
                  src={preview}
                  border="6px solid white"
                  boxShadow="lg"
                />
                <IconButton
                  icon={<CloseIcon />}
                  size="xs"
                  aria-label="Change image"
                  position="absolute"
                  top="0"
                  right="0"
                  borderRadius="full"
                  colorScheme="red"
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Profile Info */}
          <VStack pt="60px" pb={6} px={6} spacing={3}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              {signUpFormValues.firstName} {signUpFormValues.lastName}
            </Text>

            <Text color="gray.600" fontSize="md">
              @{signUpFormValues.accountName}
            </Text>

            <HStack spacing={2}>
              <Badge
                colorScheme="purple"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
              >
                {signUpFormValues.gender}
              </Badge>
              <Badge
                colorScheme="blue"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
              >
                {signUpFormValues.age} years
              </Badge>
            </HStack>

            <Divider my={2} />

            {/* Contact Info */}
            <VStack align="start" w="100%" spacing={2} px={2}>
              <HStack w="100%">
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color="gray.500"
                  minW="80px"
                >
                  Email:
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {signUpFormValues.email}
                </Text>
              </HStack>

              <HStack w="100%">
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color="gray.500"
                  minW="80px"
                >
                  Phone:
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {signUpFormValues.phonenumber}
                </Text>
              </HStack>
            </VStack>

            {/* Edit Button */}
            <Button
              mt={3}
              size="sm"
              variant="ghost"
              colorScheme="gray"
              onClick={() => authStateHandleFunction("signup")}
            >
              ✏️ Edit details
            </Button>
          </VStack>
        </Box>
      ) : (
        /* Dropzone when no image */
        <Box
          {...getRootProps()}
          w="100%"
          h="200px"
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
          <Text color="gray.700" fontWeight="600" textAlign="center" px={4}>
            {isDragActive
              ? "Drop your image here..."
              : "Drag & drop a profile picture"}
          </Text>
          <Text color="gray.500" fontSize="sm" mt={1}>
            or click to browse
          </Text>
        </Box>
      )}

      {/* Action buttons */}
      <Flex gap={3} mt={3} w="100%">
        <Button
          flex={1}
          bg="#0E0E11"
          color="white"
          _hover={{ bg: "gray.700" }}
          isDisabled={!file || !preview}
          isLoading={submitting}
          onClick={() => void handleCreateAccount()}
        >
          Create Account
        </Button>

        <Button
          onClick={() => authStateHandleFunction("signup")}
          variant="outline"
          borderColor="gray.300"
          _hover={{ bg: "gray.50" }}
        >
          Back
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfilePicture;
