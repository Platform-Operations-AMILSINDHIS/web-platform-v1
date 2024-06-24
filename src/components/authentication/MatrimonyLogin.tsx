import { Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import {
  MatrimonyLoginValues,
  matrimonyLoginInitialValues,
} from "~/hooks/useForm";
import { MatrimonyLoginValidation } from "~/validations/AuthValidations";
import { LabelledInput } from "../forms";

interface MatrimonyLoginProps {
  isSubmitting: boolean;
  handleFormSubmit: (
    values: MatrimonyLoginValues,
    setErrors: FormikHelpers<MatrimonyLoginValues>
  ) => Promise<void>;
}

const MatrimonyLogin: React.FC<MatrimonyLoginProps> = ({
  isSubmitting,
  handleFormSubmit,
}) => {
  return (
    <Formik
      validationSchema={MatrimonyLoginValidation}
      initialValues={matrimonyLoginInitialValues}
      onSubmit={handleFormSubmit}
    >
      <Form>
        <Flex py={5} px={2} gap={6} align="center" flexDir="column">
          <Flex gap={3} align="center" flexDir="column">
            <Text fontSize="25px" fontWeight={800}>
              Matrimony Login
            </Text>
            <Text fontWeight={500} maxW={400} textAlign="center">
              Great to have you back! Enter your assigned matrimony ID
              credentials to access this page
            </Text>
          </Flex>
          <Flex w="full" flexDir="column">
            <LabelledInput
              onChange={(e) => console.log(e.target.value)}
              label="Enter your Matrimony ID"
              name="matrimony_id"
              placeholder="MAT#XYZ"
            />
            <Flex mt={2} w="full" justify="flex-end">
              <Text
                color="#FF4D00"
                textDecoration="underline"
                fontSize="small"
                fontWeight={500}
              >
                Forgot Matrimony ID ?
              </Text>
            </Flex>
          </Flex>
          <Flex gap={3}>
            <Button
              isLoading={isSubmitting}
              type="submit"
              _hover={{
                bg: "gray.700",
              }}
              color="white"
              bg="#0E0E11"
            >
              Login
            </Button>
            <Button
              onClick={() => (window.location.href = "/matrimony")}
              color="#FF4D00"
              bg="none"
              border="2px solid"
              borderColor="#FF4D00"
              _hover={{
                color: "white",
                bg: "#FF4D00",
              }}
            >
              No ID ? Build your profile
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  );
};

export default MatrimonyLogin;
