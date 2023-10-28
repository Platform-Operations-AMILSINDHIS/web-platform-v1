import { Flex, Text } from "@chakra-ui/react";

const PaymentSection = () => {
  return (
    <Flex py={10} w="full" align="center" flexDir="column">
      <Text fontWeight={500} fontSize="4xl">
        Payment Information
      </Text>
      <Text py={3} maxW={800} textAlign="center">
        The details regarding the membership fees can be known at the time of
        filling the online membership form or by contacting the KAP Office.
        Membership is not transferable in any case.
      </Text>
    </Flex>
  );
};

export default PaymentSection;
