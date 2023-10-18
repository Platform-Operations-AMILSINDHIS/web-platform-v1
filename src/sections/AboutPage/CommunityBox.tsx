import { Grid, GridItem, Text, Heading } from "@chakra-ui/react";

const CommunityBox = () => {
  return (
    <Grid
      p="4rem"
      borderRadius="20px"
      bgColor="rgba(255, 192, 31, 0.20)"
      templateColumns="1fr 1fr"
      gap="2rem"
    >
      <GridItem>
        <Text color="#FF4D00" fontWeight="semibold">
          Stay Connected
        </Text>
        <Heading fontWeight={600} fontSize="5xl">
          Join Our Community and Stay Informed
        </Heading>
      </GridItem>
      <GridItem>
        <Text>
          We invite you to join our vibrant community and stay informed about
          the latest news, events, and initiatives of the Khudabadi Amil
          Panchayat of Bombay. Stay updated with our activities, cultural
          events, and community news by following us on our social media
          profiles. Engage with fellow community members, share your thoughts,
          and be a part of the conversations that matter to you.
        </Text>
      </GridItem>
    </Grid>
  );
};

export default CommunityBox;
