import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LinkButton from "~/components/buttons/LinkButton";
import useServerActions from "~/hooks/useServerActions";
import ProfileViewLayout from "~/layouts/ProfileViewLayout";
import { useProfileAtom } from "~/lib/atom";
import { KAPMembershipFormValues } from "~/types/forms/membership";

const SlugPage = () => {
  const [{ selected_profile }] = useProfileAtom();
  const { handleFetchUserSubmission, handleAcceptingUserApplication } =
    useServerActions();

  const [submissionValues, setSubmissionValues] =
    useState<KAPMembershipFormValues>();

  useEffect(() => {
    const handleSlug = async () => {
      const response = await handleFetchUserSubmission(
        selected_profile?.user_id ?? "",
        selected_profile?.formType ?? ""
      );

      if (response && response.length > 0) {
        const user_submission = await response[0]?.submission;
        const submission_data = {
          personalInfo: user_submission?.personalInfo,
          addressInfo: user_submission?.addressInfo,
          familyMembers: user_submission?.familyMembers,
          proposerInfo: user_submission?.proposerInfo,
          membershipInfo: user_submission?.membershipInfo,
        };
        setSubmissionValues(submission_data);
      }
    };

    handleSlug();
  }, [selected_profile]);

  const handleApp = async (submissionValues: KAPMembershipFormValues) => {
    handleAcceptingUserApplication(
      selected_profile?.formType ?? "",
      submissionValues.personalInfo.emailId,
      selected_profile?.user_id ?? ""
    );
  };

  return (
    <>
      {submissionValues ? (
        <ProfileViewLayout submission={submissionValues}>
          <Flex gap={3} my={5}>
            <LinkButton py={3} CTAlabel="Reject" />
            <LinkButton
              onClick={() => handleApp(submissionValues)}
              py={3}
              CTATheme={false}
              CTAlabel="Approve"
            />
          </Flex>
        </ProfileViewLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SlugPage;
