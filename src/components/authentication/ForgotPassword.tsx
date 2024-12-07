import {
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";
import useRecovery from "~/hooks/UseRecovery";

interface ForgotPasswordProps {
  setCloseModal: (input: boolean) => void;
  authStateHandleFunction: (
    authState: "login" | "signup" | "forgotPassword"
  ) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  authStateHandleFunction,
}) => {
  const toast = useToast();
  const { handleSendRecoveryURL } = useRecovery();

  const [showError, setShowError] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendPasswordResetLink = async (email: string) => {
    try {
      setShowError(false);
      setSubmitting(true);
      const { message, toastType } = await handleSendRecoveryURL(email);
      toast({
        description: message,
        title: "Recovery",
        status: toastType,
        duration: 3000,
      });
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      setShowError(true);
      setErrorMessage(
        err instanceof TRPCClientError ? err.message : "Something went wrong"
      );
      console.error(err);
    }
  };

  return (
    <Flex py={5} px={2} gap={6} align="center" flexDir="column">
      <Flex gap={3} align="center" flexDir="column">
        <Text fontSize="25px" fontWeight={800}>
          Forgot Password
        </Text>
        <Text
          color={showError ? "red" : "black"}
          fontWeight={500}
          maxW={400}
          textAlign="center"
        >
          {showError
            ? errorMessage || "Invalid email or password"
            : `Forgot your password ? we got you covered!`}
        </Text>
      </Flex>
      <Flex flexDir="column">
        <FormLabel color="gray.700" fontWeight={600}>
          Enter your email
        </FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          borderColor="gray.400"
          _hover={{
            borderColor: "#FF4D00",
          }}
          focusBorderColor="#FF4D00"
          placeholder="xyz@email.com"
          w={400}
        />
      </Flex>
      <Flex gap={3}>
        <Button
          isLoading={submitting}
          onClick={() => void handleSendPasswordResetLink(email)}
          _hover={{ bg: "#FF4D00", color: "white" }}
          bg="#0E0011"
          color="white"
        >
          Send link
        </Button>
        <Button
          color="#FF4D00"
          bg="none"
          border="2px solid"
          borderColor="#FF4D00"
          _hover={{
            color: "white",
            bg: "#FF4D00",
          }}
          onClick={() => authStateHandleFunction("signup")}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
