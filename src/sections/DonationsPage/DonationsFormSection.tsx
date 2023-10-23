import {
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";

import { LabelledInput } from "~/components/forms";

import { ArrowForwardIcon } from "@chakra-ui/icons";

const DonationsForm: React.FC = () => {
  return (
    <Flex direction="column" alignItems="center" gap="2rem">
      <Grid templateColumns="repeat(3, 1fr)" gap="2rem">
        <GridItem>
          <LabelledInput type="chakra-text" label="Full Name of the Donor" />
        </GridItem>
        <GridItem>
          <LabelledInput type="chakra-text" label="Contact Number" />
        </GridItem>
        <GridItem>
          <LabelledInput type="chakra-text" label="Email" />
        </GridItem>
      </Grid>

      <Grid templateColumns="1fr 1fr" gap="2rem">
        <GridItem>
          <Text>Copy of PAN Card (Upload)</Text>
          <Spacer h="1rem" />
          <Flex
            h="8rem"
            w="22rem"
            bgColor="rgba(251, 31, 255, 0.07)"
            border="2px dashed #FB1FFF"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
          >
            <Text>Drag & drop your files here or choose files</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>Copy of Address Proof (Upload)</Text>
          <Spacer h="1rem" />
          <Flex
            h="8rem"
            w="22rem"
            bgColor="rgba(251, 31, 255, 0.07)"
            border="2px dashed #FB1FFF"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
          >
            <Text>Drag & drop your files here or choose files</Text>
          </Flex>
        </GridItem>
      </Grid>

      <Button
        h="3.25rem"
        w="15rem"
        colorScheme="yellow"
        rightIcon={<ArrowForwardIcon />}
      >
        Submit
      </Button>
    </Flex>
  );
};

const DonationsFormSection = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Box mb="4rem" w="40%" textAlign="center">
        <Heading fontWeight="semibold" fontSize="5xl">
          Donations Form
        </Heading>
        <Spacer h="1rem" />
        <Text fontSize="lg">
          Fill out the fields below to complete your personal profile. Make sure
          to fill all the fields and not miss out any important details.
        </Text>
      </Box>

      <DonationsForm />
    </Flex>
  );
};

export default DonationsFormSection;
