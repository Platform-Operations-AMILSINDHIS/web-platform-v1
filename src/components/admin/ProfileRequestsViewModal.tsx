import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";
import { ProfileRequestsDataType } from "~/types/requests";
import { HiArrowNarrowRight } from "react-icons/hi";
import useServerActions from "~/hooks/useServerActions";
import { useState } from "react";

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
  const {
    handleMatrimonyProfileFetch,
    handleFetchUserSubmission,
    handleAcceptMatrimonyProfileRequest,
    handleDeclineMatrimonyProfileRequest,
  } = useServerActions();
  const [acceptingRequest, setAcceptingRequest] = useState<boolean>(false);

  const handleAccept = async (
    matrimony_id: string,
    email_id: string,
    id: number,
    requested_id: string,
    requested_name: string
  ) => {
    setAcceptingRequest(true);
    const matrimony_profile_data = await handleMatrimonyProfileFetch(
      matrimony_id
    );
    const requested_profile_buffer_data = await handleFetchUserSubmission(
      matrimony_profile_data[0]?.user_id ?? "",
      "MATRIMONY"
    );

    if (requested_profile_buffer_data) {
      const response = handleAcceptMatrimonyProfileRequest(
        requested_profile_buffer_data[0]?.submission,
        email_id,
        id,
        requested_id,
        requested_name
      );
      console.log({
        requestedProfile: requested_profile_buffer_data,
        response,
      });
      setAcceptingRequest(false);
    }
  };

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
                  onClick={() =>
                    handleAccept(
                      request.requested_id,
                      request.email_id,
                      request.id,
                      request.requested_id,
                      request.requested_name
                    )
                  }
                  isLoading={acceptingRequest}
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
                  Accept Request
                </Button>
                <Button
                  onClick={() =>
                    handleDeclineMatrimonyProfileRequest(
                      request.email_id,
                      request.id,
                      request.requested_id,
                      request.requested_name
                    )
                  }
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
      <Flex gap={3} my={2}>
        <Button
          color="#FF4D00"
          bg="none"
          border="2px solid"
          borderColor="#FF4D00"
          _hover={{
            color: "white",
            bg: "#FF4D00",
          }}
        >
          Approve All requests
        </Button>
        <Button
          _hover={{
            bg: "gray.700",
          }}
          color="white"
          bg="#0E0E11"
          onClick={handleModal}
        >
          Return
        </Button>
      </Flex>
    </ModalLayout>
  );
};

export default ProfileRequestsViewModal;
