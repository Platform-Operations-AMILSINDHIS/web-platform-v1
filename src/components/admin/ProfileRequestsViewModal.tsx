import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalLayout from "~/layouts/ModalLayout";
import type { ProfileRequestsDataType } from "~/types/requests";
import { HiArrowNarrowRight } from "react-icons/hi";
import useServerActions from "~/hooks/useServerActions";
import { useState } from "react";
import useAWS from "~/hooks/useAWS";

interface ProfileRequestsViewModalProps {
  handleModal: () => void;
  modalState: boolean;
  matrimonyProfileRequests: ProfileRequestsDataType[];
}

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

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

  const [acceptingRequestId, setAcceptingRequestId] = useState<number | null>(null);
  const [decliningRequestId, setDecliningRequestId] = useState<number | null>(null);
  const [processedIds, setProcessedIds] = useState<Set<number>>(new Set());

  const handleAcceptRequest = async (
    matrimony_id: string,
    email_id: string,
    id: number,
    requested_id: string,
    requested_name: string
  ) => {
    setAcceptingRequestId(id);
    try {
      const matrimony_profile_data = await handleMatrimonyProfileFetch(matrimony_id);
      const userId = matrimony_profile_data[0]?.user_id;
      if (!userId) {
        toast({ title: "Error", description: "Could not find user profile", status: "error", duration: 3000 });
        return;
      }
      const requested_profile_buffer_data = await handleFetchUserSubmission(userId, "MATRIMONY");
      if (requested_profile_buffer_data) {
        const { message, toastType } = await handleAcceptMatrimonyProfileRequest(
          requested_profile_buffer_data.submission,
          email_id, id, requested_id, requested_name
        );
        setProcessedIds((prev) => new Set(prev).add(id));
        toast({ title: "Request Accepted", description: message, status: toastType as "success", duration: 3000, isClosable: true });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to accept request", status: "error", duration: 3000 });
    } finally {
      setAcceptingRequestId(null);
    }
  };

  const handleDeclineRequest = async (
    email_id: string,
    id: number,
    requested_id: string,
    requested_name: string
  ) => {
    setDecliningRequestId(id);
    try {
      const { message, toastType } = await handleDeclineMatrimonyProfileRequest(
        email_id, id, requested_id, requested_name
      );
      setProcessedIds((prev) => new Set(prev).add(id));
      toast({ title: "Request Declined", description: message, status: toastType as "error", duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: "Error", description: "Failed to decline request", status: "error", duration: 3000 });
    } finally {
      setDecliningRequestId(null);
    }
  };

  const pendingRequests = matrimonyProfileRequests.filter((r) => !processedIds.has(r.id));

  return (
    <ModalLayout
      modalSize="4xl"
      handleModal={handleModal}
      modalState={modalState}
      modalHeader="Profile Requests"
    >
      {/* Count header */}
      <Flex align="center" gap={3} mb={4}>
        <Badge
          colorScheme={pendingRequests.length > 0 ? "orange" : "gray"}
          variant="solid"
          borderRadius="full"
          fontSize="sm"
          px={3}
          py={1}
        >
          {pendingRequests.length} Pending
        </Badge>
        <Text fontSize="sm" color="gray.400">
          {matrimonyProfileRequests.length} total request{matrimonyProfileRequests.length !== 1 ? "s" : ""}
        </Text>
      </Flex>

      {/* Empty state */}
      {pendingRequests.length === 0 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={12}
          gap={3}
          color="gray.400"
        >
          <Text fontSize="3xl">💌</Text>
          <Text fontWeight="semibold" fontSize="md" color="gray.500">
            No pending profile requests
          </Text>
          <Text fontSize="sm">
            All requests have been reviewed.
          </Text>
        </Flex>
      )}

      {/* Request cards */}
      <Flex gap={3} flexDir="column">
        {pendingRequests.map((request) => (
          <Box
            key={request.id}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="xl"
            p={4}
            bg="white"
            boxShadow="sm"
            _hover={{ boxShadow: "md", borderColor: "orange.200" }}
            transition="all 0.2s"
          >
            {/* Timestamp + email row */}
            <Flex justify="space-between" align="center" mb={3}>
              <Flex align="center" gap={2}>
                <Text fontSize="xs" color="gray.400">
                  From:
                </Text>
                <Text fontSize="xs" color="gray.600" fontWeight="medium">
                  {request.email_id}
                </Text>
              </Flex>
              <Tooltip
                label={new Date(request.created_at).toLocaleString("en-IN")}
                placement="top"
                hasArrow
              >
                <Text fontSize="xs" color="gray.400" cursor="default">
                  {formatRelativeTime(request.created_at)}
                </Text>
              </Tooltip>
            </Flex>

            <Divider mb={3} borderColor="gray.100" />

            {/* Two-column person layout */}
            <Flex align="center" gap={3}>
              {/* Requestee */}
              <Flex flex={1} align="center" gap={3} minW={0}>
                <ProfileAvatar
                  s3_key={request.requestee_profile_s3_key ?? request.requestee_matrimony_s3_key ?? null}
                  name={request.requestee_name}
                  size="lg"
                />
                <VStack align="start" spacing={0.5} minW={0}>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.800" noOfLines={1}>
                    {request.requestee_name}
                  </Text>
                  <Badge colorScheme="purple" variant="subtle" borderRadius="full" fontSize="xs" px={2}>
                    {request.requestee_id}
                  </Badge>
                  <Text fontSize="xs" color="gray.400">Requester</Text>
                </VStack>
              </Flex>

              {/* Arrow */}
              <Flex flexDir="column" align="center" flexShrink={0} gap={1}>
                <Icon as={HiArrowNarrowRight} boxSize={6} color="orange.400" />
                <Text fontSize="9px" color="gray.300" textTransform="uppercase" letterSpacing="wide">
                  requested
                </Text>
              </Flex>

              {/* Requested */}
              <Flex flex={1} align="center" gap={3} minW={0}>
                <ProfileAvatar
                  s3_key={request.requested_profile_s3_key ?? request.requested_matrimony_s3_key ?? null}
                  name={request.requested_name}
                  size="lg"
                />
                <VStack align="start" spacing={0.5} minW={0}>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.800" noOfLines={1}>
                    {request.requested_name}
                  </Text>
                  <Badge colorScheme="green" variant="subtle" borderRadius="full" fontSize="xs" px={2}>
                    {request.requested_id}
                  </Badge>
                  <Text fontSize="xs" color="gray.400">Requested Profile</Text>
                </VStack>
              </Flex>

              {/* Action buttons */}
              <Flex flexDir="column" gap={2} flexShrink={0}>
                <Button
                  size="sm"
                  colorScheme="green"
                  leftIcon={acceptingRequestId === request.id ? <Spinner size="xs" /> : <CheckIcon />}
                  isLoading={acceptingRequestId === request.id}
                  isDisabled={decliningRequestId === request.id}
                  onClick={() =>
                    void handleAcceptRequest(
                      request.requested_id,
                      request.email_id,
                      request.id,
                      request.requested_id,
                      request.requested_name
                    )
                  }
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  leftIcon={decliningRequestId === request.id ? <Spinner size="xs" /> : <CloseIcon boxSize={2.5} />}
                  isLoading={decliningRequestId === request.id}
                  isDisabled={acceptingRequestId === request.id}
                  onClick={() =>
                    void handleDeclineRequest(
                      request.email_id,
                      request.id,
                      request.requested_id,
                      request.requested_name
                    )
                  }
                >
                  Decline
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Flex>

      <Flex my={3} justify="flex-end">
        <Button
          variant="ghost"
          color="gray.500"
          onClick={handleModal}
          size="sm"
        >
          Close
        </Button>
      </Flex>
    </ModalLayout>
  );
};

interface ProfileAvatarProps {
  s3_key?: string | null;
  name: string;
  size?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ s3_key, name, size = "md" }) => {
  const { profileImageSignedURL } = useAWS({
    s3_key: s3_key ?? undefined,
  });

  return (
    <Avatar
      size={size}
      src={profileImageSignedURL || undefined}
      name={name}
      bg="purple.400"
      borderRadius="lg"
      flexShrink={0}
    />
  );
};

export default ProfileRequestsViewModal;
