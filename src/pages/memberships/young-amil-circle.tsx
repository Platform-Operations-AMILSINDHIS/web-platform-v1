import type { NextPage } from "next";

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

import Layout from "~/components/layout";
import YoungAmilCircleMembershipForm from "~/components/forms/yac-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const [{ user }] = useUserAtom();

  console.log(user?.age);

  return (
    <Layout title="KAP Membership Form">
      <Box position="relative">
        <Box
          display={
            user
              ? (user.age <= 16 || user.age >= 30) && user.YAC_member != true
                ? ""
                : "none"
              : ""
          }
          left="50%"
          top="50%"
          transform="translate(-50%,-95%)"
          zIndex={2}
          height={100}
          position="absolute"
        >
          {user ? (
            (user.age <= 16 || user.age >= 30) && user.YAC_member != true ? (
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
                    {user.YAC_member ? (
                      <Text>Membership Completed</Text>
                    ) : (
                      <Text>Age Requirement not met</Text>
                    )}
                    {user.age > 30 ? (
                      <Text textAlign="center">
                        You need to be below 30 years of age to be eligible for
                        YAC member application
                      </Text>
                    ) : user.age < 16 ? (
                      <Text textAlign="center">
                        You need to be atleast 16 years of age to be eligible
                        for YAC member application
                      </Text>
                    ) : user.YAC_member ? (
                      <Text textAlign="center">
                        {`You are already a registered YAC member, Your YAC ID is ${user.membership_id} `}
                      </Text>
                    ) : (
                      <Text></Text>
                    )}
                  </Flex>
                </Flex>
              </>
            ) : (
              <></>
            )
          ) : (
            <UserBlockModal />
          )}
        </Box>
        <Box
          filter={
            user
              ? user.age <= 16 || user.age >= 30
                ? "blur(2px)"
                : ""
              : "blur(2px)"
          }
          _hover={
            user
              ? user.age <= 16 || user.age >= 30
                ? { cursor: "not-allowed" }
                : {}
              : { cursor: "not-allowed" }
          }
        >
          <YoungAmilCircleMembershipForm user={user} />
        </Box>
      </Box>
      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
