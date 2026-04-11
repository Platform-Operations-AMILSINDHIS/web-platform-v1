import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Spacer, Spinner, Text } from "@chakra-ui/react";

import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

import MatrimonyForm from "~/components/forms/matrimony-form";
import useServerActions from "~/hooks/useServerActions";
import { api } from "~/utils/api";
import Link from "next/link";
import type { FamilyMember } from "~/types/forms/membership";

const MatrimonyFormSection = () => {
  console.log("Rendered Matrimony Form Section");
  const [{ user }] = useUserAtom();
  const {
    handleUserMatrimonySubmissionVerification,
    handleUserMatrimonyApprovalVerification,
    handleFetchUserSubmission,
  } = useServerActions();

  const handlersRef = useRef({
    handleUserMatrimonySubmissionVerification,
    handleUserMatrimonyApprovalVerification,
  });
  handlersRef.current = {
    handleUserMatrimonySubmissionVerification,
    handleUserMatrimonyApprovalVerification,
  };

  const getAccountStatus = api.profile.getAccountStatus.useMutation();

  const [serverMembershipId, setServerMembershipId] = useState<
    string | null | undefined
  >(undefined);
  const [submissionVerified, setSubmissionVerified] = useState<boolean>(false);
  const [verifyingAccountStatus, setVerifyingAccountStatus] =
    useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [prefillFamilyMembers, setPrefillFamilyMembers] = useState<
    FamilyMember[]
  >([]);

  const hasMembership = !!serverMembershipId && serverMembershipId !== "";

  useEffect(() => {
    const verifyAll = async (user_id: string) => {
      setVerifyingAccountStatus(true);
      const statusData = await getAccountStatus.mutateAsync({ user_id });
      setServerMembershipId(statusData.membership_id);

      const response_data =
        await handlersRef.current.handleUserMatrimonySubmissionVerification(
          user_id
        );
      // Fetch application data
      const formType = statusData.YAC_member ? "YAC" : "KAP";
      const applicationDetails = await handleFetchUserSubmission(
        user_id,
        formType
      );

      if (applicationDetails?.submission?.familyMembers?.length) {
        setPrefillFamilyMembers(applicationDetails.submission.familyMembers);
      }

      if (response_data?.user_verification) {
        setSubmissionVerified(true);
      } else {
        const approval =
          await handlersRef.current.handleUserMatrimonyApprovalVerification(
            user_id
          );
        if (approval?.status) {
          setApproved(true);
        }
      }
      setLoading(false);
      setVerifyingAccountStatus(false);
    };

    if (user?.id) {
      verifyAll(user.id).catch((err) => console.log(err));
    } else {
      setLoading(false);
      setVerifyingAccountStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box position="relative">
      <Box
        display={
          verifyingAccountStatus || (user && hasMembership && !submissionVerified && !approved)
            ? "none"
            : ""
        }
        left="50%"
        top="50%"
        transform="translate(-50%,-50%)"
        zIndex={2}
        height={100}
        position="absolute"
      >
        {verifyingAccountStatus ? (
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
            <Flex gap={4} px={10} align="center" flexDir="column">
              <Spinner color="#FF4D00" size="xl" />
              <Text fontWeight={600} textAlign="center" fontSize="xl">
                Verifying Account Status
              </Text>
              <Text textAlign="center">
                Please wait while we fetch your latest membership details...
              </Text>
            </Flex>
          </Flex>
        ) : user ? (
          !hasMembership || submissionVerified || approved ? (
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
                {!hasMembership ? (
                  <>
                    <Text fontWeight={600} textAlign="center" fontSize="xl">
                      Must be a member
                    </Text>
                    <Text textAlign="center">
                      You need to be a KAP member or a YAC member above and the
                      age of 18 to access matrimony services
                    </Text>
                  </>
                ) : submissionVerified ? (
                  <>
                    <Text fontWeight={600} textAlign="center" fontSize="xl">
                      Form Successfully Submitted
                    </Text>
                    <Text textAlign="center">
                      Please wait, till your matrimony form has been reviewed by
                      our community, In case of any queries please reach out to{" "}
                      <span style={{ color: "#FF4D00" }}>
                        info@amilsindhis.org
                      </span>
                    </Text>
                  </>
                ) : approved ? (
                  <>
                    <Text fontWeight={600} textAlign="center" fontSize="xl">
                      Application Approved !
                    </Text>
                    <Text textAlign="center">
                      Congratulations on your application being approved, you
                      can head over to
                      <Link
                        href="/matches"
                        style={{ color: "#FF4D00", marginInline: "5px" }}
                      >
                        https://amilsindhis.org/matches
                      </Link>{" "}
                      to request information on any particular individual&apos;s
                      profile that suits you
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
          ) : null
        ) : (
          <UserBlockModal />
        )}
      </Box>
      <Box
        _hover={
          user
            ? !hasMembership
              ? { cursor: "not-allowed" }
              : {}
            : { cursor: "not-allowed" }
        }
        filter={
          verifyingAccountStatus
            ? "blur(2px)"
            : user
              ? !hasMembership || submissionVerified || approved
                ? "blur(2px)"
                : ""
              : "blur(2px)"
        }
      >
        <Flex id="matrimony-form" direction="column">
          <Box mb="4rem" w={["100%", "100%", "40%"]}>
            <Heading fontWeight="semibold" fontSize={["5xl"]}>
              Matrimony Form
            </Heading>
            <Spacer h="1rem" />
            <Text fontSize="lg">
              Fill out the fields below to complete your personal profile. Make
              sure to fill all the fields and not miss out any important
              details.
            </Text>
          </Box>

          {user ? (
            <MatrimonyForm
              submissionVerification={submissionVerified}
              user={user}
              approved={approved}
              initialFamilyMembers={prefillFamilyMembers}
            />
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default MatrimonyFormSection;
