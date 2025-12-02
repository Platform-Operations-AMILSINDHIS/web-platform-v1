import { Box, Button, Flex, Grid, Icon, Image, Text } from "@chakra-ui/react";
import { MdFemale, MdMale } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import ModalLayout from "~/layouts/ModalLayout";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { formatPDFAge } from "~/utils/helper";
import { btnThemeLight } from "../buttons/BtnThemes";

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
  return (
    <ModalLayout
      handleModal={handleModal}
      modalState={modalState}
      modalHeader={modalHeader}
      modalSize="3xl"
    >
      <Flex flexDir="column">
        {/* Profile Picture and Name Section */}
        <Flex gap={4} align="flex-start">
          {/* Profile Picture */}
          {profilePictureURL ? (
            <Image
              src={profilePictureURL}
              alt="Profile"
              boxSize="110px"
              borderRadius="full"
              border="4px solid white"
              boxShadow="xl"
              objectFit="cover"
            />
          ) : (
            <Flex
              w="150px"
              h="150px"
              minW="150px"
              bg="gray.100"
              borderRadius={10}
              align="center"
              justify="center"
            >
              <Icon as={FaUserCircle} boxSize="80px" color="gray.400" />
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

export default MatrimonyProfileViewModal;
