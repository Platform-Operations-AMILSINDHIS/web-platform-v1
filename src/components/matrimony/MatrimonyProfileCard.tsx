import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdFemale, MdMale } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import useAWS from "~/hooks/useAWS";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { formatPDFAge } from "~/utils/helper";

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
    profilePictureURL: string
  ) => void;
  profileRequests: string[];
  profileMedia: ApplicationS3Meta[];
}

const MatrimonyProfileCard: React.FC<MatrimonyProfileCardProps> = ({
  submission,
  profileRequests,
  handleOpenModal,
  profileMedia,
}) => {
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");

  // Find profile image from media
  const profilePictureS3Key = profileMedia.find(
    (media) => media.file_type === "profile_image"
  )?.s3_key;

  // Fetch signed URL if profile picture exists
  const { profileImageSignedURL } = useAWS({
    s3_key: profilePictureS3Key,
  });

  // Update profile picture URL when signed URL is available
  useEffect(() => {
    if (profileImageSignedURL) {
      setProfilePictureURL(profileImageSignedURL);
      console.log({ profileImageSignedURL });
    }
  }, [profileImageSignedURL]);

  return (
    <Flex
      p={3}
      gap={1}
      borderRadius={10}
      border="1px solid rgba(31, 41, 55, 0.45)"
      boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19)"
      flexDir="column"
    >
      {/* Profile Picture or Placeholder Icon - Conditional Render */}
      <Flex justify="center" mb={3}>
        {profilePictureURL ? (
          <Image
            src={profilePictureURL}
            alt={`${submission.personalInfo.firstName}'s profile`}
            borderRadius={10}
            objectFit="cover"
            w="100%"
            h="200px"
            bg="gray.50"
            fallbackSrc="https://via.placeholder.com/200x200?text=No+Image"
          />
        ) : (
          <Flex
            w="100%"
            h="200px"
            bg="gray.100"
            borderRadius={10}
            align="center"
            justify="center"
          >
            <Icon as={FaUserCircle} boxSize="100px" color="gray.400" />
          </Flex>
        )}
      </Flex>

      <Flex align="center" justify="space-between">
        <Text pr={6} fontWeight={600} fontSize="xl">
          {`${submission.personalInfo.firstName} ${submission.personalInfo.lastName},`}{" "}
          <span
            style={{
              fontSize: "medium",
              color: "rgba(0, 0, 0, 0.51)",
            }}
          >{`${formatPDFAge(
            submission.personalInfo.dateAndTimeOfBirth as unknown
          )}`}</span>
        </Text>
        <Flex
          borderRadius={5}
          fontSize="small"
          bg={submission.personalInfo.gender === "Male" ? "blue.200" : "pink"}
          px={2}
          py={0}
          align="center"
          gap={1}
        >
          <Text fontWeight={600}>{submission.personalInfo.gender}</Text>
          <Icon
            boxSize={3}
            as={submission.personalInfo.gender === "Male" ? MdMale : MdFemale}
          />
        </Flex>
      </Flex>
      <Flex align="flex-start" flexDir="column">
        <Text fontWeight={500} fontSize="lg">
          {submission.personalInfo.occupation}
        </Text>
        <Text fontWeight={600} color="gray.500">
          Birth place : {submission.personalInfo.placeOfBirth}
        </Text>
      </Flex>
      <>
        {profileRequests.includes(submission.personalInfo.firstName) ? (
          <Text
            mt={3}
            w="fit-content"
            py={1}
            px={4}
            bg="yellow.200"
            color="#1F2937"
            borderRadius={5}
            fontSize="small"
            fontWeight={700}
            transition="all 0.2s"
          >
            Profile Requested
          </Text>
        ) : (
          <Text
            _hover={{
              bg: "#1F2937",
              cursor: "pointer",
              color: "#FFFF",
            }}
            mt={3}
            w="fit-content"
            py={1}
            px={4}
            border="1px solid"
            borderColor="#1F2937"
            color="#1F2937"
            borderRadius={5}
            fontSize="small"
            fontWeight={600}
            transition="all 0.2s"
            onClick={() => {
              handleOpenModal(submission, profileMedia, profilePictureURL);
            }}
          >
            View Profile
          </Text>
        )}
      </>
    </Flex>
  );
};

export default MatrimonyProfileCard;
