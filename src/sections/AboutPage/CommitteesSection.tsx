import {
  Grid,
  GridItem,
  Text,
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const ComitteesSection = () => {
  return (
    <Grid templateColumns="1fr 1fr" gap="2rem">
      <GridItem>
        <Text color="#FF4D00">Committees and Their Contributions</Text>
        <Heading fontWeight={600} fontSize="5xl">
          Our Commitment to Empower and Support
        </Heading>
        <Text mt="1rem" fontSize="xl">
          At the Khudabadi Amil Panchayat of Bombay, our commitment to
          empowering and supporting the Amil Sindhi community is embodied by our
          dedicated committees. Each committee plays a unique role in fulfilling
          our mission, ensuring the well-being and prosperity of our community.
          Explore the contributions of each committee here.
        </Text>
      </GridItem>
      <GridItem>
        <>{/* FAQ-like committee sections */}</>

        <Accordion allowMultiple>
          {[
            {
              title: "Relief Committee",
              content: "This is the content for the relief committee",
            },
            {
              title: "Education Aid",
              content: "This is the content for the education aid committee",
            },
            {
              title: "Matrimonial Section",
              content: "Lorem ipsum",
            },
            {
              title: "Amil Samachar",
              content: "Lorem ipsum",
            },
            {
              title: "Publications and Book Launch",
              content: "Lorem ipsum",
            },
            {
              title: "Global Networking",
              content: "Lorem ipsum",
            },
            {
              title: "Young Amil Circle (YAC)",
              content: "Lorem ipsum",
            },
            {
              title: "Social Calendar",
              content: "Lorem ipsum",
            },
          ].map(({ title, content }, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize="3xl"
                    fontWeight={500}
                  >
                    {title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize="xl">
                {content}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </GridItem>
    </Grid>
  );
};

export default ComitteesSection;
