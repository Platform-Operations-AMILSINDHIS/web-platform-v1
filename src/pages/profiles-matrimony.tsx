import { Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { MatrimonyLoginValues } from "~/hooks/useForm";
import { useUserAtom } from "~/lib/atom";

import useServerActions from "~/hooks/useServerActions";
import ProfilesViewLayout from "~/layouts/ProfilesViewLayout";
import MatrimonyAuthModal from "~/components/authentication/MatrimonyAuthModal";
import { MatrimonyProfilesFetchResponse } from "~/types/api";

const ProfilePage = () => {
  const [{ user }] = useUserAtom();

  const { isOpen: isOpenAuth } = useDisclosure();
  const { isOpen: isOpenSelection } = useDisclosure();

  const { handleMatrimonyLogin, handleMatrimonyProfilesFetch } =
    useServerActions();

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
          {matrimonyProfiles.length > 0 ? (
            <Flex>
              {matrimonyProfiles
                .filter((e) => e.user_id !== user?.id)
                .map((profile, index) => {
                  return (
                    <Text key={index}>
                      {profile.submission.personalInfo.firstName}
                    </Text>
                  );
                })}
            </Flex>
          ) : (
            <Spinner />
          )}
        </Flex>
      ) : (
        <></>
      )}
    </ProfilesViewLayout>
  );
};

export default ProfilePage;
