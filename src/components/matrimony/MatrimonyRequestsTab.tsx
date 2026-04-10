// src/components/matrimony/MatrimonyRequestsTab.tsx
import { Badge, Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { BsHeartFill } from "react-icons/bs";
import type { ProfileRequestsFetchResponse } from "~/types/api";

interface MatrimonyRequestsTabProps {
  requests: ProfileRequestsFetchResponse[];
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
  return new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const MatrimonyRequestsTab: React.FC<MatrimonyRequestsTabProps> = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <Flex py={16} align="center" justify="center" flexDir="column" gap={4} color="gray.400">
        <Icon as={BsHeartFill} boxSize={12} color="orange.200" />
        <Text fontWeight={700} fontSize="lg" color="gray.500">
          No requests sent yet
        </Text>
        <Text fontSize="sm" color="gray.400" textAlign="center" maxW="320px">
          Browse profiles and request the ones you&apos;re interested in — they&apos;ll appear here.
        </Text>
      </Flex>
    );
  }

  return (
    <VStack spacing={3} align="stretch">
      {requests.map((request) => (
        <Flex
          key={request.id}
          p={4}
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="xl"
          bg="white"
          boxShadow="sm"
          align="center"
          justify="space-between"
          _hover={{ borderColor: "orange.200", boxShadow: "md" }}
          transition="all 0.15s"
        >
          <Box>
            <Text fontWeight={700} fontSize="md" color="gray.800">
              {request.requested_name}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={0.5}>
              ID: {request.requested_id}
            </Text>
            <Text fontSize="xs" color="gray.400" mt={0.5}>
              {formatRelativeTime(request.created_at)}
            </Text>
          </Box>
          <Badge
            colorScheme="yellow"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight={700}
          >
            Pending
          </Badge>
        </Flex>
      ))}
    </VStack>
  );
};

export default MatrimonyRequestsTab;
