import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useServerActions from "~/hooks/useServerActions";
import ProfileViewLayout from "~/layouts/ProfileViewLayout";

const SlugPage = () => {
  const { handleFetchUserSubmission } = useServerActions();
  const router = useRouter();

  return (
    <ProfileViewLayout>
      <Text>Hi there welcome</Text>
    </ProfileViewLayout>
  );
};

export default SlugPage;
