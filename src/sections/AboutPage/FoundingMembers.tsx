import { Flex, Grid, Box, Text, Spacer, Image } from "@chakra-ui/react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const FoundingMembers = ({induShaniWords}: {induShaniWords: string;}) => {
  return (
    <Box textAlign="center">
      <Text textColor="#FF4D00" fontWeight={600}>
        Meet Our Founding Members
      </Text>

      <Spacer h="2rem" />

      <Grid templateColumns="repeat(5, 1fr)" gap="1.5rem">
        {[
          {
            image: "https://placehold.jp/297x323.png",
            role: "President",
            name: "Fatechand Assudmal Jhangiani",
            description:
              "A dedicated leader and visionary who played a pivotal role in establishing the Panchayat.",
          },
          {
            image: "https://placehold.jp/297x323.png",
            role: "Vice-President",
            name: "Jagatrai Issardas Shivdasani",
            description:
              "An integral part of the founding team, contributing his expertise and leadership.",
          },
          {
            image: "https://placehold.jp/297x323.png",
            role: "Honorary Secretary",
            name: "Wadhumal Hukumatrai Alimchandani",
            description:
              "The driving force behind the Panchayat's administrative foundation.",
          },
          {
            image: "https://placehold.jp/297x323.png",
            role: "Joint Secretary",
            name: "Tahilram Assudmal Gurbaxani",
            description:
              "A key member responsible for the Panchayat's early organization and operations.",
          },
          {
            image: "https://placehold.jp/297x323.png",
            role: "Advocate",
            name: "Hassasingh H. Advani",
            description:
              "A key member responsible for the Panchayat's early organization and operations.",
          },
        ].map(({ image, role, name, description }, i) => (
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
            <Text>{description}</Text>
          </Flex>
        ))}
      </Grid>

      <Spacer h="5rem" />

      {/* Two paragraphs of text here */}

      <Box mx="auto" maxW="62%" textAlign="center">
        {/* <Box>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                nodeType: "document",
                content: ,
                data: {},
              }),
            }}
          />
        </Box> */}

        <Text whiteSpace="pre-wrap">
          {induShaniWords}
        </Text>

        {/* <Spacer h="1rem" />

        <Text>
          Since its inception, the Panchayat has continued to uphold the values
          and principles set forth by its founders. It has evolved into a
          dynamic organization that not only provides crucial support to those
          in need but also serves as a vital cultural and social hub for the
          Amil Sindhi community. The legacy of these founding members lives on,
          as their commitment to service and community building continues to
          inspire future generations within the Panchayat.
        </Text> */}
      </Box>
    </Box>
  );
};

export default FoundingMembers;
