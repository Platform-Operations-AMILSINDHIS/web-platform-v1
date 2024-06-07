import { Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

  const handleFormSubmit = (values: MatrimonyLoginValues) => {
    console.log("Submitted", { values });
  };

  return (
    <ProfilesViewLayout>
      <MatrimonyAuthModal
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        modalState={true}
        handleModal={() => {}}
      />
      {isLoggedIn ? <Text>Hi, Welcome to profile page</Text> : <></>}
    </ProfilesViewLayout>
  );
};

export default ProfilePage;
