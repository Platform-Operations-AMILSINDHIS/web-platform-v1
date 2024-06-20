import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { IoIosWarning } from "react-icons/io";

import ModalLayout from "~/layouts/ModalLayout";
import { Formik, Form } from "formik";
import {
  WithdrawMatAppInitialValues,
  WithdrawMatAppValues,
} from "~/hooks/useForm";
import { WithdrawMatAppValidation } from "~/validations/AuthValidations";
import { useState } from "react";

interface MatrimonyApplicationWithdrawModalProps {
  handleModal: () => void;
  handleDeleteMatrimonyProfile: (user_id: string, matrimony_id: string) => void;
  modalState: boolean;
  user_id: string;
}

const MatrimonyApplicationWithdrawModal: React.FC<
  MatrimonyApplicationWithdrawModalProps
> = ({ handleModal, handleDeleteMatrimonyProfile, modalState, user_id }) => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [matrimonyID, setMatrimonyID] = useState<string>("");
  const [triggerError, setTriggerError] = useState<boolean>(false);

  const handleSubmit = async (matrimony_id: string) => {
    setIsSubmitting(true);
    console.log({ user_id, matrimony_id: matrimony_id });
    if (matrimony_id === "") {
      setTriggerError(true);
    }
    await handleDeleteMatrimonyProfile(user_id, matrimony_id);

    setIsSubmitting(false);
  };
  return (
    <ModalLayout
      modalHeader="Withdraw Application"
      modalSize="xl"
      handleModal={handleModal}
      modalState={modalState}
    >
      <Flex gap={3} flexDir="column">
        <Flex justify="center">
          <Icon color="red" boxSize={12} as={IoIosWarning} />
        </Flex>
        <Flex flexDir="column">
          <Text fontWeight={500} textAlign="center">
            The following action is irreversible, and will result in the
            termination of your matrimony profile and your matrimony ID. If you
            ever find the need to create another profile you will be assigned a
            new ID
          </Text>
          <Flex gap={2} my={5} flexDir="column">
            <Flex gap={2} color="gray.700" fontWeight={600} flexDir="column">
              <Text>Confirm Your Matrimony ID</Text>
              <Input
                borderColor="gray.400"
                _hover={{
                  borderColor: "#FF4D00",
                }}
                focusBorderColor="#FF4D00"
                onChange={(e) => console.log(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex justify="center" mt="-15px" mb={2} gap={3}>
          <Button
            isLoading={submitting}
            onClick={() => handleSubmit(matrimonyID)}
            _hover={{
              bg: "gray.700",
            }}
            color="white"
            bg="#0E0E11"
          >
            Confirm Withdrawal
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
            onClick={handleModal}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </ModalLayout>
  );
};

export default MatrimonyApplicationWithdrawModal;
