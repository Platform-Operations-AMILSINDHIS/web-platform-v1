import {
  Grid,
  GridItem,
  Text,
  Heading,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const ConstitutionBox = () => {
  return (
    <Grid
      p="4rem"
      borderRadius="20px"
      bgColor="rgba(255, 192, 31, 0.20)"
      templateColumns="1fr 1fr"
    >
      <GridItem>
        <Text color="#FF4D00">Our Constitution</Text>
        <Heading fontWeight={600} fontSize="5xl">
          Transparency and Governance
        </Heading>
      </GridItem>
      <GridItem>
        <Text>
          We believe in upholding the principles of democracy and accountability
          to ensure that our community&apos;s interests are safeguarded and our
          mission is pursued with integrity
        </Text>

        <Spacer h="2rem" />

        <Button colorScheme="yellow" rightIcon={<ArrowForwardIcon />}>
          Download Constitution
        </Button>
      </GridItem>
    </Grid>
  );
};

export default ConstitutionBox;
