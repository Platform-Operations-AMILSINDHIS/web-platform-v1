import Layout from "~/components/layout";
import YoungAmilCircleMembershipForm from "~/components/forms/yac-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Box, Flex, Icon, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useUserAtom } from "~/lib/atom";
import { RiErrorWarningFill } from "react-icons/ri";
import { calculateAge } from "~/utils/helper";
import { api } from "~/utils/api";

interface AccountStatus {
  membership_id: string | null;
  KAP_member: boolean;
  YAC_member: boolean;
  date_of_birth: string | null;
}

const YoungAmilCircleMembershipPage: NextPage = () => {
  const [{ user }] = useUserAtom();
  const getAccountStatus = api.profile.getAccountStatus.useMutation();

  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setAccountStatus(null);
      return;
    }
    setStatusLoading(true);
    getAccountStatus
      .mutateAsync({ user_id: user.id })
      .then(setAccountStatus)
      .catch(console.error)
      .finally(() => setStatusLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const userAge = accountStatus ? calculateAge(accountStatus.date_of_birth) : null;
  const isAgeOutOfRange = userAge !== null && (userAge < 16 || userAge > 30);

  if (statusLoading) {
    return (
      <Layout title="YAC Membership Form">
        <Flex justify="center" align="center" py={20}>
          <Spinner color="#FF4D00" size="lg" />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout title="YAC Membership Form">
      {accountStatus?.KAP_member === true ? (
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
          {!isAgeOutOfRange ? (
            <Text>
              Note: You have already chosen to become a KAP member, if you wish
              to move to a YAC membership your KAP ID will be revoked and
              replaced with a YAC ID, Hence revoking your KAP previleges
            </Text>
          ) : (
            <></>
          )}
        </Flex>
      ) : accountStatus?.YAC_member === true ? (
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
            !user || (isAgeOutOfRange && accountStatus?.YAC_member !== true) ? "" : "none"
          }
          left="50%"
          top="50%"
          transform="translate(-50%,-95%)"
          zIndex={2}
          height={100}
          position="absolute"
        >
          {user ? (
            isAgeOutOfRange && accountStatus?.YAC_member !== true ? (
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
                    {accountStatus?.YAC_member ? (
                      <Text>Membership Completed</Text>
                    ) : (
                      <Text>Age Requirement not met</Text>
                    )}
                    {userAge !== null && userAge > 30 ? (
                      <Text textAlign="center">
                        You need to be below 30 years of age to be eligible for
                        YAC member application
                      </Text>
                    ) : userAge !== null && userAge < 16 ? (
                      <Text textAlign="center">
                        You need to be atleast 16 years of age to be eligible
                        for YAC member application
                      </Text>
                    ) : accountStatus?.YAC_member ? (
                      <Text textAlign="center">
                        {`You are already a registered YAC member, Your YAC ID is ${accountStatus.membership_id ?? ""} `}
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
          filter={user ? (isAgeOutOfRange ? "blur(2px)" : "") : "blur(2px)"}
          _hover={
            user
              ? isAgeOutOfRange
                ? { cursor: "not-allowed" }
                : {}
              : { cursor: "not-allowed" }
          }
        >
          {user ? <YoungAmilCircleMembershipForm user={user} /> : <></>}
        </Box>
      </Box>
      <Spacer h="5rem" />
    </Layout>
  );
};

export default YoungAmilCircleMembershipPage;
