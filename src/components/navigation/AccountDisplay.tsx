import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import type { userAtomBody } from "~/types/atoms/users";
import AccountOptionsPopover from "./AccountOptionsPopover";
import { api } from "~/utils/api";
import useAWS from "~/hooks/useAWS";

interface AccountDisplayProps {
  user: userAtomBody | null;
}

const AccountDisplay: React.FC<AccountDisplayProps> = ({ user }) => {
  // Fetch user's profile image s3_key
  const getProfileImageKey = api.profile.getProfileDetails.useMutation();
  const [profileImageKey, setProfileImageKey] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {
    if (user?.id) {
      getProfileImageKey
        .mutateAsync({ user_id: user.id })
        .then((data) => {
          const s3_meta = data?.application_s3_meta;
          const profileImage = s3_meta?.find(
            (meta) => meta.file_type === "profile_image"
          );
          setProfileImageKey(profileImage?.s3_key);
        })
        .catch((err) => {
          console.error("Error fetching profile image key:", err);
        });
    }
  }, [user?.id]);

  // Fetch signed URL for profile image
  const { profileImageSignedURL } = useAWS({
    s3_key: profileImageKey,
  });

  return (
    <Flex align="center" color="gray.800" gap={3}>
      {profileImageSignedURL ? (
        <Avatar
          size="sm"
          src={profileImageSignedURL}
          name={user?.account_name}
          bg="orange.500"
        />
      ) : (
        <Icon color="#FF4D00" boxSize={5} as={FaUserCircle} />
      )}
      <AccountOptionsPopover>
        <Text
          transition="all 0.3s"
          _hover={{ cursor: "pointer", color: "#FF4D00" }}
        >
          {user?.account_name}
        </Text>
      </AccountOptionsPopover>
    </Flex>
  );
};

export default AccountDisplay;
