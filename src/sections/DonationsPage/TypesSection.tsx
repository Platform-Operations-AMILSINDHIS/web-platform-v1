import {
  Flex,
  Grid,
  GridItem,
  Box,
  Text,
  Heading,
  Image,
  Spacer,
} from "@chakra-ui/react";

const TypesSection = () => {
  return (
    <Flex id="types-of-donations" direction="column" alignItems="center">
      <Heading mb="3rem" fontWeight={600} fontSize="4xl">
        Types of Donations
      </Heading>

      <Grid w="60%" templateColumns="1fr 1fr" gap="1rem">
        <GridItem
          as={Box}
          p="1rem"
          boxShadow="0px 15px 33px 0px rgba(0, 0, 0, 0.03), 0px 60px 60px 0px rgba(0, 0, 0, 0.03), 0px 135px 81px 0px rgba(0, 0, 0, 0.02), 0px 241px 96px 0px rgba(0, 0, 0, 0.00), 0px 376px 105px 0px rgba(0, 0, 0, 0.00);"
        >
          <Image alt="" src="/images/donations/educational.png" />
          <Spacer h="0.5rem" />
          <Text fontWeight="semibold">Educational Cause</Text>
          <Spacer h="0.6rem" />
          <Text>
            Our contribution can support the education of deserving Amil Sindhi
            students.
          </Text>
        </GridItem>
        <GridItem
          as={Box}
          p="1rem"
          boxShadow="0px 15px 33px 0px rgba(0, 0, 0, 0.03), 0px 60px 60px 0px rgba(0, 0, 0, 0.03), 0px 135px 81px 0px rgba(0, 0, 0, 0.02), 0px 241px 96px 0px rgba(0, 0, 0, 0.00), 0px 376px 105px 0px rgba(0, 0, 0, 0.00);"
        >
          <Image alt="" src="/images/donations/community.png" />
          <Spacer h="0.5rem" />
          <Text fontWeight="semibold">Community Welfare</Text>
          <Spacer h="0.6rem" />
          <Text>
            Help us in our community welfare initiatives that benefit those in
            need.
          </Text>
        </GridItem>
      </Grid>

      <Text mt="2rem">
        Kindly note that an appropriate receipt shall be provided for your
        donation.
      </Text>
      <Text>
        We look forward to your generous contribution in helping us make a
        difference.
      </Text>
    </Flex>
  );
};

export default TypesSection;
