import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import ModalLayout from "~/layouts/ModalLayout";
import { AddAdminValidation } from "~/validations/AuthValidations";
import { LabelledInput } from "../forms";
import useAdminAuth from "~/hooks/useAdminAuth";
import { AddAdminInitialValues, AddAdminValues } from "~/hooks/useForm";
import { useState } from "react";
import { TRPCError } from "@trpc/server";

interface AddAdminModalProps {
  handleModal: () => void;
  modalState: boolean;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  handleModal,
  modalState,
}) => {
  const toast = useToast();
  const { handleAddAdmin } = useAdminAuth();

  const [formError, setFormError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFormSubmit = async (values: AddAdminValues) => {
    try {
      const { email, password, username } = values;
      setFormError("");
      setSubmitting(true);
      const response = await handleAddAdmin(email, password, username);
      console.log(response);
      if (response.success) {
        setSubmitting(false);
        handleModal();
        toast({
          status: "success",
          duration: 3000,
          description: "The new admin user will be notified",
          title: "Admin Account added successfully",
        });
      } else {
        setFormError(response.message);
        setSubmitting(false);
      }
    } catch (err) {
      if (err instanceof TRPCError) {
        setFormError(err.message);
        setSubmitting(false);
      }
    }
  };
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
          the password and add the new user&apos;s email below
        </Text>
        {formError === "" ? (
          <></>
        ) : (
          <Text p={1} color="red.500" fontWeight={600}>
            {formError}
          </Text>
        )}
      </Flex>
      <Formik
        validationSchema={AddAdminValidation}
        initialValues={AddAdminInitialValues}
        onSubmit={async (values) => {
          try {
            await handleFormSubmit(values);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Form>
          <Flex gap={2} my={3} w="full" flexDir="column">
            <LabelledInput
              onChange={(e) => console.log(e.target.value)}
              label="Admin email"
              name="email"
              placeholder="admin@email.com"
            />
            <LabelledInput
              onChange={(e) => console.log(e.target.value)}
              label="Admin username"
              name="username"
              placeholder="admin@#22"
            />
            <LabelledInput
              onChange={(e) => console.log(e.target.value)}
              label="Admin password"
              name="password"
              placeholder="*********"
            />
          </Flex>
          <Flex mb={3} gap={3}>
            <Button
              isLoading={submitting}
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
