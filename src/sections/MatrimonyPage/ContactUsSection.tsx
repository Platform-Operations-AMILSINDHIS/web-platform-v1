import { Grid, Flex, Text, Heading, Box } from "@chakra-ui/react";
import Image from "next/image";

import Mrs_Lajwati_Thandani_image from "../../../public/images/matrimony/Mrs_Lajwati_Thandani.png";
// import Mrs_Nikita_Advani_image from "../../../public/images/matrimony/Mrs_Nikita_Advani.png";
import Mrs_Gita_Kaycee_image from "../../../public/images/matrimony/Mrs_Gita_Kaycee.jpg";

const ContactUsSection = () => {
  return (
    <Flex id="contact-us" direction="column" alignItems="center">
      <Heading>Contact Us</Heading>
      <Grid
        mt="3rem"
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap="1.5rem"
      >
        {[
          {
            image: Mrs_Lajwati_Thandani_image,
            role: "Convener",
            name: "Mrs. Lajwanti Thadani",
            contact: "Mobile: +91 99676 05943",
          },
          {
            image: Mrs_Gita_Kaycee_image,
            role: "Co-Convener",
            name: "Mrs Gita Kaycee née Malkani",
            contact: "Mobile: +91 98193 36685",
          },
        ].map(({ image, role, name, contact }, i) => (
          <Flex
            key={i}
            direction="column"
            alignItems="baseline"
            textAlign="left"
          >
            <Box position="relative" width={250} height={350}>
              <Image alt="" src={image} layout="fill" objectFit="cover" />
            </Box>
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
