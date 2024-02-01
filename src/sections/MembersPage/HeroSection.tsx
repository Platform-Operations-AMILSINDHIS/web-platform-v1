import { Flex, Box, Text, Spacer } from "@chakra-ui/react";
import Image from "next/image";

import HeroImage01 from "../../../public/images/membership/HeroImage01.jpg";
import HeroImage02 from "../../../public/images/membership/HeroImage02.jpg";
import LinkButton from "~/components/buttons/LinkButton";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const HeroSection = () => {
  return (
    <Flex py="2rem" direction="column" w="100%" alignItems="center">
      <Text fontSize="2xl" fontWeight="semibold" textColor="#1F293780">
        We need you
      </Text>
      <Text
        fontSize="7xl"
        fontWeight="semibold"
        _after={{
          content: '""',
          display: "block",
          width: "100%",
          height: "0.5rem",
          background: "#FF4D00",
          borderRadius: "20px",
          mt: "-0.5rem",
        }}
      >
        &nbsp;Become a{" "}
        <Box as="span" color="#FF4D00">
          Member
        </Box>
        &nbsp;
      </Text>

      <Text maxW={800} textAlign="center" mt="1rem" textColor="#1F2937">
        Are you an Amil Sindhi looking out for opportunities to reconnect to
        your roots? Do you wish to give back to your community and society?
        Then, this is the place to be! With open arms, we invite our fellow Amil
        Sindhis to be a part of our vibrant community!
      </Text>

      <Flex align="flex-start" justify="space-between" mt={20} mb={10} w="full">
        <Box w="50%">
          <Image alt="HeroImage-01" src={HeroImage01} />
        </Box>
        <Flex mt={-5} flexDir="column">
          <Flex flexDir="column">
            <Text fontWeight={500} fontSize="5xl">
              Join us today
            </Text>
            <Text fontSize="lg" w={575}>
              A member of KAP stands a chance to engage in cultural events,
              activities as well as to build resources that preserve our rich
              heritage
            </Text>
            <Flex gap={3} my={4}>
              <LinkButton
                CTAlabel="Learn More"
                CTAlink="/"
                size="sm"
                py={5}
                px={5}
              />
              <LinkButton
                CTAlabel={
                  <Flex alignItems="center" gap="0.5rem">
                    <Box>Enroll Now</Box>
                    <ArrowForwardIcon />
                  </Flex>
                }
                CTAlink="#"
                CTATheme={false}
                size="sm"
                py={5}
                px={5}
              />
            </Flex>
          </Flex>
          <Box h="50%">
            <Image width={600} alt="HeroImage-02" src={HeroImage02} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeroSection;
