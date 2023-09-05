import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

interface sectionProps {
  picturesArray: {
    image: string;
    name: string;
    href: string;
  }[];
}

const OfferingsSection = ({ picturesArray }: sectionProps) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="3rem">
      <Flex gridColumn="span 2" flexDir="column" align="baseline" gap="0.5rem">
        <Text fontWeight={700} color="#0079FF">
          Offerings
        </Text>
        <Heading fontSize="5xl">
          What we <span style={{ color: "#0079FF" }}>offer</span>
        </Heading>
        <Text fontSize={18} fontWeight={400}>
          At KAP, we are committed to serving our members and fostering a strong
          sense of unity. Feel free to explore our website and take advantage of
          these offerings. Together, let&apos;s make our vibrant community
          thrive!
        </Text>
      </Flex>

      {picturesArray.map(({ image, name, href }, i) => (
        <Link key={i} href={href}>
          <Box _hover={{ textDecoration: "none" }}>
            <Flex
              h="200px"
              w="100%"
              p="20px"
              flexDir="column-reverse"
              backgroundImage={image}
              objectFit="fill"
              borderRadius="15px"
              boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
            >
              <Text color="white" fontWeight="semibold">
                {name} <ArrowForwardIcon />
              </Text>
            </Flex>
          </Box>
        </Link>
      ))}
    </Grid>
  );
};

export default OfferingsSection;
