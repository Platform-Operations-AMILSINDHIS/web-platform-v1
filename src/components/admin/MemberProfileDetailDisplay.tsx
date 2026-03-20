import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { EmailIcon, CalendarIcon } from "@chakra-ui/icons";
import type { FetchProfileResponse } from "~/types/api";
import { calculateAge } from "~/utils/helper";

interface MemberProfileDetailDisplayProps {
  profileData: FetchProfileResponse;
  profileImageUrl: string | null;
}

const MemberProfileDetailDisplay: React.FC<MemberProfileDetailDisplayProps> = ({
  profileData,
  profileImageUrl,
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getMembershipBadges = (): React.ReactNode[] => {
    const badges: React.ReactNode[] = [];
    if (profileData.KAP_member) {
      badges.push(
        <Badge key="kap" colorScheme="purple" variant="solid" borderRadius="full" px={3} py={1} fontSize="xs">
          KAP Member
        </Badge>
      );
    }
    if (profileData.YAC_member) {
      badges.push(
        <Badge key="yac" colorScheme="blue" variant="solid" borderRadius="full" px={3} py={1} fontSize="xs">
          YAC Member
        </Badge>
      );
    }
    if (badges.length === 0) {
      badges.push(
        <Badge key="none" colorScheme="gray" variant="outline" borderRadius="full" px={3} py={1} fontSize="xs">
          No Active Membership
        </Badge>
      );
    }
    return badges;
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.100"
      overflow="hidden"
      w="full"
    >
      {/* Colored header band */}
      <Box h="6px" bg="linear-gradient(90deg, #FF4D00, #FF8C00)" />

      <Flex p={6} gap={5} align="flex-start" flexWrap="wrap">
        {/* Avatar */}
        <Avatar
          src={profileImageUrl ?? undefined}
          name={`${profileData.first_name} ${profileData.last_name}`}
          size="xl"
          borderRadius="lg"
          border="3px solid"
          borderColor="orange.100"
        />

        {/* Name + username + badges */}
        <VStack align="start" spacing={1} flex={1} minW="200px">
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" lineHeight="shorter">
            {profileData.first_name} {profileData.last_name}
          </Text>
          <Text fontSize="sm" color="gray.400">
            @{profileData.account_name}
          </Text>
          <Flex gap={2} mt={1} flexWrap="wrap">
            {getMembershipBadges()}
            {profileData.membership_id && (
              <Badge colorScheme="orange" variant="subtle" borderRadius="full" px={3} py={1} fontSize="xs">
                ID: {profileData.membership_id}
              </Badge>
            )}
          </Flex>
        </VStack>

        {/* Secondary info: email + member since */}
        <VStack align="end" spacing={2} minW="200px">
          <Flex align="center" gap={2} color="gray.500">
            <EmailIcon boxSize={3.5} />
            <Text fontSize="sm">{profileData.email_id}</Text>
          </Flex>
          <Flex align="center" gap={2} color="gray.500">
            <CalendarIcon boxSize={3.5} />
            <Text fontSize="sm">Since {formatDate(profileData.created_at)}</Text>
          </Flex>
        </VStack>
      </Flex>

      <Divider borderColor="gray.100" />

      {/* Details Grid */}
      <Box px={6} py={4}>
        <HStack spacing={8} w="full" flexWrap="wrap">
          <Box minW="120px">
            <Text fontSize="xs" color="gray.400" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
              Date of Birth
            </Text>
            <Text fontSize="md" color="gray.800" fontWeight="semibold" mt={0.5}>
              {profileData.date_of_birth
                ? new Date(profileData.date_of_birth).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </Text>
          </Box>

          <Box minW="80px">
            <Text fontSize="xs" color="gray.400" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
              Age
            </Text>
            <Text fontSize="md" color="gray.800" fontWeight="semibold" mt={0.5}>
              {profileData.date_of_birth
                ? `${calculateAge(profileData.date_of_birth) ?? "—"} yrs`
                : "N/A"}
            </Text>
          </Box>

          <Box minW="100px">
            <Text fontSize="xs" color="gray.400" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
              Gender
            </Text>
            <Text fontSize="md" color="gray.800" fontWeight="semibold" mt={0.5}>
              {profileData.gender ?? "N/A"}
            </Text>
          </Box>

          {profileData.membership_id && (
            <Box minW="180px">
              <Text fontSize="xs" color="gray.400" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
                Membership ID
              </Text>
              <Text fontSize="md" color="orange.600" fontWeight="bold" fontFamily="mono" mt={0.5}>
                {profileData.membership_id}
              </Text>
            </Box>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default MemberProfileDetailDisplay;
