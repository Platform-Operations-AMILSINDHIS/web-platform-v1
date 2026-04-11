import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Box, Flex, Icon, Spacer, Spinner, Text } from "@chakra-ui/react";

import Layout from "~/components/layout";
import KhudabadiAmilPanchayatMembershipForm from "~/components/forms/kap-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";
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

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
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
  const isUnderAge = userAge !== null && userAge < 21;
  const isEligible = user && accountStatus && !isUnderAge && accountStatus.KAP_member !== true;

  if (statusLoading) {
    return (
      <Layout title="KAP Membership Form">
        <Flex justify="center" align="center" py={20}>
          <Spinner color="#FF4D00" size="lg" />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout title="KAP Membership Form">
      {accountStatus?.YAC_member === true ? (
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
                  {accountStatus?.KAP_member ? (
                    <Text>Membership Completed</Text>
                  ) : (
                    <Text>Age Requirement not met</Text>
                  )}
                  {accountStatus?.KAP_member ? (
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
