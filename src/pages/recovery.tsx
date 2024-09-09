import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import Recovery from "~/components/authentication/Recovery";
import { LabelledInput } from "~/components/forms";
import useRecovery from "~/hooks/UseRecovery";
import {
  RecoveryPasswordInitialValues,
  RecoveryPasswordValues,
} from "~/hooks/useForm";
import { useUserAtom } from "~/lib/atom";
import { RecoveryValidation } from "~/validations/AuthValidations";

const RecoveryPage = () => {
  const router = useRouter();
  const { handleUpdatePassword } = useRecovery();
  const [{}, setUserAtom] = useUserAtom();
  const toast = useToast();

  const [urlData, setUrlData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [ctaLabel, setCtaLabel] = useState<string>("View Password");

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
  }, [router.isReady, router.asPath]);

  const handlePasswordReset = async (values: RecoveryPasswordValues) => {
    try {
      setSubmitting(true);
      const response = await handleUpdatePassword(
        values.email,
        values.confirmPassword
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

  return (
    <Flex justify="center" align="center" w="full" h="100vh">
      <Flex borderRadius={15} p={5} gap={3}>
        <Recovery
          ctaLabel={ctaLabel}
          errorState={error}
          handlePasswordReset={handlePasswordReset}
          handleViewNewPassword={handleViewNewPassword}
          inputType={inputType}
          submitting={submitting}
        />
      </Flex>
    </Flex>
  );
};

export default RecoveryPage;
