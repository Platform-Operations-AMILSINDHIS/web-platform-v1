import { Avatar, Button, Flex, Icon, Text, useToast, VStack, HStack, Box } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";
import { ProfileRequestsDataType } from "~/types/requests";
import { HiArrowNarrowRight } from "react-icons/hi";
import useServerActions from "~/hooks/useServerActions";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import useAWS from "~/hooks/useAWS";

interface ProfileRequestsViewModalProps {
  handleModal: () => void;
  modalState: boolean;
  matrimonyProfileRequests: ProfileRequestsDataType[];
}

interface EnrichedRequest extends ProfileRequestsDataType {
  requestee_profile_s3_key?: string | null;
  requested_profile_s3_key?: string | null;
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
  const fetchRequestsWithAvatars =
    api.profileRequests.fetchAllRequestsWithAvatars.useMutation();

  const [acceptingRequest, setAcceptingRequest] = useState<boolean>(false);
  const [decliningRequest, setDecliningRequest] = useState<boolean>(false);

  const [acceptedRequestID, setAcceptedRequestID] = useState<number>(0);
  const [declinedRequestID, setDeclinedRequestID] = useState<number>(0);

  const [enrichedRequests, setEnrichedRequests] = useState<EnrichedRequest[]>(
    []
  );

  // Fetch enriched requests with avatar data when modal opens
  useEffect(() => {
    if (modalState && matrimonyProfileRequests.length > 0) {
      const email_id = matrimonyProfileRequests[0]?.email_id;
      if (email_id) {
        fetchRequestsWithAvatars
          .mutateAsync({ email_id })
          .then((data) => {
            setEnrichedRequests(data?.requests || []);
          })
          .catch((err) => {
            console.error("Error fetching requests with avatars:", err);
            setEnrichedRequests(matrimonyProfileRequests);
          });
      }
    }
  }, [modalState, matrimonyProfileRequests]);

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
    
    const userId = matrimony_profile_data[0]?.user_id;
    if (!userId) {
      console.error("Could not find user_id for matrimony profile:", matrimony_id);
      setAcceptingRequest(false);
      return;
    }

    const requested_profile_buffer_data = await handleFetchUserSubmission(
      userId,
      "MATRIMONY"
    );

    if (requested_profile_buffer_data) {
      const { message, toastType } = await handleAcceptMatrimonyProfileRequest(
        requested_profile_buffer_data.submission,
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
        {(enrichedRequests.length > 0
          ? enrichedRequests
          : matrimonyProfileRequests
        ).map((request, index) => {
          return (
            <Box
              key={index}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={4}
              bg="white"
              _hover={{ boxShadow: "md" }}
              transition="all 0.2s"
            >
              <Flex justify="space-between" align="center" gap={4}>
                {/* Requestee (person making the request) */}
                <Flex flex={1} align="center" gap={3}>
                  <ProfileAvatar
                    s3_key={
                      "requestee_profile_s3_key" in request
                        ? request.requestee_profile_s3_key
                        : undefined
                    }
                    name={request.requestee_name}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="md" fontWeight={600}>
                      {request.requestee_name}
                    </Text>
                    <Text
                      fontSize="xs"
                      fontWeight={600}
                      color="green.600"
                      bg="green.50"
                      px={2}
                      py={0.5}
                      borderRadius="md"
                    >
                      {request.requestee_id}
                    </Text>
                  </VStack>
                </Flex>

                {/* Arrow */}
                <Icon
                  as={HiArrowNarrowRight}
                  boxSize={6}
                  color="gray.400"
                  flexShrink={0}
                />

                {/* Requested (person being requested) */}
                <Flex flex={1} align="center" gap={3}>
                  <ProfileAvatar
                    s3_key={
                      "requested_profile_s3_key" in request
                        ? request.requested_profile_s3_key
                        : undefined
                    }
                    name={request.requested_name}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="md" fontWeight={600}>
                      {request.requested_name}
                    </Text>
                    <Text
                      fontSize="xs"
                      fontWeight={600}
                      color="green.600"
                      bg="green.50"
                      px={2}
                      py={0.5}
                      borderRadius="md"
                    >
                      {request.requested_id}
                    </Text>
                  </VStack>
                </Flex>

                {/* Action Buttons */}
                <HStack spacing={2} flexShrink={0}>
                  <Button
                    onClick={() =>
                      void handleAcceptRequest(
                        request.requested_id,
                        request.email_id,
                        request.id,
                        request.requested_id,
                        request.requested_name
                      )
                    }
                    isLoading={
                      acceptedRequestID === request.id ? acceptingRequest : false
                    }
                    size="sm"
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
                    {acceptedRequestID === request.id ? "Accepted" : "Accept"}
                  </Button>
                  <Button
                    onClick={() =>
                      void handleDeclineRequest(
                        request.email_id,
                        request.id,
                        request.requested_id,
                        request.requested_name
                      )
                    }
                    isLoading={decliningRequest}
                    size="sm"
                    variant="none"
                    bg={declinedRequestID === request.id ? "red.500" : "white"}
                    border="1px solid"
                    borderColor="red.500"
                    color={declinedRequestID === request.id ? "white" : "red.500"}
                    _hover={{ bg: "red.500", color: "white" }}
                  >
                    {declinedRequestID === request.id ? "Declined" : "Decline"}
                  </Button>
                </HStack>
              </Flex>
            </Box>
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

interface ProfileAvatarProps {
  s3_key?: string | null;
  name: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ s3_key, name }) => {
  const { profileImageSignedURL } = useAWS({
    s3_key: s3_key || undefined,
  });

  return (
    <Avatar
      size="md"
      src={profileImageSignedURL || undefined}
      name={name}
      bg="purple.500"
    />
  );
};

export default ProfileRequestsViewModal;
