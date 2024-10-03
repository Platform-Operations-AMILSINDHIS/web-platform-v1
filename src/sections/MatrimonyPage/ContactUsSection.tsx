import { Grid, Flex, Text, Heading, Spacer, Box } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

import Mrs_Lajwati_Thandani_image from "../../../public/images/matrimony/Mrs_Lajwati_Thandani.png";
import Mrs_Nikita_Advani_image from "../../../public/images/matrimony/Mrs_Nikita_Advani.png";

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
            contact: "Mobile: +91 9967605943",
          },
          {
            image: Mrs_Nikita_Advani_image,
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
