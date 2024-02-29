import { Box, Button, Checkbox, Flex, Icon, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { LabelledInput } from "~/components/forms";
import { AdminLoginValues, adminInitialLoginValues } from "~/hooks/useForm";
import { adminAtomBody, useAdminAtom } from "~/lib/atom";
import { AdminLoginValidation } from "~/validations/AuthValidations";

const AdminAuthPage = () => {
  const [{ admin }, setAdminAtom] = useAdminAtom();
  const [submitting, setSubmitting] = useState(false);

  const handleAdminAtom = (adminObject: adminAtomBody) => {
    setAdminAtom({
      admin: {
        id: adminObject.id,
        admin_email: adminObject.admin_email,
        admin_password: adminObject.admin_password,
        admin_username: adminObject.admin_username,
      },
    });
  };

  const handleSubmit = (values: AdminLoginValues) => {
    console.log(values);
  };

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Box
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
        border="1px solid"
        borderRadius={5}
        borderColor="gray.200"
        w={500}
      >
        <Formik
          validationSchema={AdminLoginValidation}
          initialValues={adminInitialLoginValues}
          onSubmit={handleSubmit}
        >
          <Form>
            <Flex py={4} px={5} gap={6} flexDir="column">
              <Flex justify="space-between" align="center" w="full">
                <Text fontWeight={700} fontSize="20px">
                  Admin Login
                </Text>
                <Icon pb={1} color="#FF4D00" boxSize={7} as={AiFillLock} />
              </Flex>
              <Flex gap={3} w="full" flexDir="column">
                <LabelledInput
                  label="Enter your email ID"
                  name="email"
                  placeholder="xyz@gmail.com"
                />

                <LabelledInput
                  label="Enter password"
                  name="password"
                  placeholder="********"
                />

                <Flex
                  fontWeight={500}
                  w="full"
                  justify="space-between"
                  align="center"
                >
                  <Flex gap={2}>
                    <Checkbox />
                    <Text>Remember me</Text>
                  </Flex>
                  <Text>Forgot password ?</Text>
                </Flex>
              </Flex>
              <Flex gap={3}>
                <Button
                  isLoading={submitting}
                  type="submit"
                  _hover={{
                    bg: "gray.700",
                  }}
                  color="white"
                  bg="#0E0E11"
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};

export default AdminAuthPage;
