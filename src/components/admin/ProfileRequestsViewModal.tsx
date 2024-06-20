import { Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
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
  const toast = useToast();

  const [acceptingRequest, setAcceptingRequest] = useState<boolean>(false);
  const [decliningRequest, setDecliningRequest] = useState<boolean>(false);

  const [acceptedRequestID, setAcceptedRequestID] = useState<number>(0);
  const [declinedRequestID, setDeclinedRequestID] = useState<number>(0);

  const handleAcceptRequest = async (
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
      const { message, toastType } = await handleAcceptMatrimonyProfileRequest(
        requested_profile_buffer_data[0]?.submission,
        email_id,
        id,
        requested_id,
        requested_name
      );
      setAcceptingRequest(false);
      setAcceptedRequestID(id);
      toast({
        title: "Server Action",
        description: message,
        status: toastType as "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeclineRequest = async (
    email_id: string,
    id: number,
    requested_id: string,
    requested_name: string
  ) => {
    setDecliningRequest(true);
    const { message, toastType } = await handleDeclineMatrimonyProfileRequest(
      email_id,
      id,
      requested_id,
      requested_name
    );
    setDecliningRequest(false);
    setDeclinedRequestID(id);
    toast({
      title: "Server Action",
      description: message,
      status: toastType as "error",
      duration: 3000,
      isClosable: true,
    });
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
                    handleAcceptRequest(
                      request.requested_id,
                      request.email_id,
                      request.id,
                      request.requested_id,
                      request.requested_name
                    )
                  }
                  isLoading={acceptingRequest}
                  variant="none"
                  bg={acceptedRequestID === request.id ? "green.500" : "white"}
                  border="1px solid"
                  borderColor="green.500"
                  color={
                    acceptedRequestID === request.id ? "white" : "green.500"
                  }
                  _hover={{
                    bg: "green.500",
                    color: "white",
                  }}
                >
                  {acceptedRequestID === request.id
                    ? `Accepted Request`
                    : "Accept Request"}
                </Button>
                <Button
                  onClick={() =>
                    handleDeclineRequest(
                      request.email_id,
                      request.id,
                      request.requested_id,
                      request.requested_name
                    )
                  }
                  isLoading={decliningRequest}
                  variant="none"
                  bg={declinedRequestID === request.id ? "red.500" : "white"}
                  border="1px solid"
                  borderColor="red.500"
                  color={declinedRequestID === request.id ? "white" : "red.500"}
                  _hover={{ bg: "red.500", color: "white" }}
                >
                  {declinedRequestID === request.id
                    ? `Declined Request`
                    : `Decline Request`}
                </Button>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex my={2}>
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
