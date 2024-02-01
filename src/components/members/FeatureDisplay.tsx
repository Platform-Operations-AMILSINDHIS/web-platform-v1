import { Box, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

interface FeatureDisplayProps {
  content: string;
  icon: StaticImageData;
}

const FeatureDisplay: React.FC<FeatureDisplayProps> = ({ content, icon }) => {
  return (
    <Box position="relative">
      <Image src={icon} alt="feature-icon" width={100} />
      <Text textAlign="center" maxW={400}>
        {content}
      </Text>
    </Box>
  );
};

export default FeatureDisplay;
