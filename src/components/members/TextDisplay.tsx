import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface TextDisplayProps {
  icon: IconType;
  content: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ content, icon }) => {
  return (
    <Flex align="center" flexDir="column" gap={5}>
      <Box borderRadius="50%" bg="orange.500" p={2}>
        <Icon color="white" as={icon} boxSize={6} />
      </Box>
      <Box
        px={5}
        py={3}
        borderRadius={10}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        border="1px solid"
        borderColor="rgba(0, 0, 0, 0.16)"
      >
        <Text textAlign="center" maxW={400}>
          {content}
        </Text>
      </Box>
    </Flex>
  );
};

export default TextDisplay;
