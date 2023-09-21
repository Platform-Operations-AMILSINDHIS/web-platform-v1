import { Box, Flex, Text } from "@chakra-ui/react";

const TopPicks = () => {
  return (
    <Flex gap={4} flexDir="column">
      <Text fontWeight={600} fontSize="xl">
        Team&nbsp;
        <span
          style={{
            color: "#FF4D00",
            textDecoration: "underline",
          }}
        >
          picks
        </span>
      </Text>
    </Flex>
  );
};

export default TopPicks;
