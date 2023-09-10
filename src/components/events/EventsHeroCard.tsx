import { Box, Flex, Text } from "@chakra-ui/react";
import LinkButton from "../buttons/LinkButton";

const CardBgImage = "/images/backgrounds/julian-myles-3G6Eu4Hh8gE-unsplash.jpg";

const EventHeroCard = () => {
  return (
    <Box
      background={`linear-gradient(90deg, rgba(0, 0, 0, 0.50) 63.72%, rgba(169, 162, 162, 0.00) 99.86%), url(${CardBgImage}), lightgray 50% / cover no-repeat;`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      borderRadius={20}
      alignItems="flex-start"
      my={10}
      p="75px"
      boxShadow={"0px 6px 0px 0px rgba(31, 41, 55, 0.27)"}
    >
      <Flex gap={7} flexDir="column">
        <Flex flexDir="column">
          <Text fontWeight={600} color={"#FF4D00"} fontSize="md">
            Amil Events & Drives
          </Text>
          <Text color={"white"} fontWeight={700} fontSize={"5xl"}>
            Attend, connect{" "}
            <span
              style={{
                color: "#FF4D00",
              }}
            >
              & explore
            </span>
          </Text>
          <Text fontWeight={400} color={"white"} maxW={650} fontSize="lg">
            Join us in our mission to foster unity, celebrate our rich Sindhi
            heritage, and empower the Amil Sindhi community through a series of
            captivating events. RSVP Today or find out more
          </Text>
        </Flex>
        <Flex align="center" gap={3}>
          <LinkButton CTATheme={false} CTAlink="./" CTAlabel="Explore" />
          <LinkButton CTAlink="./" CTAlabel="Gallery" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventHeroCard;
