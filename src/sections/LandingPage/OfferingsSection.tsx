import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

import ArrowImage from "../../../public/images/what-we-offer/arrow.png";

interface sectionProps {
  picturesArray: {
    image: string;
    name: string;
    href: string;
  }[];
}

const OfferingsSection = ({ picturesArray }: sectionProps) => {
  return (
    <Grid position="relative" templateColumns="repeat(4, 1fr)" gap="3rem">
      <Box transform="rotate(3deg)" left={"25%"} top={-12} position="absolute">
        <Image src={ArrowImage} alt="arrow" width={240} height={240} />
      </Box>
      <Flex gridColumn="span 2" flexDir="column" align="baseline" gap="0.7rem">
        <Flex flexDir="column" gap="0.4rem">
          <Text fontWeight={500} color="#FF4D00">
            Offerings
          </Text>
          <Heading fontSize="5xl">
            What we <span style={{ color: "#FF4D00" }}>offer</span>
          </Heading>
        </Flex>
        <Text fontSize={18} lineHeight="167.5%" fontWeight={400}>
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
              <Flex align="center" justify="space-between">
                <Text color="white" fontWeight="semibold">
                  {name}
                </Text>
                <Box transform="rotate(-45deg)" borderRadius="50%" bg="white">
                  <Icon
                    rotate={45}
                    color="#FF4D00"
                    boxSize={7}
                    as={HiMiniArrowSmallRight}
                  />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Link>
      ))}
    </Grid>
  );
};

export default OfferingsSection;
