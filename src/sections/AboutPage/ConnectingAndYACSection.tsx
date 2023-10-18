import { Flex, Box, Text, Heading, Image, Spacer } from "@chakra-ui/react";

interface TextAndImageBoxProps {
  tag: string;
  title: string;
  content: string;
  image: string;
  direction?: "row" | "row-reverse";
}

const TextAndImageBox: React.FC<TextAndImageBoxProps> = ({
  tag,
  title,
  content,
  image,
  direction = "row",
}) => {
  return (
    <Flex gap="6rem" direction={direction}>
      <Box w="50%">
        <Text color="#FF4D00" fontWeight="semibold">
          {tag}
        </Text>
        <Heading fontWeight={600} fontSize="5xl">
          {title}
        </Heading>
        <Text fontSize="lg">{content}</Text>
      </Box>
      <Box w="50%">
        <Image alt="" src={image} />
      </Box>
    </Flex>
  );
};

const ConnectingAndYACSection = () => {
  return (
    <Flex direction="column" gap="4rem">
      <TextAndImageBox
        tag="Our Global Reach"
        title="Connecting Amil Sindhis Worldwide"
        content="At the Khudabadi Amil Panchayat of Bombay, we understand the importance of connecting Amil Sindhis around the world. Our global networking efforts aim to bridge geographical boundaries, uniting our community on a single platform. We are excited to introduce our new website, www.amilsindhis.org, as a central hub for Amil Sindhis across the globe."
        image="https://placehold.jp/619x366.png"
        direction="row"
      />

      <TextAndImageBox
        tag="Empowering the Youth, Building a Better Society"
        title="Young Amil Circle (YAC)"
        content="The Young Amil Circle (YAC) is a source of pride within the Khudabadi Amil Panchayat of Bombay. Our youth-driven initiative is dedicated to empowering the next generation to create a positive impact on society. YAC believes in the mantra: Catch them young, watch them grow."
        image="https://placehold.jp/619x366.png"
        direction="row-reverse"
      />
    </Flex>
  );
};

export default ConnectingAndYACSection;
