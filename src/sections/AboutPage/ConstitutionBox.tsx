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
      templateColumns="1fr 1fr"
      gap="2rem"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background:
          "linear-gradient(to bottom, rgba(255, 192, 0, 0.4), rgba(255, 192, 0, 0.4)), url(/images/backgrounds/ajrak_bg_legacy.jpg)",
        borderRadius: "20px",
        zIndex: -1,
      }}
    >
      <GridItem>
        <Text color="#FF4D00" fontWeight="semibold">
          Our Constitution
        </Text>
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
