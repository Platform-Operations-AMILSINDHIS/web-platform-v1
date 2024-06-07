import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { MatrimonyLoginValues } from "~/hooks/useForm";
import { useUserAtom } from "~/lib/atom";

import useServerActions from "~/hooks/useServerActions";
import ProfilesViewLayout from "~/layouts/ProfilesViewLayout";
import MatrimonyAuthModal from "~/components/authentication/MatrimonyAuthModal";

const ProfilePage = () => {
  const [{ user }] = useUserAtom();

  const { isOpen: isOpenAuth } = useDisclosure();
  const { isOpen: isOpenSelection } = useDisclosure();

  const { handleMatrimonyLogin } = useServerActions();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFormSubmit = async (
    values: MatrimonyLoginValues,
    { setErrors }: FormikHelpers<MatrimonyLoginValues>
  ) => {
    setIsSubmitting(true);
    const { loggedIn, message } = await handleMatrimonyLogin(
      values.matrimony_id,
      user?.id ?? ""
    );

    if (!loggedIn) {
      setErrors({ matrimony_id: message });
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    setIsLoggedIn(true);
  };

  return (
    <ProfilesViewLayout>
      <MatrimonyAuthModal
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        modalState={!isLoggedIn}
        handleModal={() => {}}
      />
      {isLoggedIn ? (
        <Flex flexDir="column">
          <Text fontSize={"2xl"} color="gray.600" fontWeight={600}>
            Matrimony Profiles
          </Text>
        </Flex>
      ) : (
        <></>
      )}
    </ProfilesViewLayout>
  );
};

export default ProfilePage;
