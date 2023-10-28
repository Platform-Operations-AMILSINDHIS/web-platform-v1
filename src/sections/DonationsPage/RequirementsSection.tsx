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

const RequirementsSection = () => {
  return (
    <Grid templateColumns="1fr 1fr" gap="2rem" w="85%" mx="auto">
      <GridItem>
        <Heading fontWeight={600} fontSize="5xl">
          Donations Requirements
        </Heading>
      </GridItem>
      <GridItem>
        <Accordion allowMultiple>
          {[
            {
              title: "Donation Amounts",
              content:
                "We accept donations of any amount, big or small. Your contribution can make a significant impact on our initiatives.",
            },
            {
              title: "Payment Methods",
              content: "This is the content for the payment methods section",
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

export default RequirementsSection;
