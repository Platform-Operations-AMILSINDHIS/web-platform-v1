import { Button, Checkbox, Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillLock } from "react-icons/ai";
import { Form, Formik, FormikHelpers } from "formik";
import { LabelledInput } from "../forms";
import { AdminLoginValidation } from "~/validations/AuthValidations";

import React, { useState } from "react";
import axios from "axios";
import { AdminLoginValues, adminInitialLoginValues } from "~/hooks/useForm";
import { useAdminAtom } from "~/lib/atom";
import type { adminAtomBody } from "~/types/atoms/admin";

const Admin: React.FC = () => {
  const [{ admin }, setAdminAtom] = useAdminAtom();
  const [submitting, setSubmitting] = useState(false);

  return (
    <Formik
      validationSchema={AdminLoginValidation}
      initialValues={adminInitialLoginValues}
      onSubmit={() => {}}
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
  );
};

export default Admin;
