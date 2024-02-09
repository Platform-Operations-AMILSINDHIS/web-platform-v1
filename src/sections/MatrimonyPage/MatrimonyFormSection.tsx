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
  const [{ user }] = useUserAtom();
  console.log(user);
  return (
    <Box position="relative">
      <Box
        display={user && user.membership_id != "" ? "none" : ""}
        left="50%"
        top="50%"
        transform="translate(-50%,-50%)"
        zIndex={2}
        height={100}
        position="absolute"
      >
        {user ? (
          user.membership_id === "" ? (
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
                  Must be a member
                </Text>
                <Text textAlign="center">
                  You need to be a KAP member or a YAC member above the age of
                  18 to access matrimony services
                </Text>
              </Flex>
            </Flex>
          ) : (
            <></>
          )
        ) : (
          <UserBlockModal />
        )}
      </Box>
      <Box
        _hover={
          user
            ? user.membership_id === ""
              ? { cursor: "not-allowed" }
              : {}
            : { cursor: "not-allowed" }
        }
        filter={
          user ? (user.membership_id === "" ? "blur(2px)" : "") : "blur(2px)"
        }
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
