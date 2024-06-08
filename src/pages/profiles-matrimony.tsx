import { Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { MatrimonyLoginValues } from "~/hooks/useForm";
import { useUserAtom } from "~/lib/atom";

import useServerActions from "~/hooks/useServerActions";
import ProfilesViewLayout from "~/layouts/ProfilesViewLayout";
import MatrimonyAuthModal from "~/components/authentication/MatrimonyAuthModal";
import { MatrimonyProfilesFetchResponse } from "~/types/api";
import MatrimonyProfilesView from "~/components/matrimony/MatrimonyProfilesView";
import MatrimonyApplicationWithdrawModal from "~/components/matrimony/MatrimonyApplicationWithdrawModal";
import MatrimonyApplicationSelectionModal from "~/components/matrimony/MatrimonySelectionModal";

const ProfilePage = () => {
  const [{ user }] = useUserAtom();

  const {
    isOpen: isOpenWithdrawModal,
    onClose: onCloseWithdrawModal,
    onOpen: onOpenWithdrawModal,
  } = useDisclosure();

  const {
    isOpen: isOpenSelection,
    onClose: onCloseSelectionModal,
    onOpen: onOpenSelectionModal,
  } = useDisclosure();

  const {
    handleMatrimonyLogin,
    handleMatrimonyProfilesFetch,
    handleMatrimonyIdFetch,
  } = useServerActions();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [matrimoyID, setMatrimonyID] = useState<string>("");
  const [matrimonyProfiles, setMatrimonyProfiles] = useState<
    MatrimonyProfilesFetchResponse[]
  >([]);

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
    setMatrimonyID(values.matrimony_id);
    setIsSubmitting(false);
    setIsLoggedIn(true);
  };

  const handleCloseSelectProfileModal = (
    setProfileMatID: (profileMatID: string | undefined) => void,
    setFetchStatus: (status: boolean) => void
  ) => {
    setFetchStatus(false);
    setProfileMatID("");
    onCloseSelectionModal();
  };

  const fetchProfiles = async () => {
    const data = await handleMatrimonyProfilesFetch();
    if (data.length > 0 && isLoggedIn) {
      setMatrimonyProfiles(data);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [matrimonyProfiles, isLoggedIn]);

  return (
    <ProfilesViewLayout
      openSelectionModal={onOpenSelectionModal}
      openWithdrawModal={onOpenWithdrawModal}
    >
      <MatrimonyApplicationWithdrawModal
        handleModal={onCloseWithdrawModal}
        modalState={isOpenWithdrawModal}
      />
      <MatrimonyApplicationSelectionModal
        handleCloseSelectionModal={handleCloseSelectProfileModal}
        handleMatrimonyIDFetch={handleMatrimonyIdFetch}
        user={user}
        matrimonyProfiles={matrimonyProfiles}
        matrimonyID={matrimoyID}
        handleModal={onCloseSelectionModal}
        modalState={isOpenSelection}
      />
      <MatrimonyAuthModal
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        modalState={!isLoggedIn}
        handleModal={() => {}}
      />
      <MatrimonyProfilesView
        isLoggedIn={isLoggedIn}
        matrimonyProfiles={matrimonyProfiles}
        user={user}
      />
    </ProfilesViewLayout>
  );
};

export default ProfilePage;
