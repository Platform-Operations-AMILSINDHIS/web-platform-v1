import { Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useServerActions from "~/hooks/useServerActions";
import ProfileViewLayout from "~/layouts/ProfileViewLayout";
import { KAPMembershipFormValues } from "~/types/forms/membership";

const SlugPage = () => {
  const { handleFetchUserSubmission } = useServerActions();
  const router = useRouter();

  const [submissionValues, setSubmissionValues] =
    useState<KAPMembershipFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [slugValue, setSlugValue] = useState<string[]>([]);

  useEffect(() => {
    const handleSlug = async () => {
      setLoading(true);
      const slug: string = (await router.query.slug) as string;
      const parts = await slug?.split(".");

      setSlugValue(parts);

      console.log({ slugValue });

      const response = await handleFetchUserSubmission(
        slugValue[0] ?? "",
        slugValue[1] ?? ""
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

      console.log({
        user_id: parts[0],
        formType: parts[1],
      });
    };

    handleSlug();
  }, [slugValue]);

  return (
    <>
      {submissionValues ? (
        <ProfileViewLayout submission={submissionValues}>
          <Text>Hi there welcome</Text>
        </ProfileViewLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SlugPage;
