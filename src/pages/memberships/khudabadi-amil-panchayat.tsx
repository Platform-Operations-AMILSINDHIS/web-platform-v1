import type { NextPage } from "next";

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

import Layout from "~/components/layout";
import KhudabadiAmilPanchayatMembershipForm from "~/components/forms/kap-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const [{ user }] = useUserAtom();
  console.log({ user });

  return (
    <Layout title="KAP Membership Form">
      <Box position="relative">
        <Box
          display={user && user.age >= 21 ? "none" : ""}
          left="50%"
          top="50%"
          transform="translate(-50%,-95%)"
          zIndex={2}
          height={100}
          position="absolute"
        >
          {user ? (
            user.age >= 21 ? (
              <></>
            ) : (
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
                  <Text textAlign="center">
                    You need to be atleast 21 years of age to be eligible for
                    KAP member application
                  </Text>
                </Flex>
              </Flex>
            )
          ) : (
            <UserBlockModal />
          )}

          {/* <Flex
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
                <Text textAlign="center">
                  You need to be atleast 21 years of age to be eligible for KAP
                  member application
                </Text>
              </Flex>
            </Flex>
          )} */}
        </Box>
        <Box
          filter={user && user.age >= 21 ? "" : "blur(2px)"}
          _hover={user && user.age >= 21 ? {} : { cursor: "not-allowed" }}
        >
          <KhudabadiAmilPanchayatMembershipForm user={user} />
        </Box>
      </Box>
      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
