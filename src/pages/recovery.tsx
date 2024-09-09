import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
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
        <Formik
          validationSchema={RecoveryValidation}
          initialValues={RecoveryPasswordInitialValues}
          onSubmit={handlePasswordReset}
        >
          <Form>
            <Flex w={500} flexDir="column">
              <Flex pb={2} flexDir="column">
                <Text fontWeight={700} textAlign="center" fontSize="3xl">
                  Reset Password
                </Text>
                <Text textAlign="center">
                  Enter & confirm your new password below
                </Text>
                {error ? (
                  <Text color="red" fontWeight={500} textAlign="center">
                    An Error occured while resetting your password please try
                    again
                  </Text>
                ) : (
                  <></>
                )}
              </Flex>
              <Flex my={3} gap={1} flexDir="column">
                <LabelledInput
                  label="Email"
                  name="email"
                  placeholder="email@gmail.com"
                />
                <LabelledInput
                  label="Enter your new password"
                  name="newPassword"
                  type={inputType}
                  placeholder="********"
                />

                <LabelledInput
                  label="Confirm new passoword"
                  name="confirmPassword"
                  type={inputType}
                  placeholder="********"
                />
              </Flex>
            </Flex>
            <Flex gap={3}>
              <Button
                isLoading={submitting}
                _hover={{
                  bg: "gray.200",
                }}
                color="#0E0E11"
                bg="gray.100"
                onClick={handleViewNewPassword}
              >
                {ctaLabel}
              </Button>
              <Button
                type="submit"
                isLoading={submitting}
                _hover={{
                  bg: "gray.700",
                }}
                color="white"
                bg="#0E0E11"
              >
                Reset Password
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
};

export default RecoveryPage;
