import { Text, Heading, Flex } from "@chakra-ui/react";

const CommunityBox = () => {
  return (
    <Flex
      align={["center", "center", "flex-start"]}
      flexDir={["column", "column", "row"]}
      p="4rem"
      borderRadius="20px"
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
      <Flex w={["100%", "100%", "50%"]} flexDir="column">
        <Text
          fontSize={["sm", "sm", "lg"]}
          mb={1}
          color="#FF4D00"
          fontWeight="semibold"
        >
          Stay Connected
        </Text>
        <Heading fontWeight={600} fontSize={["3xl", "3xl", "5xl"]}>
          Join Our Community and Stay Informed
        </Heading>
      </Flex>
      <Flex w={["100%", "100%", "50%"]}>
        <Text>
          We invite you to join our vibrant community and stay informed about
          the latest news, events, and initiatives of the Khudabadi Amil
          Panchayat of Bombay. Stay updated with our activities, cultural
          events, and community news by following us on our social media
          profiles. Engage with fellow community members, share your thoughts,
          and be a part of the conversations that matter to you.
        </Text>
      </Flex>
    </Flex>
  );
};

export default CommunityBox;
