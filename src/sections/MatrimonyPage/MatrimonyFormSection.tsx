import { use, useEffect, useState } from "react";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

import MatrimonyForm from "~/components/forms/matrimony-form";
import useServerActions from "~/hooks/useServerActions";
import Link from "next/link";

const MatrimonyFormSection = () => {
  const [{ user }] = useUserAtom();
  const {
    handleUserMatrimonySubmissionVerification,
    handleUserMatrimonyApprovalVerification,
    handleIsMemberVerifiedCheck,
  } = useServerActions();

  const [submissionVerified, setSubmissionVerified] = useState<boolean>(false);
  const [noPending, setNoPending] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false); // boolean here incase needed in the future
  const [loading, setLoading] = useState<boolean>(true);

  const handleMemberVerify = async (user_id: string) => {
    const response_data = await handleIsMemberVerifiedCheck(user_id);
    console.log(response_data);
    const memberStatus = await response_data?.isMemberVerified;
    setIsMember(memberStatus);
  };

  const SendSubmissionVerificationQueryToServer = async (user_id: string) => {
    const response_data = await handleUserMatrimonySubmissionVerification(
      user_id
    );
    const response_result = response_data?.user_verification;
    console.log({ response_result });
    response_result
      ? setSubmissionVerified(response_result)
      : setNoPending(true);

    if (noPending) {
      const approval_verification_response =
        await handleUserMatrimonyApprovalVerification(user_id);
      const approval_verification_result =
        approval_verification_response?.status;

      if (approval_verification_result) {
        setApproved(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const y = async (user_id: string) => {
      await handleMemberVerify(user_id);
    };
    const f = async (user_id: string) => {
      await SendSubmissionVerificationQueryToServer(user_id);
    };

    if (user?.id) {
      y(user.id)
        .then(() => console.log("done"))
        .catch((err) => {
          console.log(err);
        });
      f(user.id)
        .then(() => {
          console.log("done");
        })
        .catch((err) => console.log(err));
      console.log({ noPending, submissionVerified, approved, isMember });
    } else {
      setLoading(false);
      console.log("Loading");
    }
  }, [user, noPending, approved]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box position="relative">
      <Box
        display={
          user &&
          user.membership_id === "" &&
          submissionVerified === true &&
          approved === true
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
        {user ? (
          user.membership_id === "" ||
          null ||
          submissionVerified === true ||
          approved === true ? (
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
                {user.membership_id === "" || null ? (
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
                      <span
                        style={{
                          color: "#FF4D00",
                        }}
                      >
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
                        style={{
                          color: "#FF4D00",
                          marginInline: "5px",
                        }}
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
            ? user.membership_id === "" || null
              ? { cursor: "not-allowed" }
              : {}
            : { cursor: "not-allowed" }
        }
        filter={
          user
            ? user.membership_id === "" ||
              null ||
              submissionVerified ||
              approved
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

          <MatrimonyForm
            submissionVerification={submissionVerified}
            user={user}
            approved={approved}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default MatrimonyFormSection;
