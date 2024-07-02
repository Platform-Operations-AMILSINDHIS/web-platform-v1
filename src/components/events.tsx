import { Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

export const EventThumb: React.FC<{
  image: string;
  date: Date;
  title: string;
  href?: string;
}> = ({ image, date, title, href = "#" }) => {
  return (
    <Link href={href} target="_blank" _hover={{ textDecor: "none" }}>
      <Flex flexDir="column" gap="1rem">
        <img src={image} alt="" />
        <Box>
          <Text color="#FB1FFF" fontSize="sm" fontWeight="semibold">
            {date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Text color="#1F2937" fontWeight="semibold">
            {title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};
