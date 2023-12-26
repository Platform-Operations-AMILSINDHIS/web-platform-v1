import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import ModalButton from "../buttons/ModalButtons";

const UserBlockModal = () => {
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
      <Flex gap={3} px={10} align="center" flexDir="column">
        <Text fontWeight={600} textAlign="center" fontSize="xl">
          Please Login to continue further
        </Text>
        <Text textAlign="center">
          To continue further and access all the features of the platform,
          create an account or login
        </Text>
        <Flex mt={2} gap={2}>
          <ModalButton
            CTAlabel="Login"
            CTATheme={false}
            CTAaction={() => console.log("hi")}
            CTASize="md"
          />
          <ModalButton
            CTAlabel="Create Account"
            CTATheme={true}
            CTAaction={() => console.log("hi")}
            CTASize="md"
          />
        </Flex>{" "}
      </Flex>
    </Flex>
  );
};

export default UserBlockModal;
