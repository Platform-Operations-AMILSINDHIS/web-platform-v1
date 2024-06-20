import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { IoIosWarning } from "react-icons/io";

import ModalLayout from "~/layouts/ModalLayout";
import { LabelledInput } from "../forms";
import { Formik, Form } from "formik";
import {
  WithdrawMatAppInitialValues,
  WithdrawMatAppValues,
} from "~/hooks/useForm";
import { WithdrawMatAppValidation } from "~/validations/AuthValidations";
import { userAtomBody } from "~/types/atoms/users";
import useServerActions from "~/hooks/useServerActions";

interface MatrimonyApplicationWithdrawModalProps {
  handleModal: () => void;
  modalState: boolean;
  user_id: string;
}

const MatrimonyApplicationWithdrawModal: React.FC<
  MatrimonyApplicationWithdrawModalProps
> = ({ handleModal, modalState, user_id }) => {
  const { handleDeleteMatrimonyProfile } = useServerActions();

  const handleApplicationWithdraw = async (values: WithdrawMatAppValues) => {
    const response = await handleDeleteMatrimonyProfile(
      user_id,
      values.matrimony_id
    );

    console.log(response);
  };
  return (
    <ModalLayout
      modalHeader="Withdraw Application"
      modalSize="xl"
      handleModal={handleModal}
      modalState={modalState}
    >
      <Formik
        initialValues={WithdrawMatAppInitialValues}
        validationSchema={WithdrawMatAppValidation}
        onSubmit={handleApplicationWithdraw}
      >
        <Form>
          <Flex gap={3} flexDir="column">
            <Flex justify="center">
              <Icon color="red" boxSize={12} as={IoIosWarning} />
            </Flex>
            <Flex flexDir="column">
              <Text fontWeight={500} textAlign="center">
                The following action is irreversible, and will result in the
                termination of your matrimony profile and your matrimony ID. If
                you ever find the need to create another profile you will be
                assigned a new ID
              </Text>
              <Flex gap={2} my={5} flexDir="column">
                <LabelledInput
                  placeholder="MAT#XYZ"
                  name="matrimony_id"
                  label="Confirm Your MAT"
                />
              </Flex>
            </Flex>
            <Flex justify="center" mt="-15px" mb={2} gap={3}>
              <Button
                isLoading={false}
                type="submit"
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
        </Form>
      </Formik>
    </ModalLayout>
  );
};

export default MatrimonyApplicationWithdrawModal;
