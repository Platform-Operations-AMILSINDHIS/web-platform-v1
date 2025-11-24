import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  Button,
  Badge,
  Grid,
  GridItem,
  SimpleGrid,
  Divider,
  Image,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "~/components/layout";
import useAWS from "~/hooks/useAWS";
import useProfile from "~/hooks/useProfile";
import EditProfilePicture from "~/components/profile/EditProfilePicture";

const MyProfilePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { profileData, isLoadingProfileData, profileFetchError, refetch } =
    useProfile({
      user_id: slug as string,
    });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Extract S3 key from profile data
  const profileImageMeta = profileData?.application_s3_meta?.find(
    (app_s3_meta) => app_s3_meta.file_type === "profile_image"
  );
  const profileImageS3Key = profileImageMeta?.s3_key;

  // Pass to AWS Hook
  const {
    fetchingPorfileImageError,
    profileImageSignedURL,
    isFetchingProfileImage,
  } = useAWS({ s3_key: profileImageS3Key });

  const handleProfilePictureSuccess = () => {
    // Refetch profile data which will trigger useAWS hook to re-fetch the signed URL
    refetch();
  };

  console.log({ profileData, profileImageSignedURL });

  if (profileFetchError) {
    return (
      <Layout title="MyProfile">
        <Text color="red.500">{profileFetchError}</Text>
      </Layout>
    );
  }

  if (isLoadingProfileData) {
    return (
      <Layout title="MyProfile">
        <Flex justify="center" align="center" minH="80vh">
          <VStack spacing={4}>
            <Spinner size="xl" color="#FF4D00" thickness="4px" />
            <Text color="gray.600">Loading profile...</Text>
          </VStack>
        </Flex>
      </Layout>
    );
  }

  // Extract data from profileData
  // Use form_buffer data only if it exists (membership profile submitted)
  const hasFormBuffer =
    profileData?.form_buffer && profileData.form_buffer.length > 0;
  const personalInfo = hasFormBuffer
    ? profileData?.form_buffer?.[0]?.submission?.personalInfo
    : null;
  const addressInfo = hasFormBuffer
    ? profileData?.form_buffer?.[0]?.submission?.addressInfo?.residentialAddress
    : null;
  const membershipInfo = hasFormBuffer
    ? profileData?.form_buffer?.[0]?.submission?.membershipInfo
    : null;
  const familyMembers = hasFormBuffer
    ? profileData?.form_buffer?.[0]?.submission?.familyMembers
    : null;
  const status = hasFormBuffer ? profileData?.form_buffer?.[0]?.status : null;

  // Primary data from general profile (always available)
  const firstName = profileData?.first_name || personalInfo?.firstName;
  const lastName = profileData?.last_name || personalInfo?.lastName;
  const email = profileData?.email_id;
  const accountName = profileData?.account_name;

  return (
    <Layout title="MyProfile">
      <Box minH="100vh" py={8}>
        <Container maxW="container.lg">
          {/* Main Profile Card */}
          <Box
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            {/* Orange Gradient Header */}
            <Box
              h="200px"
              bgGradient="linear(to-r, #FF4D00, #FF8C42, #FFB84D)"
              position="relative"
            />

            {/* Profile Content */}
            <Box px={8} pb={8}>
              {/* Avatar and Name Section */}
              <Flex
                align="flex-end"
                mt="-80px"
                mb={6}
                justify="space-between"
                flexWrap="wrap"
                gap={4}
              >
                <Flex align="flex-end" gap={6}>
                  <Box position="relative">
                    {/* Profile Image with Loading States */}
                    {isFetchingProfileImage ? (
                      // Loading state
                      <Box
                        boxSize="140px"
                        borderRadius="full"
                        border="4px solid white"
                        boxShadow="xl"
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Spinner color="#FF4D00" size="lg" />
                      </Box>
                    ) : profileImageSignedURL && !fetchingPorfileImageError ? (
                      // Image loaded successfully
                      <Image
                        src={profileImageSignedURL}
                        alt="Profile"
                        boxSize="140px"
                        borderRadius="full"
                        border="4px solid white"
                        boxShadow="xl"
                        objectFit="cover"
                      />
                    ) : (
                      // Fallback to Avatar if no image or error
                      <Avatar
                        size="2xl"
                        name={`${firstName} ${lastName}`}
                        border="4px solid white"
                        boxShadow="xl"
                        bg="purple.500"
                      />
                    )}

                    {/* Status Badge */}
                    {status !== "PENDING" && membershipInfo?.membershipType && (
                      <Badge
                        position="absolute"
                        bottom="2"
                        left="50%"
                        transform="translateX(-50%)"
                        colorScheme="green"
                        fontSize="xs"
                        borderRadius="full"
                        px={3}
                        py={1}
                        textTransform="uppercase"
                      >
                        {membershipInfo.membershipType}
                      </Badge>
                    )}
                  </Box>
                </Flex>

                <HStack spacing={3} pb={2}>
                  <Button
                    size="md"
                    variant="outline"
                    borderColor="gray.300"
                    color="gray.700"
                    _hover={{ bg: "gray.50" }}
                  >
                    Matrimony Profiles
                  </Button>
                  <Button
                    size="md"
                    bg="#FF4D00"
                    color="white"
                    _hover={{ bg: "#E64500" }}
                    onClick={onOpen}
                  >
                    Edit Profile Picture
                  </Button>
                </HStack>
              </Flex>

              {/* Name and Contact Info */}
              <Flex flexDir={"column"} marginBottom={2}>
                <Text fontSize="3xl" fontWeight={600} color="gray.800">
                  {firstName}{" "}
                  {personalInfo?.middleName
                    ? `${personalInfo.middleName} `
                    : ""}
                  {lastName}
                </Text>
                <Text color="gray.500" fontSize="md">
                  @{accountName}
                </Text>
                <Text color="gray.600" fontSize="md">
                  {email}
                </Text>
              </Flex>

              <Divider borderColor="gray.200" borderWidth="1px" my={4} />

              {/* Personal Information - Only show if membership profile exists */}
              {hasFormBuffer && personalInfo ? (
                <Box mb={8}>
                  <Text color="gray.900" fontSize="xl" fontWeight="bold" mb={4}>
                    Personal Information
                  </Text>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={4}
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    p={6}
                  >
                    <InfoField
                      label="Maiden Name"
                      value={personalInfo?.maidenName}
                    />
                    <InfoField
                      label="Date of Birth"
                      value={
                        personalInfo?.dateOfBirth
                          ? new Date(
                              personalInfo.dateOfBirth
                            ).toLocaleDateString()
                          : "N/A"
                      }
                    />
                    <InfoField
                      label="Occupation"
                      value={personalInfo?.occupation}
                    />
                    <InfoField
                      label="Mobile"
                      value={personalInfo?.mobileNumber}
                    />
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <InfoField label="Email" value={personalInfo?.emailId} />
                    </GridItem>
                  </Grid>
                </Box>
              ) : null}

              {/* Family Information - Only show if membership profile exists */}
              {hasFormBuffer && personalInfo ? (
                <Box mb={8}>
                  <Text color="gray.900" fontSize="xl" fontWeight="bold" mb={4}>
                    Family Information
                  </Text>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={4}
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    p={6}
                  >
                    <InfoField
                      label="Father's Name"
                      value={personalInfo?.fathersName}
                    />
                    <InfoField
                      label="Mother's Name"
                      value={personalInfo?.mothersName}
                    />

                    {familyMembers && familyMembers.length > 0 && (
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Box>
                          <Text
                            color="gray.700"
                            fontSize="sm"
                            fontWeight="semibold"
                            mb={3}
                          >
                            Family Members
                          </Text>
                          <VStack spacing={2} align="stretch">
                            {familyMembers.map((member: any, index: number) => (
                              <Box
                                key={index}
                                bg="gray.50"
                                p={4}
                                borderRadius="md"
                                borderWidth="1px"
                                borderColor="gray.200"
                              >
                                <HStack justify="space-between">
                                  <VStack align="start" spacing={0}>
                                    <Text
                                      color="gray.900"
                                      fontWeight="semibold"
                                    >
                                      {member.memberName}
                                    </Text>
                                    <Text color="gray.600" fontSize="sm">
                                      {member.relationship} •{" "}
                                      {member.occupation}
                                    </Text>
                                  </VStack>
                                  <Text
                                    color="gray.600"
                                    fontSize="sm"
                                    fontWeight="medium"
                                  >
                                    Age {member.age}
                                  </Text>
                                </HStack>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      </GridItem>
                    )}
                  </Grid>
                </Box>
              ) : null}

              {/* Address Information - Only show if membership profile exists */}
              {hasFormBuffer && addressInfo ? (
                <Box>
                  <Text color="gray.900" fontSize="xl" fontWeight="bold" mb={4}>
                    Address Information
                  </Text>
                  <Box
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    p={6}
                  >
                    <VStack align="stretch" spacing={3}>
                      <Text
                        color="gray.700"
                        fontSize="sm"
                        fontWeight="semibold"
                      >
                        Residential Address
                      </Text>
                      <Text color="gray.800" fontSize="md">
                        {addressInfo?.addressLine1}
                        {addressInfo?.addressLine2 &&
                          `, ${addressInfo.addressLine2}`}
                        {addressInfo?.addressLine3 &&
                          `, ${addressInfo.addressLine3}`}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        PIN Code: {addressInfo?.pinCode}
                      </Text>
                    </VStack>
                  </Box>
                </Box>
              ) : null}

              {/* No Membership Profile Message */}
              {!hasFormBuffer && (
                <Box
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={8}
                  textAlign="center"
                >
                  <Text color="gray.600" fontSize="lg" mb={4}>
                    No membership profile submitted yet
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    Complete your membership profile to see detailed information
                    here
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Container>

        {/* Edit Profile Picture Modal */}
        <EditProfilePicture
          isOpen={isOpen}
          onClose={onClose}
          userId={slug as string}
          currentImageUrl={profileImageSignedURL}
          userName={`${firstName} ${lastName}`}
          onSuccess={handleProfilePictureSuccess}
        />
      </Box>
    </Layout>
  );
};

// Helper component for info fields
const InfoField = ({ label, value }: { label: string; value?: string }) => (
  <Box>
    <Text color="gray.600" fontSize="sm" fontWeight="semibold" mb={1}>
      {label}
    </Text>
    <Text color="gray.900" fontSize="md">
      {value || "N/A"}
    </Text>
  </Box>
);

export default MyProfilePage;
