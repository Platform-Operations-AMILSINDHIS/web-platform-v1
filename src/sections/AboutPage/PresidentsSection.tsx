import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  UnorderedList,
  ListItem,
  Spacer,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const PresidentsSection = () => {
  return (
    <>
      <Flex direction="column" alignItems="center">
        <Text textColor="#FF4D00" fontWeight={600}>
          Our Past and Current Presidents
        </Text>
        <Flex flexDir="column" alignItems="center">
          <Heading fontSize="5xl" fontWeight="semibold">
            Guiding Our Community
          </Heading>
          <Heading fontSize="5xl" fontWeight="semibold">
            Towards a Brighter Future
          </Heading>
        </Flex>
      </Flex>

      <Spacer h="6rem" />

      <Flex mx="auto" w="80%" gap="4rem" direction="column" alignItems="center">
        {[
          {
            image: "https://placehold.jp/512x263.png",
            name: "Fatehchand Assudomal Jhangiani",
            points: [
              "An esteemed leader whose tenure marked a period of growth and progress for the Panchayat.",
              "Known for his visionary leadership and dedication to the community's welfare.",
            ],
          },
          {
            image: "https://placehold.jp/512x263.png",
            name: "Kishinchand T Shahani",
            points: [
              "A prominent figure who continued the legacy of strong leadership within the Panchayat.",
              "Instrumental in expanding the Panchayat's reach and influence.",
            ],
          },
          {
            image: "https://placehold.jp/512x263.png",
            name: "Vishni Malkani",
            points: [
              "A compassionate leader who championed the cause of education and empowerment.",
              "Noted for initiatives aimed at supporting educational opportunities for Amil Sindhi youth.",
            ],
          },
          {
            image: "https://placehold.jp/512x263.png",
            name: "Kamla Hiranand",
            points: [
              "A trailblazer who played a significant role in advancing gender equality and community welfare.",
              "Committed to fostering unity and inclusivity within the Amil Sindhi community.",
            ],
          },
          {
            image: "https://placehold.jp/512x263.png",
            name: "Mangharam Sipahimalani",
            points: [
              "A visionary leader who focused on cultural preservation and heritage promotion.",
              "Instrumental in initiatives to document and celebrate Amil Sindhi culture.",
            ],
          },
          {
            image: "https://placehold.jp/512x263.png",
            name: "Mohan Mirchandani",
            points: [
              "A dedicated advocate for community engagement and outreach.",
              "Known for strengthening the Panchayat's connections with the global Amil Sindhi diaspora.",
            ],
          },
          {
            image: "https://placehold.jp/512x263.png",
            name: "Dr. Indu Shahani",
            points: [
              "A respected academic and leader with a strong commitment to education and empowerment.",
              "Driven by a vision of fostering excellence and progress within the community.",
            ],
          },
        ].map(({ image, name, points }, i) => (
          <Flex
            key={i}
            mx="auto"
            gap="2rem"
            direction={i % 2 === 0 ? "row" : "row-reverse"}
          >
            <Box>
              <Image alt="" src={image} />
            </Box>

            <Box w="50%">
              <Text fontSize="2xl" fontWeight={500}>
                {name}
              </Text>
              <Spacer h="1rem" />
              <UnorderedList>
                {points.map((point, j) => (
                  <ListItem key={j} mb="0.5rem" fontSize="xl">
                    {point}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default PresidentsSection;
