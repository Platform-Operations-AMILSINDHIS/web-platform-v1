import {
  Grid,
  GridItem,
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
    <Grid templateColumns={["1fr", "1fr 1fr"]} gap="2rem" w="85%" mx="auto">
      <GridItem>
        <Heading fontWeight={600} fontSize={["40px", "55px"]}>
          Thinking about donating to us ?
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
              content:
                "Payment can be made only in UPI by the QR code below, and we will not be accepting donations from NRE accounts and foreigners or foreign accounts",
            },
            {
              title: "Donation Reliefs",
              content:
                "Donation camps offer opportunities to contribute to various causes, supporting those in need. Health checkup camps prioritise the society's wellness, ensuring that even the ones who face socio-economic constraints, have access to healthcare services. Through educational drives, we aim to empower our community by promoting learning and skill development. ",
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
              <AccordionPanel pb={4} fontSize="medium">
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
