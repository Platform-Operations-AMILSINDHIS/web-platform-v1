// src/components/matrimony/MatrimonyProfileCard.tsx
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdFemale, MdMale } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import useAWS from "~/hooks/useAWS";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { formatPDFAge } from "~/utils/helper";
import type { MatchLabel } from "~/utils/matrimonyMatch";

interface ApplicationS3Meta {
  s3_key: string;
  file_type: string;
  file_name: string;
  content_type: string;
}

interface MatrimonyProfileCardProps {
  submission: MatrimonyFormValues;
  handleOpenModal: (
    submission: MatrimonyFormValues,
    profileMedia: ApplicationS3Meta[],
    profilePictureURL: string,
    userId: string
  ) => void;
  profileRequests: string[];
  profileMedia: ApplicationS3Meta[];
  userId: string;
  matchLabel?: MatchLabel;
}

const MatrimonyProfileCard: React.FC<MatrimonyProfileCardProps> = ({
  submission,
  profileRequests,
  handleOpenModal,
  profileMedia,
  userId,
  matchLabel,
}) => {
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");

  const matrimonyImages = profileMedia.filter(
    (media) => media.file_type === "matrimony_image"
  );
  const coverImageS3Key =
    matrimonyImages.find((img) => img.s3_key.endsWith("/matrimony/1.jpg"))?.s3_key ??
    matrimonyImages[0]?.s3_key ??
    profileMedia.find((media) => media.file_type === "profile_image")?.s3_key;

  const { profileImageSignedURL } = useAWS({ s3_key: coverImageS3Key });

  useEffect(() => {
    if (profileImageSignedURL) {
      setProfilePictureURL(profileImageSignedURL);
    }
  }, [profileImageSignedURL]);

  const isRequested = profileRequests.includes(
    `${submission.personalInfo.firstName} ${submission.personalInfo.lastName}`
  );
  const age = formatPDFAge(submission.personalInfo.dateAndTimeOfBirth as unknown);

  return (
    <motion.div
      animate={{ boxShadow: "0px 4px 0px 0px rgba(0, 0, 0, 0.19)" }}
      whileHover={{ y: -4, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
      style={{ borderRadius: 10 }}
    >
      <Flex
        p={3}
        gap={2}
        borderRadius={10}
        border="1px solid rgba(31, 41, 55, 0.45)"
        flexDir="column"
        bg="white"
      >
        {/* Image with match badge */}
        <Box position="relative">
          {profilePictureURL ? (
            <Image
              src={profilePictureURL}
              alt={`${submission.personalInfo.firstName}'s profile`}
              borderRadius={8}
              objectFit="contain"
              w="100%"
              h="210px"
              bg="gray.50"
              fallbackSrc="https://via.placeholder.com/200x200?text=No+Image"
            />
          ) : (
            <Flex
              w="100%"
              h="210px"
              bg="gray.100"
              borderRadius={8}
              align="center"
              justify="center"
            >
              <Icon as={FaUserCircle} boxSize="90px" color="gray.400" />
            </Flex>
          )}

          {/* Match badge — absolute top-right */}
          {matchLabel && (
            <Box
              position="absolute"
              top={2}
              right={2}
              px={2}
              py={0.5}
              borderRadius="full"
              fontSize="10px"
              fontWeight={700}
              textTransform="uppercase"
              letterSpacing="wide"
              bg={matchLabel === "Great Match" ? "green.500" : "orange.400"}
              color="white"
              boxShadow="sm"
            >
              {matchLabel}
            </Box>
          )}
        </Box>

        {/* Name + gender */}
        <Flex align="center" justify="space-between" mt={1}>
          <Text fontWeight={700} fontSize="lg" color="gray.800" noOfLines={1}>
            {submission.personalInfo.firstName} {submission.personalInfo.lastName}
            <Text as="span" fontWeight={400} fontSize="sm" color="gray.500" ml={1}>
              {age}
            </Text>
          </Text>
          <Flex
            borderRadius={5}
            fontSize="xs"
            bg={submission.personalInfo.gender === "Male" ? "blue.100" : "pink.100"}
            px={2}
            py={0.5}
            align="center"
            gap={1}
            flexShrink={0}
          >
            <Text fontWeight={600} fontSize="xs">{submission.personalInfo.gender}</Text>
            <Icon
              boxSize={3}
              as={submission.personalInfo.gender === "Male" ? MdMale : MdFemale}
            />
          </Flex>
        </Flex>

        {/* Occupation + birthplace */}
        <Flex flexDir="column" gap={0.5}>
          <Text fontWeight={500} fontSize="sm" color="gray.700" noOfLines={1}>
            {submission.personalInfo.occupation}
          </Text>
          <Text fontWeight={500} fontSize="xs" color="gray.500" noOfLines={1}>
            {submission.personalInfo.placeOfBirth}
          </Text>
        </Flex>

        {/* Action */}
        {isRequested ? (
          <Text
            mt={2}
            w="fit-content"
            py={1}
            px={4}
            bg="yellow.100"
            color="yellow.700"
            borderRadius={5}
            fontSize="xs"
            fontWeight={700}
          >
            Requested
          </Text>
        ) : (
          <Text
            _hover={{ bg: "#1F2937", cursor: "pointer", color: "#FFFF" }}
            mt={2}
            w="fit-content"
            py={1}
            px={4}
            border="1px solid"
            borderColor="#1F2937"
            color="#1F2937"
            borderRadius={5}
            fontSize="xs"
            fontWeight={600}
            transition="all 0.2s"
            onClick={() => {
              handleOpenModal(submission, profileMedia, profilePictureURL, userId);
            }}
          >
            View Profile
          </Text>
        )}
      </Flex>
    </motion.div>
  );
};

export default MatrimonyProfileCard;
