import { Box, Flex, Tag } from "@chakra-ui/react";

interface SectionProps {
  uniqueTags: string[];
}

const FiltersSection: React.FC<SectionProps> = ({ uniqueTags }) => {
  return (
    <Flex gap={2}>
      {uniqueTags.map((tag, index) => (
        <Tag bg="gray.200" px={3} py={2} borderRadius={20} key={index}>
          {tag}
        </Tag>
      ))}
    </Flex>
  );
};

export default FiltersSection;
