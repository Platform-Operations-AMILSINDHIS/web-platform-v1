import { Grid, GridItem, Text, Heading } from "@chakra-ui/react";

const CommunityBox = () => {
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
        <Text mb={1} color="#FF4D00" fontWeight="semibold">
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
