import { Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useServerActions from "~/hooks/useServerActions";
import ProfileViewLayout from "~/layouts/ProfileViewLayout";
import { useProfileAtom } from "~/lib/atom";
import { KAPMembershipFormValues } from "~/types/forms/membership";

const SlugPage = () => {
  const [{ selected_profile }] = useProfileAtom();
  const { handleFetchUserSubmission } = useServerActions();

  const [submissionValues, setSubmissionValues] =
    useState<KAPMembershipFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [slugValue, setSlugValue] = useState<string[]>([]);

  useEffect(() => {
    const handleSlug = async () => {
      setLoading(true);

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
        setLoading(false);
      }
    };

    handleSlug();
  }, [selected_profile]);

  return (
    <>
      {submissionValues ? (
        <ProfileViewLayout submission={submissionValues}>
          <Text>Hi</Text>
        </ProfileViewLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SlugPage;
