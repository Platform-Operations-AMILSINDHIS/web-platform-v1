import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ModalButton from "~/components/buttons/ModalButtons";

interface ProfilesViewLayoutProps {
  children: React.ReactNode;
}

const ProfilesViewLayout: React.FC<ProfilesViewLayoutProps> = ({
  children,
}) => {
  return (
    <Flex h="100vh" w="full">
      <Flex gap={5} p={5} flexDir="column">
        <Flex gap={3}>
          <ModalButton
            CTATheme={false}
            CTAlabel="Withdraw Application"
            CTAaction={() => {}}
          />
          <ModalButton
            CTATheme={true}
            CTAlabel="Select Profile"
            CTAaction={() => {}}
          />
        </Flex>
        <Box mt={3}>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default ProfilesViewLayout;
