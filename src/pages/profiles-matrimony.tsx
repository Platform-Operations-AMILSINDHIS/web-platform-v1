import { Text, useDisclosure } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { useState } from "react";
import MatrimonyAuthModal from "~/components/authentication/MatrimonyAuthModal";
import { MatrimonyLoginValues } from "~/hooks/useForm";
import useServerActions from "~/hooks/useServerActions";
import ProfilesViewLayout from "~/layouts/ProfilesViewLayout";

const ProfilePage = () => {
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
      values.matrimony_id
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
      {isLoggedIn ? <Text>Hi, Welcome to profile page</Text> : <></>}
    </ProfilesViewLayout>
  );
};

export default ProfilePage;
