import {
  Box,
  Text,
  Flex,
  Badge,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FetchProfileResponse } from "~/types/api";

interface MemberProfileDetailDisplayProps {
  profileData: FetchProfileResponse;
}

const MemberProfileDetailDisplay: React.FC<MemberProfileDetailDisplayProps> = ({
  profileData,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getMembershipBadges = (): React.ReactNode[] => {
    const badges: React.ReactNode[] = [];
    if (profileData.KAP_member) {
      badges.push(
        <Badge key="kap" colorScheme="blue" variant="solid" px={3} py={1}>
          KAP Member
        </Badge>
      );
    }
    if (profileData.YAC_member) {
      badges.push(
        <Badge key="yac" colorScheme="green" variant="solid" px={3} py={1}>
          YAC Member
        </Badge>
      );
    }
    if (badges.length === 0) {
      badges.push(
        <Badge key="none" colorScheme="gray" variant="outline" px={3} py={1}>
          No Active Membership
        </Badge>
      );
    }
    return badges;
  };

  return (
    <Flex p={5} w="full" justify="center" mx="auto" maxW="1150px">
      <VStack align="start" spacing={4} w="full">
        {/* Header Section */}
        <Flex
          justify="space-between"
          align="center"
          w="full"
          flexWrap="wrap"
          gap={3}
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {profileData.first_name} {profileData.last_name}
            </Text>
            <Text fontSize="md" color="gray.600" mt={1}>
              @{profileData.account_name}
            </Text>
          </Box>
          <Flex gap={2} flexWrap="wrap">
            {getMembershipBadges()}
          </Flex>
        </Flex>

        <Divider />

        {/* Details Grid */}
        <VStack align="start" spacing={3} w="full">
          <HStack spacing={8} w="full" flexWrap="wrap">
            <Box minW="200px">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Email Address
              </Text>
              <Text fontSize="md" color="gray.800" fontWeight="semibold">
                {profileData.email_id}
              </Text>
            </Box>

            <Box minW="120px">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Age
              </Text>
              <Text fontSize="md" color="gray.800" fontWeight="semibold">
                {profileData.age} years
              </Text>
            </Box>

            <Box minW="120px">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Gender
              </Text>
              <Text fontSize="md" color="gray.800" fontWeight="semibold">
                {profileData.gender}
              </Text>
            </Box>
          </HStack>

          <HStack spacing={8} w="full" flexWrap="wrap">
            {profileData.membership_id && (
              <Box minW="200px">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Membership ID
                </Text>
                <Text fontSize="md" color="gray.800" fontWeight="semibold">
                  {profileData.membership_id}
                </Text>
              </Box>
            )}

            <Box minW="200px">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Member Since
              </Text>
              <Text fontSize="md" color="gray.800" fontWeight="semibold">
                {formatDate(profileData.created_at)}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default MemberProfileDetailDisplay;
