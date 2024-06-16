import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";
import { ProfileRequestsDataType } from "~/types/requests";
import { HiArrowNarrowRight } from "react-icons/hi";

interface ProfileRequestsViewModalProps {
  handleModal: () => void;
  modalState: boolean;
  matrimonyProfileRequests: ProfileRequestsDataType[];
}

const ProfileRequestsViewModal: React.FC<ProfileRequestsViewModalProps> = ({
  handleModal,
  modalState,
  matrimonyProfileRequests,
}) => {
  return (
    <ModalLayout
      modalSize="3xl"
      handleModal={handleModal}
      modalState={modalState}
      modalHeader="Profile Requests"
    >
      <Flex p={2} gap={3} flexDir="column">
        {matrimonyProfileRequests.map((request, index) => {
          return (
            <Flex justify="space-between" align="center" key={index}>
              <Flex gap={5} align="center">
                <Flex gap={1} align="flex-end">
                  <Text fontSize="large" fontWeight={600}>
                    {request.requestee_name},
                  </Text>
                  <Text
                    fontWeight={600}
                    borderRadius={5}
                    bg="green.400"
                    py={0.5}
                    px={2}
                    fontSize="xs"
                  >
                    {request.requestee_id}
                  </Text>
                </Flex>
                <Icon as={HiArrowNarrowRight} />
                <Flex gap={1} align="flex-end">
                  <Text fontSize="large" fontWeight={600}>
                    {request.requested_name},
                  </Text>
                  <Text
                    fontWeight={600}
                    borderRadius={5}
                    bg="green.400"
                    py={0.5}
                    px={2}
                    fontSize="xs"
                  >
                    {request.requested_id}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={3}>
                <Button
                  variant="none"
                  bg="white"
                  border="1px solid"
                  borderColor="green.500"
                  color="green.500"
                  _hover={{
                    bg: "green.500",
                    color: "white",
                  }}
                >
                  Marked as done
                </Button>
                <Button
                  variant="none"
                  bg="white"
                  border="1px solid"
                  borderColor="red.500"
                  color="red.500"
                  _hover={{ bg: "red.500", color: "white" }}
                >
                  Decline Request
                </Button>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </ModalLayout>
  );
};

export default ProfileRequestsViewModal;
