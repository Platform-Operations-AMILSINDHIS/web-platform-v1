import { Box, Button, Flex, Grid, Icon, Image, Text, HStack } from "@chakra-ui/react";
import { MdFemale, MdMale } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import ModalLayout from "~/layouts/ModalLayout";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { formatPDFAge } from "~/utils/helper";
import { btnThemeLight } from "../buttons/BtnThemes";
import useAWS from "~/hooks/useAWS";

interface ApplicationS3Meta {
  s3_key: string;
  file_type: string;
  file_name: string;
  content_type: string;
}

interface MatrimonyProfileViewModalProps {
  submission: MatrimonyFormValues | undefined;
  profileMedia: ApplicationS3Meta[];
  profilePictureURL: string;
  modalState: boolean;
  modalHeader: string;
  handleModal: () => void;
}

const MatrimonyProfileViewModal: React.FC<MatrimonyProfileViewModalProps> = ({
  submission,
  profileMedia,
  profilePictureURL,
  handleModal,
  modalHeader,
  modalState,
}) => {
  // Extract matrimony images
  const matrimonyImages = profileMedia.filter(
    (media) => media.file_type === "matrimony_image"
  );

  // Sort matrimony images by slot number (1, 2, 3)
  const sortedMatrimonyImages = matrimonyImages.sort((a, b) => {
    const getSlotNumber = (s3_key: string) => {
      const match = s3_key.match(/\/matrimony\/(\d)\.jpg$/);
      return match?.[1] ? parseInt(match[1]) : 999;
    };
    return getSlotNumber(a.s3_key) - getSlotNumber(b.s3_key);
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Determine which images to show
  const imagesToShow =
    sortedMatrimonyImages.length > 0
      ? sortedMatrimonyImages
      : profileMedia.filter((media) => media.file_type === "profile_image");

  return (
    <ModalLayout
      handleModal={handleModal}
      modalState={modalState}
      modalHeader={modalHeader}
      modalSize="3xl"
    >
      <Flex flexDir="column">
        {/* Image Gallery Section */}
        {imagesToShow.length > 0 && (
          <Box mb={4}>
            <MatrimonyImageGallery
              images={imagesToShow}
              selectedIndex={selectedImageIndex}
              onSelectImage={setSelectedImageIndex}
            />
          </Box>
        )}

        {/* Profile Picture and Name Section */}
        <Flex gap={4} align="flex-start">
          {/* Compact profile indicator - removed large profile picture since we have gallery */}
          {!imagesToShow.length && (
            <Flex
              w="80px"
              h="80px"
              minW="80px"
              bg="gray.100"
              borderRadius="full"
              align="center"
              justify="center"
            >
              <Icon as={FaUserCircle} boxSize="50px" color="gray.400" />
            </Flex>
          )}

          {/* Name, Age, Gender, Occupation */}
          <Flex flexDir="column" flex={1}>
            <Flex align="center" justify="space-between">
              <Text fontWeight={700} fontSize="xl">
                {`${submission?.personalInfo?.firstName} ${submission?.personalInfo.middleName} ${submission?.personalInfo.lastName},`}{" "}
                <span
                  style={{ fontSize: "medium", color: "rgba(0, 0, 0, 0.51)" }}
                >
                  {formatPDFAge(submission?.personalInfo.dateAndTimeOfBirth)}
                </span>
              </Text>
              <Flex
                borderRadius={5}
                fontSize="small"
                bg={
                  submission?.personalInfo.gender === "Male"
                    ? "blue.200"
                    : "pink"
                }
                px={2}
                py={0}
                align="center"
                gap={1}
              >
                <Text fontWeight={600}>{submission?.personalInfo.gender}</Text>
                <Icon
                  boxSize={3}
                  as={
                    submission?.personalInfo.gender === "Male"
                      ? MdMale
                      : MdFemale
                  }
                />
              </Flex>
            </Flex>
            <Text mt={"-1px"} fontWeight={500}>
              {submission?.personalInfo.occupation}
            </Text>
            <Text fontWeight={500} color="gray.500">
              {submission?.personalInfo.placeOfBirth}
            </Text>
          </Flex>
        </Flex>

        <Flex flexDir="column" mt={5} gap={2}>
          <Flex flexDir="column" gap={1}>
            <Text fontSize="lg" fontWeight={600}>
              Physical Attributes
            </Text>
            <Flex justify="space-between">
              <Text
                fontWeight={500}
              >{`Complextion : ${submission?.personalInfo.complexionAndFeatures}`}</Text>
              <Text
                fontWeight={500}
              >{`Weight : ${submission?.personalInfo.weight} kg`}</Text>
              <Text
                fontWeight={500}
              >{`Height : ${submission?.personalInfo.heightFeet}'${submission?.personalInfo.heightInches}`}</Text>
            </Flex>
          </Flex>

          <Flex flexDir="column" gap={1}>
            <Text fontSize="lg" fontWeight={600}>
              Hobbies
            </Text>
            <Text fontWeight={500}>{submission?.personalInfo.hobbies}</Text>
          </Flex>

          <Flex flexDir="column" gap={1}>
            <Text fontSize="lg" fontWeight={600}>
              Qualifications
            </Text>
            <Text fontWeight={500}>
              {submission?.personalInfo.qualifications}
            </Text>
          </Flex>

          <Flex flexDir="column" gap={1}>
            <Text fontSize="lg" fontWeight={600}>
              Spouse Preferences
            </Text>
            <Flex flexDir="column">
              <Flex justify="space-between">
                <Text
                  fontWeight={500}
                >{`Complextion : ${submission?.spousePreferences.complexion}`}</Text>
                <Text
                  fontWeight={500}
                >{`Weight : ${submission?.spousePreferences.weight} kg`}</Text>
                <Text
                  fontWeight={500}
                >{`Height : ${submission?.spousePreferences.heightFeet}'${submission?.spousePreferences.heightInches}`}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text
                  fontWeight={500}
                >{`Qualification : ${submission?.spousePreferences.qualificationRequirements}`}</Text>
                <Text
                  fontWeight={500}
                >{`Working : ${submission?.spousePreferences.working}`}</Text>
                <Text
                  fontWeight={500}
                >{`Build : ${submission?.spousePreferences.build}`}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Box mb={3} mt={5}>
          <Button
            onClick={handleModal}
            style={btnThemeLight}
            bg="#1F2937"
            color="white"
            px={5}
          >
            Exit Profile
          </Button>
        </Box>
      </Flex>
    </ModalLayout>
  );
};

interface MatrimonyImageGalleryProps {
  images: ApplicationS3Meta[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
}

const MatrimonyImageGallery: React.FC<MatrimonyImageGalleryProps> = ({
  images,
  selectedIndex,
  onSelectImage,
}) => {
  const selectedImage = images[selectedIndex];
  const { profileImageSignedURL: mainImageUrl } = useAWS({
    s3_key: selectedImage?.s3_key,
  });

  return (
    <Box>
      {/* Main Image */}
      <Box
        mb={3}
        borderRadius="lg"
        overflow="hidden"
        bg="gray.100"
        h="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt="Matrimony profile"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        ) : (
          <Icon as={FaUserCircle} boxSize="100px" color="gray.400" />
        )}
      </Box>

      {/* Thumbnails - only show if multiple images */}
      {images.length > 1 && (
        <HStack spacing={2} justify="center">
          {images.map((image, index) => (
            <ThumbnailImage
              key={image.s3_key}
              s3_key={image.s3_key}
              isSelected={index === selectedIndex}
              onClick={() => onSelectImage(index)}
            />
          ))}
        </HStack>
      )}
    </Box>
  );
};

interface ThumbnailImageProps {
  s3_key: string;
  isSelected: boolean;
  onClick: () => void;
}

const ThumbnailImage: React.FC<ThumbnailImageProps> = ({
  s3_key,
  isSelected,
  onClick,
}) => {
  const { profileImageSignedURL } = useAWS({ s3_key });

  return (
    <Box
      w="80px"
      h="80px"
      borderRadius="md"
      overflow="hidden"
      cursor="pointer"
      border="3px solid"
      borderColor={isSelected ? "orange.500" : "gray.300"}
      _hover={{ borderColor: "orange.400" }}
      onClick={onClick}
      bg="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {profileImageSignedURL ? (
        <Image
          src={profileImageSignedURL}
          alt="Thumbnail"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      ) : (
        <Icon as={FaUserCircle} boxSize="40px" color="gray.400" />
      )}
    </Box>
  );
};

export default MatrimonyProfileViewModal;
