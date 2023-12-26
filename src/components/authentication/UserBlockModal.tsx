import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import ModalButton from "../buttons/ModalButtons";
import { useState } from "react";
import AuthModal from "./AuthModal";

const UserBlockModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayState, setDisplayState] = useState(false);

  const handleModal = (state: boolean) => {
    setDisplayState(state);
    onOpen();
  };

  return (
    <Flex
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      border="1px solid"
      borderColor="gray.200"
      padding={5}
      borderRadius={20}
      bg={"white"}
      justify="center"
      align="center"
      h={250}
      w={500}
    >
      <Flex gap={2} px={10} align="center" flexDir="column">
        <Text fontWeight={600} textAlign="center" fontSize="xl">
          Please Login to continue further
        </Text>
        <Text textAlign="center">
          To continue further and access all the features of the platform,
          create an account or login
        </Text>
        <AuthModal
          displayState={displayState}
          handleModal={onClose}
          modalState={isOpen}
        />
        <Flex mt={3} gap={2}>
          <ModalButton
            CTAlabel="Login"
            CTATheme={false}
            CTAaction={() => handleModal(true)}
            CTASize="md"
          />
          <ModalButton
            CTAlabel="Create Account"
            CTATheme={true}
            CTAaction={() => handleModal(false)}
            CTASize="md"
          />
        </Flex>{" "}
      </Flex>
    </Flex>
  );
};

export default UserBlockModal;
