import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { SetStateAction } from "jotai";
import React, { Dispatch } from "react";

interface RecoveryResendProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setActivateResend: Dispatch<SetStateAction<boolean>>;
  handleResendPasswordResetLink: (email: string) => Promise<void>;
}

const RecoveryResend: React.FC<RecoveryResendProps> = ({
  handleResendPasswordResetLink,
  setActivateResend,
  setEmail,
  email,
}) => {
  return (
    <Box>
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
      <Flex gap={2}>
        <Button
          onClick={() => void handleResendPasswordResetLink(email)}
          _hover={{ bg: "#FF4D00", color: "white" }}
          bg="#0E0011"
          color="white"
        >
          Send link
        </Button>
        <Button
          onClick={() => setActivateResend(false)}
          bg="gray.100"
          _hover={{ bg: "gray.200" }}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

export default RecoveryResend;
