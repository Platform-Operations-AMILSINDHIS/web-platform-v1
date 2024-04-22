import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useServerActions from "~/hooks/useServerActions";
import ProfileViewLayout from "~/layouts/ProfileViewLayout";

const SlugPage = () => {
  const { handleFetchUserSubmission } = useServerActions();
  const router = useRouter();

  useEffect(() => {
    const handleSlug = async () => {
      const slug: string = (await router.query.slug) as string;
      const parts = slug?.split(".");

      console.log({
        user_id: parts[0],
        formType: parts[1],
      });
    };

    handleSlug();
  }, []);

  return (
    <ProfileViewLayout>
      <Text>Hi there welcome</Text>
    </ProfileViewLayout>
  );
};

export default SlugPage;
