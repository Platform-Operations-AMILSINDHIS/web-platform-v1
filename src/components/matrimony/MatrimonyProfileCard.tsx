import { Flex, Icon, Text } from "@chakra-ui/react";
import { MdFemale, MdMale } from "react-icons/md";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { formatPDFAge } from "~/utils/helper";

interface MatrimonyProfileCardProps {
  submission: MatrimonyFormValues;
  handleOpenModal: (submission: MatrimonyFormValues) => void;
  profileRequests: string[];
}

const MatrimonyProfileCard: React.FC<MatrimonyProfileCardProps> = ({
  submission,
  profileRequests,
  handleOpenModal,
}) => {
  return (
    <Flex
      p={3}
      gap={1}
      borderRadius={10}
      border="1px solid rgba(31, 41, 55, 0.45)"
      boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19)"
      flexDir="column"
    >
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
          {submission.personalInfo.placeOfBirth}
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
              handleOpenModal(submission);
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
