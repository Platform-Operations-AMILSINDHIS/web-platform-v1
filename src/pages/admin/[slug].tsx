/* eslint-disable */
// @ts-nocheck
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MatrimonyProfileContainer from "~/components/admin/MatrimonyProfileContainer";
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
    handleFetchUserSubmission,
    handleAcceptingUserApplication,
    handleRejectingUserApplication,
  } = useServerActions();

  const [submissionValues, setSubmissionValues] = useState<
    KAPMembershipFormValues | MatrimonyFormValues
  >();

  const [isGeneratingID, setIsGeneratingID] = useState<boolean>(false);
  const [isSendingMail, setIsSendingMail] = useState<boolean>(false);
  const [isApprovingApplication, setIsApprovingApplication] =
    useState<boolean>(false);
  const [isRejectingApplication, setIsRejectingApplication] =
    useState<boolean>(false);

  useEffect(() => {
    const handleSubmissionSlug = async () => {
      console.log({
        selected_profile_id: selected_profile?.user_id,
        check: "true",
      });
      const response = await handleFetchUserSubmission(
        selected_profile?.user_id ?? "",
        selected_profile?.formType ?? ""
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
    <>
      {["KAP", "YAC"].includes(selected_profile?.formType) ? (
        <>
          {submissionValues ? (
            <ProfileViewLayout submission={submissionValues}>
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
        <MatrimonyProfileContainer
          user_id={selected_profile?.user_id}
          submission={submissionValues}
        />
      )}
    </>
  );
};

export default SlugPage;
