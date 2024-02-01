import type { NextPage } from "next";

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

import Layout from "~/components/layout";
import YoungAmilCircleMembershipForm from "~/components/forms/yac-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const [{ user }] = useUserAtom();

  console.log({ user });

  return (
    <Layout title="KAP Membership Form">
      <Spacer h="1.5rem" />
      <Text fontSize="2xl" fontWeight={600} w="full" textAlign="center">
        YAC Application Form
      </Text>
      <Spacer h="1.5rem" />
      <Box position="relative">
        <Box
          display={user && user.age >= 16 ? "none" : ""}
          left="50%"
          top="50%"
          transform="translate(-50%,-95%)"
          zIndex={2}
          height={100}
          position="absolute"
        >
          {user ? (
            user.age <= 16 || user.age >= 30 ? (
              <>
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
                      Age Requirement not met
                    </Text>
                    {user.age > 30 ? (
                      <Text textAlign="center">
                        You need to be below 30 years of age to be eligible for
                        YAC member application
                      </Text>
                    ) : (
                      <Text textAlign="center">
                        You need to be atleast 16 years of age to be eligible
                        for YAC member application
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </>
            ) : null
          ) : (
            // <></>
            <UserBlockModal />
          )}
        </Box>
        <Box
          filter={user && user.age >= 16 ? "" : "blur(2px)"}
          _hover={user && user.age >= 16 ? {} : { cursor: "not-allowed" }}
        >
          <YoungAmilCircleMembershipForm />
        </Box>
      </Box>
      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
