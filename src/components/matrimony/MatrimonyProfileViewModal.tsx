import { Box, Button, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { MdFemale, MdMale } from "react-icons/md";
import ModalLayout from "~/layouts/ModalLayout";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { formatPDFAge } from "~/utils/helper";
import { btnThemeLight } from "../buttons/BtnThemes";

interface MatrimonyProfileViewModalProps {
  submission: MatrimonyFormValues | undefined;
  modalState: boolean;
  modalHeader: string;
  handleModal: () => void;
}

const MatrimonyProfileViewModal: React.FC<MatrimonyProfileViewModalProps> = ({
  submission,
  handleModal,
  modalHeader,
  modalState,
}) => {
  console.log(submission);
  return (
    <ModalLayout
      handleModal={handleModal}
      modalState={modalState}
      modalHeader={modalHeader}
      modalSize="xl"
    >
      <Flex flexDir="column">
        <Flex flexDir="column">
          <Flex align="center" justify="space-between">
            <Text fontWeight={700} fontSize="xl">
              {`${submission?.personalInfo?.firstName} ${submission?.personalInfo.middleName} ${submission?.personalInfo.lastName},`}{" "}
              <span style={{ fontSize: "medium", color: "gray.100" }}>
                {formatPDFAge(submission?.personalInfo.dateAndTimeOfBirth)}
              </span>
            </Text>
            <Flex
              borderRadius={5}
              fontSize="small"
              bg={
                submission?.personalInfo.gender === "Male" ? "blue.200" : "pink"
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
                  submission?.personalInfo.gender === "Male" ? MdMale : MdFemale
                }
              />
            </Flex>
          </Flex>
          <Text mt={"-1px"} fontWeight={500}>
            {submission?.personalInfo.occupation}
          </Text>
        </Flex>

        <Flex flexDir="column" mt={5} gap={2}>
          <Flex flexDir="column">
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

          <Flex flexDir="column">
            <Text fontSize="lg" fontWeight={600}>
              Hobbies
            </Text>
            <Text fontWeight={500}>{submission?.personalInfo.hobbies}</Text>
          </Flex>

          <Flex flexDir="column">
            <Text fontSize="lg" fontWeight={600}>
              Qualifications
            </Text>
            <Text fontWeight={500}>
              {submission?.personalInfo.qualifications}
            </Text>
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
