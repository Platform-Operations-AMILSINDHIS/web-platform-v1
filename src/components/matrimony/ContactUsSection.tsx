import { Grid, Flex, Text, Heading, Image, Spacer } from "@chakra-ui/react";

const ContactUsSection = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Heading>Contact Us</Heading>
      <Grid mt="3rem" templateColumns="repeat(2, 1fr)" gap="1.5rem">
        {[
          {
            image: "https://placehold.jp/297x323.png",
            role: "Convener",
            name: "Mrs. Lajwanti Thadani",
            contact: "Mobile: +91 9967605943",
          },
          {
            image: "https://placehold.jp/297x323.png",
            role: "Sub-committee member",
            name: "Mr. Ghanshyam Wadhwani",
            contact: "Mobile: +91 9930222092",
          },
        ].map(({ image, role, name, contact }, i) => (
          <Flex
            key={i}
            direction="column"
            alignItems="baseline"
            textAlign="left"
          >
            <Image alt="" src={image} />
            <Text mt="0.75rem" fontWeight={500}>
              {role}
            </Text>
            <Text fontWeight={700}>{name}</Text>
            <Text>{contact}</Text>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};

export default ContactUsSection;
