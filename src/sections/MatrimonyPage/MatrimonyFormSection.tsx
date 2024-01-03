import { useState } from "react";
import {
  useDisclosure,
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";

import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

import MatrimonyForm from "~/components/forms/matrimony-form";

const MatrimonyFormSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayState, setDisplayState] = useState(false);
  // const [{ user }] = useUserAtom();
  const user = true;

  const handleModal = (state: boolean) => {
    setDisplayState(state);
    onOpen();
  };

  return (
    <Box position="relative">
      <Box
        display={user ? "none" : ""}
        left="50%"
        top="50%"
        transform="translate(-50%,-50%)"
        zIndex={2}
        height={100}
        position="absolute"
      >
        <UserBlockModal />
      </Box>
      <Box
        _hover={user ? {} : { cursor: "not-allowed" }}
        filter={user ? "" : "blur(2px)"}
      >
        <Flex id="matrimony-form" direction="column">
          <Box mb="4rem" w="40%">
            <Heading fontWeight="semibold" fontSize="5xl">
              Matrimony Form
            </Heading>
            <Spacer h="1rem" />
            <Text fontSize="lg">
              Fill out the fields below to complete your personal profile. Make
              sure to fill all the fields and not miss out any important
              details.
            </Text>
          </Box>

          <MatrimonyForm />
        </Flex>
      </Box>
    </Box>
  );
};

export default MatrimonyFormSection;
