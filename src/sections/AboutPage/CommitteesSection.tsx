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
  Flex,
} from "@chakra-ui/react";

const ComitteesSection = () => {
  return (
    <Flex
      align={["center", "center", "flex-start"]}
      flexDir={["column", "column", "row"]}
      gap="2rem"
    >
      <Flex w={["100%", "100%", "50%"]} flexDir="column">
        <Text mb={1} fontWeight={600} color="#FF4D00">
          Committees and Their Contributions
        </Text>
        <Heading fontWeight={600} fontSize={["3xl", "3xl", "5xl"]}>
          Our Commitment to Empower and Support
        </Heading>
        <Text mt="1rem" fontSize={["sm", "sm", "xl"]}>
          At the Khudabadi Amil Panchayat of Bombay, our commitment to
          empowering and supporting the Amil Sindhi community is embodied by our
          dedicated committees. Each committee plays a unique role in fulfilling
          our mission, ensuring the well-being and prosperity of our community.
          Explore the contributions of each committee here.
        </Text>
      </Flex>
      <>{/* FAQ-like committee sections */}</>

      <Accordion w={["100%", "100%", "50%"]} allowMultiple>
        {[
          {
            title: "Relief Committee",
            content:
              "The Panchayat provides Monthly Financial Assistance to needy families of the community. Presently 35 needy families are being provided with monthly assistance. On receiving information of an Amil family in need, the committee performs due diligence. Being satisfied by the data presented and having assessed the need, the approval is given to the Relief Committee. This intricate procedure ensures that utmost care and consideration is taken and that the deserving family is provided with financial aid.",
          },
          {
            title: "Education Aid",
            content:
              "In various instances, the Panchayat is approached by parents or guardians of deserving students who desire to sparkle in their educational path. To the best of our ability, the education loan or requests to grant fee waiver are generated for deserving Amil Students.",
          },
          {
            title: "Matrimonial Section",
            content:
              "The office bearers have supported actively in match-making and alliances for the young Amil Sindhis. Our matrimonial assistance committee aims to connect the prospective brides and grooms  with their suitable matches, creating meaningful and lasting bonds. All this being done, utmost care is taken to verify all the background checks as well as referrals.",
          },
          {
            title: "Amil Samachar",
            content:
              "Members are privileged to a free lifelong subscription of the Amil Samachar - our monthly newsletter. With digitalization in place, the reach is extending beyond national boundaries. Every Amil family across the globe receives a digital copy of our insightful Amil Samachar which helps keep them in close touch with their community.",
          },
          {
            title: "Publications and Book Launch",
            content:
              "The KAP has been the torch bearer in launching books around the rich heritage of Amil Sindhis. Two Books - 'Amazing Amils' and 'The Amils of Sindh' have been released with efforts made to ensure that these books reach as many Amil Sindhis as possible.",
          },
          {
            title: "Global Networking",
            content:
              "The Panchayat has incorporated a Global Networking Committee. The efforts to engage the entire Amil Sindhi population on a single platform will soom be a reality with our newly developed website www.amilsindhis.org. On this website, Amil Sindhis across the world can become a member of the Panchayat through an easy online application process. ",
          },
          {
            title: "Young Amil Circle (YAC)",
            content:
              "The youth of YAC take on themselves to elevate the society in a holistic manner. From protecting the environment by Beach CleanUp drives to ensuring that the underprivileged are taken care of by Clothes Donation drives and other related initiatives, the YAC team has always at the forefront of making a difference in the society.",
          },
          {
            title: "Social Calendar",
            content:
              "With the Amil Sindhis progressing and creating waves across Industry and Academia, an events and social calendar becomes a pressing need, being released during the AGM. KAP promotes Sindhi Movies, Sindhi Musicals and other programs across some of the best venues where one can mingle with the community, be sure of the environment and have a lovely time engaging in leisure. This is in addition to the memorable Annual General Body Meetings, held traditionally at the Sun n Sand, Mumbai.",
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
            <AccordionPanel pb={4} fontSize="lg">
              {content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export default ComitteesSection;
