import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecoveryPasswordValues } from "~/hooks/useForm";
import { useUserAtom } from "~/lib/atom";

import Recovery from "~/components/authentication/Recovery";
import useRecovery from "~/hooks/UseRecovery";
import { TRPCClientError } from "@trpc/client";
import RecoveryResend from "~/components/authentication/RecoveryResend";

const RecoveryPage = () => {
  const router = useRouter();
  const { handleUpdatePassword, handleSendRecoveryURL } = useRecovery();
  const [{}, setUserAtom] = useUserAtom();
  const toast = useToast();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activateResend, setActivateResend] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [urlData, setUrlData] = useState<Record<string, string>>({});
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [ctaLabel, setCtaLabel] = useState<string>("View Password");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (!router.isReady) return;

    // Remove the leading '/' if present
    const path = router.asPath.startsWith("/")
      ? router.asPath.slice(1)
      : router.asPath;

    // Split the path into segments
    const segments = path.split("&");

    const newUrlData: Record<string, string> = {};

    segments.forEach((segment) => {
      const [key, value] = segment.split("=");
      if (key && value) {
        const data = key.split("#").join("");
        newUrlData[decodeURIComponent(data)] = decodeURIComponent(value);
      }
    });

    setUrlData(newUrlData);

    if (
      !("recoveryaccess_token" in newUrlData && "refresh_token" in newUrlData)
    ) {
      router
        .push("/")
        .then(() => console.log("moved back to home"))
        .catch((err) => console.log(err));
    }
  }, [router.isReady, router.asPath]);

  const handlePasswordReset = async (values: RecoveryPasswordValues) => {
    try {
      setSubmitting(true);
      const response = await handleUpdatePassword(
        values.email,
        values.confirmPassword,
        urlData.recoveryaccess_token ?? "",
        urlData.refresh_token ?? ""
      );
      setSubmitting(false);
      if (response) {
        setUserAtom({ user: null });
        toast({
          status: response.toastType,
          title:
            response.toastType === "error"
              ? "Error"
              : `Updated account for email: ${values.email}`,
          description: `${response.message}`,
        });
        if (response.toastType === "success") window.location.href = "/";
      } else {
        // Handle case where response is undefined
        setError(true);
        toast({
          status: "error",
          title: "Failed to update password",
        });
      }
    } catch (err) {
      // ... error h
      console.log(err);
      console.log(
        err instanceof Error ? err.message : "Something else went wrong"
      );
      setError(true);
      setSubmitting(false);
    }
  };

  const handleViewNewPassword = () => {
    if (inputType === "password") {
      setInputType("text");
      setCtaLabel("Hide Password");
    } else {
      setInputType("password");
      setCtaLabel("View Password");
    }
  };

  const handleResendPasswordResetLink = async (email: string) => {
    try {
      const { message, toastType } = await handleSendRecoveryURL(email);
      toast({
        description: message,
        title: "Recovery",
        status: toastType,
        duration: 3000,
      });
    } catch (err) {
      if (err instanceof TRPCClientError) {
        toast({
          description: err.message,
          status: "error",
          title: "Server Error",
          duration: 3000,
        });
      } else {
        toast({
          description: "An unexpected error occurred",
          status: "error",
          title: "Error",
          duration: 3000,
        });
      }
      console.error(err);
    }
  };

  return (
    <Flex justify="center" align="center" w="full" h="100vh">
      {"recoveryaccess_token" && "refresh_token" in urlData ? (
        <Flex borderRadius={15} p={5} gap={3}>
          {"recoveryerror" in urlData ? (
            <Flex
              align={!activateResend ? "center" : "flex-start"}
              width={{ base: "90%", md: "50%", lg: "40%" }}
              gap={3}
              flexDir="column"
            >
              {activateResend ? (
                <RecoveryResend
                  email={email}
                  handleResendPasswordResetLink={handleResendPasswordResetLink}
                  setActivateResend={setActivateResend}
                  setEmail={setEmail}
                />
              ) : (
                <>
                  {" "}
                  <Flex flexDir="column">
                    <Text
                      fontWeight={700}
                      fontSize="x-large"
                      textAlign="center"
                    >
                      Looks like something ain&apos;t quite right
                    </Text>
                    <Text fontWeight={500} fontSize="large" textAlign="center">
                      {urlData.error_description?.split("+").join(" ")}
                    </Text>
                  </Flex>
                  <Flex gap={2}>
                    <Button
                      _hover={{ bg: "#FF4D00", color: "white" }}
                      bg="#0E0011"
                      color="white"
                    >
                      Return home
                    </Button>
                    <Button
                      onClick={() => setActivateResend(true)}
                      bg="gray.100"
                      _hover={{ bg: "gray.200" }}
                    >
                      Resend Link
                    </Button>
                  </Flex>
                </>
              )}
            </Flex>
          ) : (
            <Recovery
              ctaLabel={ctaLabel}
              errorState={error}
              handlePasswordReset={handlePasswordReset}
              handleViewNewPassword={handleViewNewPassword}
              inputType={inputType}
              submitting={submitting}
            />
          )}
        </Flex>
      ) : (
        <Flex flexDir="column">
          <Text fontWeight={700} fontSize="x-large">
            Invalid Authentication Flow detected
          </Text>
          <Flex align="center" flexDir="row" gap={1}>
            <Spinner boxSize={3} />
            <Text fontWeight={500} fontSize="large">
              Redirecting to home...
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default RecoveryPage;
