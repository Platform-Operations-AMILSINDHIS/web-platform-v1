/* eslint-disable */
// @ts-nocheck
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MatrimonyProfileContainer from "~/components/admin/MatrimonyProfileContainer";
import MemberProfileDetailDisplay from "~/components/admin/MemberProfileDetailDisplay";
import AdminMatrimonyPhotoUpload from "~/components/admin/AdminMatrimonyPhotoUpload";
import LinkButton from "~/components/buttons/LinkButton";
import useServerActions from "~/hooks/useServerActions";
import ProfileViewLayout from "~/layouts/ProfileViewLayout";
import { useProfileAtom } from "~/lib/atom";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { KAPMembershipFormValues } from "~/types/forms/membership";
import { Status } from "~/types/tables/dataBuffer";

const SlugPage = () => {
  const [{ selected_profile }] = useProfileAtom();
  const {
    handleFetchProfileDetails,
    handleFetchUserSubmission,
    handleAcceptingUserApplication,
    handleRejectingUserApplication,
  } = useServerActions();

  const [submissionValues, setSubmissionValues] = useState<
    KAPMembershipFormValues | MatrimonyFormValues
  >();

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [profileDetails, setProfileDetails] =
    useState<FetchProfileResponse | null>(null);

  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);

  const [isGeneratingID, setIsGeneratingID] = useState<boolean>(false);
  const [isSendingMail, setIsSendingMail] = useState<boolean>(false);
  const [isApprovingApplication, setIsApprovingApplication] =
    useState<boolean>(false);
  const [isRejectingApplication, setIsRejectingApplication] =
    useState<boolean>(false);

  useEffect(() => {
    const initiateFetch = async () => {
      if (selected_profile?.user_id) {
        setIsLoadingProfile(true);
        try {
          const response = await handleFetchProfileDetails(
            selected_profile.user_id,
            true
          );

          if (response) {
            console.log({ response_slugPage: response });
            setProfileDetails(response.profileData);
            setProfilePicture(response.profileImageURL);
          }
        } catch (error) {
          console.error("Error fetching profile details:", error);
        } finally {
          setIsLoadingProfile(false);
        }
      } else {
        return;
      }
    };
    const handleSubmissionSlug = async () => {
      if (!selected_profile?.user_id) return;
      
      console.log({
        selected_profile_id: selected_profile?.user_id,
        check: "true",
      });
      const response = await handleFetchUserSubmission(
        selected_profile.user_id,
        selected_profile.formType ?? ""
      );

      if (response) {
        if (["KAP", "YAC"].includes(selected_profile?.formType)) {
          const user_submission = await response?.submission;
          const submission_data = {
            personalInfo: user_submission?.personalInfo,
            addressInfo: user_submission?.addressInfo,
            familyMembers: user_submission?.familyMembers,
            proposerInfo: user_submission?.proposerInfo,
            membershipInfo: user_submission?.membershipInfo,
          };
          setSubmissionValues(submission_data);
          console.log({ submission_data });
        } else {
          const user_matrimony_submission = await response?.submission;
          const matrimony_submission_data = {
            personalInfo: user_matrimony_submission?.personalInfo,
            familyMembers: user_matrimony_submission?.familyMembers,
            residentialAddressDetails:
              user_matrimony_submission?.residentialAddressDetails,
            spousePreferences: user_matrimony_submission?.spousePreferences,
            proposerInfo: user_matrimony_submission?.proposerInfo,
          };
          setSubmissionValues(matrimony_submission_data);
        }
      }
    };

    handleSubmissionSlug();
    initiateFetch();
  }, [selected_profile]);

  const handleApp = async (submissionValues: KAPMembershipFormValues) => {
    handleAcceptingUserApplication(
      selected_profile?.formType ?? "",
      submissionValues.personalInfo.emailId,
      selected_profile?.user_id ?? "",
      selected_profile?.isMember,
      setIsGeneratingID,
      setIsSendingMail,
      setIsApprovingApplication
    );
  };

  const handleReject = async (submissionValues: KAPMembershipFormValues) => {
    handleRejectingUserApplication(
      selected_profile?.formType ?? "",
      submissionValues.personalInfo.emailId,
      selected_profile?.user_id ?? "",
      selected_profile?.isMember,
      setIsGeneratingID,
      setIsSendingMail,
      setIsRejectingApplication
    );
  };

  return (
    <Box maxW="1200px" mx="auto" px={6} py={6}>
      {/* Back to Dashboard */}
      <Button
        leftIcon={<ArrowBackIcon />}
        variant="ghost"
        size="sm"
        color="gray.500"
        _hover={{ color: "gray.800", bg: "gray.100" }}
        mb={5}
        onClick={() => (window.location.href = "/admin")}
      >
        Back to Dashboard
      </Button>

      {/* Display Profile Details Card */}
      {isLoadingProfile ? (
        <Flex justify="center" py={10}>
          <Spinner size="lg" color="orange.400" />
        </Flex>
      ) : profileDetails ? (
        <MemberProfileDetailDisplay
          profileData={profileDetails}
          profileImageUrl={profilePicture}
        />
      ) : null}

      <Divider my={6} borderColor="gray.200" />

      {["KAP", "YAC"].includes(selected_profile?.formType) ? (
        <>
          {submissionValues ? (
            <ProfileViewLayout
              formType={selected_profile?.formType}
              submission={submissionValues}
            >
              {/* Display only if isMember is not true (New Applicants) */}
              {!selected_profile?.isMember &&
                (selected_profile?.status !== "PENDING" ? (
                  <></>
                ) : (
                  <Text
                    my={5}
                    px={4}
                    py={2.5}
                    borderRadius={5}
                    width="fit-content"
                    bg="yellow.200"
                    fontWeight={700}
                  >{`Payment UPI ID : ${selected_profile.paymentID}`}</Text>
                ))}
              <Flex
                display={
                  selected_profile?.status === Status.APPROVED ? "none" : "flex"
                }
                gap={3}
                my={5}
              >
                <LinkButton
                  onClick={() => handleReject(submissionValues)}
                  py={3}
                  CTAlabel={
                    isRejectingApplication ? (
                      <Flex gap={2} align={"center"}>
                        <Spinner /> {`Loading`}
                      </Flex>
                    ) : (
                      "Reject"
                    )
                  }
                />
                <LinkButton
                  onClick={() => handleApp(submissionValues)}
                  py={3}
                  CTATheme={false}
                  CTAlabel={
                    isApprovingApplication ? (
                      <Flex gap={2} align={"center"}>
                        <Spinner />{" "}
                        {isGeneratingID
                          ? `Generating ID`
                          : isSendingMail
                          ? `Sending Mail`
                          : `Loading`}
                      </Flex>
                    ) : (
                      <Text>Approve</Text>
                    )
                  }
                />
              </Flex>
            </ProfileViewLayout>
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <>
          <MatrimonyProfileContainer
            user_id={selected_profile?.user_id}
            submission={submissionValues}
          />
          {selected_profile?.status === Status.APPROVED && selected_profile?.user_id && (
            <AdminMatrimonyPhotoUpload user_id={selected_profile.user_id} />
          )}
        </>
      )}
    </Box>
  );
};

export default SlugPage;
