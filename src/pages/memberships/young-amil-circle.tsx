import Layout from "~/components/layout";
import YoungAmilCircleMembershipForm from "~/components/forms/yac-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";

import type { NextPage } from "next";
import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { useUserAtom } from "~/lib/atom";
import { RiErrorWarningFill } from "react-icons/ri";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const [{ user }] = useUserAtom();

  return (
    <Layout title="YAC Membership Form">
      {user?.KAP_member === true ? (
        <Flex
          gap={2}
          align="flex-start"
          p={3}
          borderRadius={10}
          fontWeight={500}
          bg="yellow.100"
        >
          <Icon
            color="yellow.600"
            mt={0.4}
            boxSize={5}
            as={RiErrorWarningFill}
          />
          {!(user.age <= 16 || user.age >= 30) ? (
            <Text>
              Note: You have already chosen to become a KAP member, if you wish
              to move to a YAC membership your KAP ID will be revoked and
              replaced with a YAC ID, Hence revoking your KAP previleges
            </Text>
          ) : (
            <></>
          )}
        </Flex>
      ) : user?.YAC_member === true ? (
        <Flex
          gap={2}
          align="flex-start"
          p={3}
          w="fit-content"
          borderRadius={10}
          fontWeight={500}
          bg="yellow.100"
        >
          <Icon
            color="yellow.600"
            mt={0.4}
            boxSize={5}
            as={RiErrorWarningFill}
          />
          <Text>You already are registered as a YAC member</Text>
        </Flex>
      ) : (
        <></>
      )}
      <Box position="relative">
        <Box
          display={
            !user ||
            ((user.age <= 16 || user.age >= 30) && user.YAC_member != true)
              ? ""
              : "none"
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
