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

const SlugPage = () => {
  const [{ selected_profile }] = useProfileAtom();
  const { handleFetchUserSubmission, handleAcceptingUserApplication } =
    useServerActions();

  const [submissionValues, setSubmissionValues] = useState<
    KAPMembershipFormValues | MatrimonyFormValues
  >();

  useEffect(() => {
    const handleSubmissionSlug = async () => {
      const response = await handleFetchUserSubmission(
        selected_profile?.user_id ?? "",
        selected_profile?.formType ?? ""
      );

      if (response && response.length > 0) {
        if (["KAP", "YAC"].includes(selected_profile?.formType)) {
          const user_submission = await response[0]?.submission;
          const submission_data = {
            personalInfo: user_submission?.personalInfo,
            addressInfo: user_submission?.addressInfo,
            familyMembers: user_submission?.familyMembers,
            proposerInfo: user_submission?.proposerInfo,
            membershipInfo: user_submission?.membershipInfo,
          };
          setSubmissionValues(submission_data);
        } else {
          const user_matrimony_submission = await response[0]?.submission;
          const matrimony_submission_data = {
            personalInfo: user_matrimony_submission?.personalInfo,
            familyMembers: user_matrimony_submission?.familyMembers,
            residentialAddressDetails:
              user_matrimony_submission?.residentialAddressDetail,
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
      selected_profile?.user_id ?? ""
    );
  };

  console.log({
    selected_profile,
    submissionValues,
  });

  return (
    <>
      {["KAP", "YAC"].includes(selected_profile?.formType) ? (
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
