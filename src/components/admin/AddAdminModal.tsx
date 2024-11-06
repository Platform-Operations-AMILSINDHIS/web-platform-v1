import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { values } from "lodash";
import ModalLayout from "~/layouts/ModalLayout";
import { AddAdminValidation } from "~/validations/AuthValidations";
import { LabelledInput } from "../forms";

interface AddAdminModalProps {
  handleModal: () => void;
  modalState: boolean;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  handleModal,
  modalState,
}) => {
  return (
    <ModalLayout modalState={modalState} handleModal={handleModal}>
      <Flex flexDir="column">
        <Flex mt={3} align="center" justify="space-between">
          <Text fontSize="xl" fontWeight={700}>
            Add Admin User
          </Text>
          <CloseIcon
            cursor="pointer"
            onClick={handleModal}
            transition="all 0.3s"
            _hover={{ color: "#FF4D00" }}
          />
        </Flex>
        <Text color="gray.500" fontWeight={500} mt={1} fontSize="md">
          The new user will be sent the password in their email. Please create
          the password and add the new user's email below
        </Text>
      </Flex>
      <Formik
        validationSchema={AddAdminValidation}
        initialValues={AddAdminModal}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Flex gap={2} my={3} w="full" flexDir="column">
            <LabelledInput
              onChange={(e) => console.log(e.target.value)}
              label="Admin email"
              name="email"
              placeholder="MAT#XYZ"
            />
            <LabelledInput
              onChange={(e) => console.log(e.target.value)}
              label="Admin password"
              name="password"
              placeholder="MAT#XYZ"
            />
          </Flex>
          <Flex mb={3} gap={3}>
            <Button
              // isLoading={isSubmitting}
              type="submit"
              _hover={{
                bg: "gray.700",
              }}
              color="white"
              bg="#0E0E11"
            >
              Add new admin
            </Button>
          </Flex>
        </Form>
      </Formik>
    </ModalLayout>
  );
};

export default AddAdminModal;
