/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  Text,
  Box,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, type FieldInputProps, type FormikState } from "formik";
import * as Yup from "yup";
import { api } from "~/utils/api";
import { useUserAtom } from "~/lib/atom";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialData: {
    first_name: string;
    last_name: string;
    account_name: string;
    gender: string;
    date_of_birth: string;
    email_id: string;
  };
  onSuccess: () => void;
}

interface EditProfileFormValues {
  first_name: string;
  last_name: string;
  account_name: string;
  gender: string;
  date_of_birth: string;
}

const editProfileSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  account_name: Yup.string().required("Account name is required"),
  gender: Yup.string().required("Gender is required"),
  date_of_birth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required")
    .typeError("Please enter a valid date"),
});

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userId,
  initialData,
  onSuccess,
}) => {
  const toast = useToast();
  const updateProfileMutation = api.profile.updateProfile.useMutation();
  const [, setUserAtom] = useUserAtom();

  const handleSubmit = async (values: EditProfileFormValues) => {
    try {
      await updateProfileMutation.mutateAsync({
        user_id: userId,
        first_name: values.first_name,
        last_name: values.last_name,
        account_name: values.account_name,
        gender: values.gender,
        date_of_birth: values.date_of_birth,
      });

      // Update the user atom so UI reflects changes immediately
      setUserAtom((prev) => ({
        user: prev.user
          ? {
              ...prev.user,
              first_name: values.first_name,
              last_name: values.last_name,
              account_name: values.account_name,
              gender: values.gender,
              date_of_birth: values.date_of_birth,
            }
          : null,
      }));

      toast({
        title: "Profile updated",
        description: "Your profile details have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess();
      onClose();
    } catch (err) {
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Format date to YYYY-MM-DD for the date input
  const formatDateForInput = (dateStr: string | null | undefined): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader borderBottom="1px solid" borderColor="gray.100" pb={4}>
          Edit Profile
        </ModalHeader>
        <ModalCloseButton />

        <Formik
          initialValues={{
            first_name: initialData.first_name,
            last_name: initialData.last_name,
            account_name: initialData.account_name,
            gender: initialData.gender,
            date_of_birth: formatDateForInput(initialData.date_of_birth),
          }}
          validationSchema={editProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody py={6}>
                <VStack spacing={4}>
                  {/* Email — locked, display only */}
                  <Box w="full">
                    <FormLabel fontSize="sm" color="gray.600" mb={1}>
                      Email address
                    </FormLabel>
                    <Input
                      value={initialData.email_id}
                      isReadOnly
                      bg="gray.50"
                      color="gray.500"
                      cursor="not-allowed"
                      _focus={{ boxShadow: "none", borderColor: "gray.200" }}
                    />
                    <Text fontSize="xs" color="gray.400" mt={1}>
                      Email cannot be changed
                    </Text>
                  </Box>

                  <HStack spacing={3} w="full">
                    <Field name="first_name">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: FormikState<EditProfileFormValues>;
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.first_name && form.touched.first_name
                            )
                          }
                        >
                          <FormLabel fontSize="sm" color="gray.600" mb={1}>
                            First name
                          </FormLabel>
                          <Input {...field} placeholder="First name" />
                          <FormErrorMessage>
                            {form.errors.first_name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="last_name">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: FormikState<EditProfileFormValues>;
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.last_name && form.touched.last_name
                            )
                          }
                        >
                          <FormLabel fontSize="sm" color="gray.600" mb={1}>
                            Last name
                          </FormLabel>
                          <Input {...field} placeholder="Last name" />
                          <FormErrorMessage>
                            {form.errors.last_name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <Field name="account_name">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikState<EditProfileFormValues>;
                    }) => (
                      <FormControl
                        isInvalid={
                          !!(
                            form.errors.account_name &&
                            form.touched.account_name
                          )
                        }
                      >
                        <FormLabel fontSize="sm" color="gray.600" mb={1}>
                          Account name
                        </FormLabel>
                        <Input {...field} placeholder="account_name" />
                        <FormErrorMessage>
                          {form.errors.account_name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="gender">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikState<EditProfileFormValues>;
                    }) => (
                      <FormControl
                        isInvalid={
                          !!(form.errors.gender && form.touched.gender)
                        }
                      >
                        <FormLabel fontSize="sm" color="gray.600" mb={1}>
                          Gender
                        </FormLabel>
                        <Select {...field} placeholder="Select gender">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                        <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="date_of_birth">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikState<EditProfileFormValues>;
                    }) => (
                      <FormControl
                        isInvalid={
                          !!(
                            form.errors.date_of_birth &&
                            form.touched.date_of_birth
                          )
                        }
                      >
                        <FormLabel fontSize="sm" color="gray.600" mb={1}>
                          Date of birth
                        </FormLabel>
                        <Input
                          {...field}
                          type="date"
                          max={new Date().toISOString().slice(0, 10)}
                        />
                        <FormErrorMessage>
                          {form.errors.date_of_birth}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
              </ModalBody>

              <ModalFooter borderTop="1px solid" borderColor="gray.100" gap={3}>
                <Button variant="ghost" onClick={onClose} isDisabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg="#FF4D00"
                  color="white"
                  _hover={{ bg: "#E64500" }}
                  isLoading={isSubmitting}
                  loadingText="Saving..."
                >
                  Save changes
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
