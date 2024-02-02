import { Flex, Box, Text, Heading, Spacer } from "@chakra-ui/react";
import Image, { type StaticImageData } from "next/image";

import Connecting_pic from "../../../public/images/about/YAC.jpg";
import YAC_pic from "../../../public/images/about/YAC(01).jpg";

interface TextAndImageBoxProps {
  tag: string;
  title: string;
  content: string;
  image: string | StaticImageData;
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
    <Flex gap="5rem" direction={direction}>
      <Box w="50%">
        <Text color="#FF4D00" fontWeight="semibold">
          {tag}
        </Text>
        <Heading mt={2} mb={3} fontWeight={600} fontSize="5xl">
          {title}
        </Heading>
        <Text fontSize="lg">{content}</Text>
      </Box>
      <Box w="50%">
        <Image width={480} alt="" src={image} />
      </Box>
    </Flex>
  );
};

const ConnectingAndYACSection = () => {
  return (
    <Flex direction="column" gap="5rem">
      <TextAndImageBox
        tag="Our Global Reach"
        title="Connecting Amil Sindhis Worldwide"
        content="At the Khudabadi Amil Panchayat of Bombay, we understand the importance of connecting Amil Sindhis around the world. Our global networking efforts aim to bridge geographical boundaries, uniting our community on a single platform. We are excited to introduce our new website, www.amilsindhis.org, as a central hub for Amil Sindhis across the globe."
        image={Connecting_pic}
        direction="row"
      />

      <TextAndImageBox
        tag="Empowering the Youth, Building a Better Society"
        title="Young Amil Circle (YAC)"
        content="The Young Amil Circle (YAC) is a source of pride within the Khudabadi Amil Panchayat of Bombay. Our youth-driven initiative is dedicated to empowering the next generation to create a positive impact on society. YAC believes in the mantra: Catch them young, watch them grow."
        image={YAC_pic}
        direction="row-reverse"
      />
    </Flex>
  );
};

export default ConnectingAndYACSection;
