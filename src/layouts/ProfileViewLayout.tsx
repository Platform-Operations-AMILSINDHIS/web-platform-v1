import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface ProfileViewLayoutProps {
  children: React.ReactNode;
}

const ProfileViewLayout: React.FC<ProfileViewLayoutProps> = ({ children }) => {
  return (
    <Flex p={10} w="full" justify="center">
      <Flex bg="yellow" w={1120}>
        {children}
      </Flex>
    </Flex>
  );
};

export default ProfileViewLayout;
