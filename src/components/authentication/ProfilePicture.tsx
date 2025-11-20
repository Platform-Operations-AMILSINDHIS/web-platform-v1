import { Flex, Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

interface ProfilePictureProps {
  setCloseModal: (input: boolean) => void;
  authStateHandleFunction: (
    authState: "login" | "signup" | "forgotPassword" | "addprofilepic"
  ) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  authStateHandleFunction,
  setCloseModal,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <Flex py={5} px={2} gap={6} align="center" flexDir="column">
      <Box
        {...getRootProps()}
        w="100%"
        h="180px"
        border="2px dashed"
        borderColor={isDragActive ? "blue.400" : "gray.300"}
        bg={isDragActive ? "blue.50" : "gray.50"}
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        transition="all 0.2s ease"
        cursor="pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <span>Drop your image here...</span>
        ) : (
          <span>Drag & drop a profile picture, or click to upload</span>
        )}
      </Box>
    </Flex>
  );
};

export default ProfilePicture;
