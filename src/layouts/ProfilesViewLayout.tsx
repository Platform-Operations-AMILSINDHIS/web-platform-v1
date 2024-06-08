import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ModalButton from "~/components/buttons/ModalButtons";

interface ProfilesViewLayoutProps {
  children: React.ReactNode;
  openSelectionModal: () => void;
  openWithdrawModal: () => void;
}

const ProfilesViewLayout: React.FC<ProfilesViewLayoutProps> = ({
  children,
  openSelectionModal,
  openWithdrawModal,
}) => {
  return (
    <Flex h="100vh" w="full">
      <Flex gap={5} p={5} flexDir="column">
        <Flex gap={3}>
          <ModalButton
            CTATheme={false}
            CTAlabel="Withdraw Application"
            CTAaction={openWithdrawModal}
          />
          <ModalButton
            CTATheme={true}
            CTAlabel="Select Profile"
            CTAaction={openSelectionModal}
          />
        </Flex>
        <Box mt={3}>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default ProfilesViewLayout;
