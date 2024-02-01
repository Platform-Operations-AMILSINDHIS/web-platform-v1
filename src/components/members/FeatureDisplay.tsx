import { Box, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

interface FeatureDisplayProps {
  content: string;
  icon: StaticImageData;
}

const FeatureDisplay: React.FC<FeatureDisplayProps> = ({ content, icon }) => {
  return (
    <Box position="relative">
      <Box top={-9} left={-5} position="absolute">
        <Image src={icon} alt="feature-icon" width={55} />
      </Box>
      <Box
        fontSize="small"
        px={5}
        py={3}
        borderRadius={10}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        border="1px solid"
        borderColor="rgba(0, 0, 0, 0.16)"
        maxW={350}
      >
        <Text textAlign="center" maxW={350}>
          {content}
        </Text>
      </Box>
    </Box>
  );
};

export default FeatureDisplay;
