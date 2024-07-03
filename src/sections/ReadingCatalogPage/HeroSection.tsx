import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import BlogCatalogSearchBar from "~/components/blog/BlogCatalogSearchBar";
import useWindowDimensions from "~/hooks/useWindowDemensions";

interface SectionProps {
  handleSearch: (query: string) => void;
}

const HeroSection: React.FC<SectionProps> = ({ handleSearch }) => {
  const { width } = useWindowDimensions();

  return (
    <Flex py="2rem" direction="column" w="100%" alignItems="center">
      <Text
        fontSize={["lg", "lg", "2xl"]}
        fontWeight="semibold"
        textColor="#1F293780"
      >
        Welcome to the
      </Text>
      <Text
        fontSize={["4xl", "4xl", "7xl"]}
        fontWeight="semibold"
        _after={
          width && width < 800
            ? {}
            : {
                content: '""',
                display: "block",
                width: "100%",
                height: "0.5rem",
                background: "#FF4D00",
                borderRadius: "20px",
                mt: "-0.5rem",
              }
        }
      >
        Reading Catalog
      </Text>

      <Text textAlign="center" maxW={600} mt="1rem" textColor="#1F2937">
        Browse, pick and decide your favorite reading habits, from our
        ever-growing collection of samachar, newsletter and blogs. Stay tuned
        for more
      </Text>
      <BlogCatalogSearchBar handleSearch={handleSearch} />
    </Flex>
  );
};

export default HeroSection;
