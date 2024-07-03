import {
  Grid,
  GridItem,
  Text,
  Heading,
  Box,
  Spacer,
  Image,
  Flex,
} from "@chakra-ui/react";
import LinkButton from "~/components/buttons/LinkButton";

const MatrimonyHero = () => {
  return (
    <Flex gap="3rem">
      <Flex
        gap={2}
        w={["100%", "100%", "50%"]}
        align={["center", "center", "flex-start"]}
        flexDir="column"
      >
        <Text color="#1F293780" fontWeight="medium">
          Khudabadi Amil Panchayat presents
        </Text>
        <Spacer h="0.5rem" />
        <Heading fontWeight="bold" fontSize={["4xl", "4xl", "5xl"]}>
          <Box as="span" color="#FF4D00">
            Matrimony
          </Box>
          &nbsp;Services
        </Heading>
        <Spacer h="0.5rem" />
        <Text
          textAlign={["center", "center", "left"]}
          mb={2}
          fontSize={["sm", "sm", "md"]}
          color="#1F2937"
        >
          In addition to all the numerous benefits of our membership, Khudabadi
          Amil Panchayat can also play cupid for you! Marriage is one of the
          purest bonds. It is a harmonious union of two souls who are meant to
          be together. This fact makes the Big Decision very crucial. And
          that&nbsp;s the exact reason why we are here for all our prospective
          Amil Sindhi brides and grooms.
        </Text>
        <Spacer h="2rem" />
        <Flex w="full" flexDir={["column", "column", "row"]} gap="1.5rem">
          <LinkButton
            CTAlabel="Contact us"
            CTAlink="/matrimony#contact-us"
            onClick={(e) => {
              e.preventDefault();

              document.querySelector("#contact-us")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            CTATheme={false}
          />
          <LinkButton
            CTAlabel="Fill matrimony form"
            CTAlink="/matrimony#matrimony-form"
            onClick={(e) => {
              e.preventDefault();

              document.querySelector("#matrimony-form")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        </Flex>
      </Flex>
      <Flex w="50%" display={["none", "none", "block"]}>
        <Image alt="" src="/images/matrimony/hero.png" />
      </Flex>
    </Flex>
  );
};

export default MatrimonyHero;
