import type { NextPage } from "next";

import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";

import Layout from "~/components/layout";
import KhudabadiAmilPanchayatMembershipForm from "~/components/forms/kap-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";
import { RiErrorWarningFill } from "react-icons/ri";
import { calculateAge } from "~/utils/helper";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const [{ user }] = useUserAtom();
  const userAge = user ? calculateAge(user.date_of_birth) : null;

  // Under age when age is known and below 21; if DOB is null, allow through
  const isUnderAge = userAge !== null && userAge < 21;
  const isEligible = user && !isUnderAge && user.KAP_member !== true;

  return (
    <Layout title="KAP Membership Form">
      {user?.YAC_member === true ? (
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
          <Text>
            Note: You have already chosen to become a YAC member, if you wish to
            move to a KAP membership your YAC ID will be revoked and replaced
            with a KAP ID, Hence revoking your YAC previleges
          </Text>
        </Flex>
      ) : (
        <></>
      )}
      <Box position="relative">
        <Box
          display={isEligible ? "none" : ""}
          left="50%"
          top="50%"
          transform="translate(-50%,-95%)"
          zIndex={2}
          height={100}
          position="absolute"
        >
          {user ? (
            isEligible ? (
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
                  {user.KAP_member ? (
                    <Text>Membership Completed</Text>
                  ) : (
                    <Text>Age Requirement not met</Text>
                  )}
                  {user.KAP_member ? (
                    <Text textAlign="center">
                      You are already a registered KAP member
                    </Text>
                  ) : (
                    <Text textAlign="center">
                      You need to be atleast 21 years of age to be eligible for
                      KAP member application
                    </Text>
                  )}
                </Flex>
              </Flex>
            )
          ) : (
            <UserBlockModal />
          )}
        </Box>
        <Box
          filter={isEligible ? "" : "blur(2px)"}
          _hover={isEligible ? {} : { cursor: "not-allowed" }}
        >
          {user ? <KhudabadiAmilPanchayatMembershipForm user={user} /> : <></>}
        </Box>
      </Box>
      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
