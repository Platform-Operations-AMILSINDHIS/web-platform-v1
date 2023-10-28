import { Flex, Heading, Text } from "@chakra-ui/react";
import LinkButton from "../buttons/LinkButton";

interface InformationBoxProps {
  identifier: string;
  title: string;
  content: string[];
  URL: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({
  identifier,
  title,
  content,
  URL,
}) => {
  return (
    <Flex
      px={10}
      py={5}
      flexDir="column"
      bg="red"
      justify="space-between"
      gap={3}
      backgroundImage="/images/backgrounds/ajrak_bg_legacy.jpg"
      border="1px solid"
      borderColor="gray.100"
      borderRadius={10}
    >
      <Flex gap={3} flexDir="column">
        <Text fontWeight={500} color="#FF4D00">
          {identifier}
        </Text>
        <Heading
          textTransform="capitalize"
          fontSize="4xl"
          fontWeight="semibold"
        >
          {title}
        </Heading>
        {content.map((text, index) => {
          return <Text key={index}>{text}</Text>;
        })}
      </Flex>
      <Flex gap={3} w="full">
        <LinkButton
          size="sm"
          px={5}
          py={5}
          CTATheme={false}
          CTAlabel={"Go to Form"}
          CTAlink={URL}
        />
        <LinkButton
          size="sm"
          px={5}
          py={5}
          CTAlabel={"Learn More"}
          CTAlink={URL}
        />
      </Flex>
    </Flex>
  );
};

export default InformationBox;
