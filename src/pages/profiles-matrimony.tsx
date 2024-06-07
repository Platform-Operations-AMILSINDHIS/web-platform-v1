import { Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import MatrimonyAuthModal from "~/components/authentication/MatrimonyAuthModal";
import ProfilesViewLayout from "~/layouts/ProfilesViewLayout";

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { isOpen: isOpenAuth } = useDisclosure();
  const { isOpen: isOpenSelection } = useDisclosure();

  return (
    <ProfilesViewLayout>
      <MatrimonyAuthModal modalState={true} handleModal={() => {}} />
      <Text>Hi, Welcome to profile page</Text>
    </ProfilesViewLayout>
  );
};

export default ProfilePage;
