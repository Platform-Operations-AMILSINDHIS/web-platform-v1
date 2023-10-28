import {
  Grid,
  GridItem,
  Text,
  Heading,
  Box,
  Spacer,
  Image,
} from "@chakra-ui/react";

const MatrimonyHero = () => {
  return (
    <Grid templateColumns="1fr 1fr" gap="3rem">
      <GridItem>
        <Text color="#1F293780" fontWeight="medium">
          Khudabadi Amil Panchayat presents
        </Text>
        <Spacer h="0.5rem" />
        <Heading fontWeight="semibold" fontSize="5xl">
          <Box as="span" color="#0079FF">
            Matrimony
          </Box>
          &nbsp;Services
        </Heading>
        <Spacer h="0.5rem" />
        <Text color="#1F2937">
          In addition to all the numerous benefits of our membership, Khudabadi
          Amil Panchayat can also play cupid for you! Marriage is one of the
          purest bonds. It is a harmonious union of two souls who are meant to
          be together. This fact makes the Big Decision very crucial. And
          that&nbsp;s the exact reason why we are here for all our prospective
          Amil Sindhi brides and grooms.
        </Text>
      </GridItem>
      <GridItem>
        <Image alt="" src="/images/matrimony/hero.png" />
      </GridItem>
    </Grid>
  );
};

export default MatrimonyHero;
