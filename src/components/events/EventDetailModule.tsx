import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import {
  formatDate,
  getDayOfWeekFromDate,
  getTimeFromDate,
} from "~/utils/helper";
import LinkButton from "../buttons/LinkButton";

interface DetailModuleProps {
  title: string | null | undefined;
  date: Date;
  location: string | null | undefined;
}

const EventDetailModule: React.FC<DetailModuleProps> = ({
  title,
  date,
  location,
}) => {
  return (
    <Flex
      gap={4}
      flexDir="column"
      borderRadius={20}
      p={8}
      boxShadow="0px 5px 0px 0px rgba(31, 41, 55, 0.25)"
      border="1px solid rgba(31, 41, 55, 0.18)"
      w="1150px"
    >
      <Text fontWeight={600} fontSize="xl">
        {`${title}, ${location}`}
      </Text>
      <Flex flexDir="column">
        <Text fontSize={"md"}>{`${getDayOfWeekFromDate(date)}, ${formatDate(
          date
        )}`}</Text>
        <Text fontWeight={600}>{`${getTimeFromDate(date)}`}</Text>
      </Flex>
      <Text
        fontWeight={600}
        _hover={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
        color="purple.400"
        fontSize={"lg"}
      >{`${location}`}</Text>
      <Divider
        variant="dashed"
        style={{
          borderWidth: "2px", // Increase the border width for visibility
          borderColor: "rgba(31, 41, 55, 0.32)", // Change the border color to make it stand out
        }}
      />
      <Flex gap={3} align="center">
        <Button
          style={{
            cursor: "pointer",
            color: "white",
            backgroundColor: "#FF4D00",
            boxShadow: "0px 4px 0px 0px rgba(0, 0, 0, 0.19)",
          }}
          fontWeight={600}
          py={5}
          px={8}
          fontSize="sm"
          as="a"
        >
          RSVP
        </Button>
        <Button
          style={{
            cursor: "pointer",
            color: "#1F2937",
            border: "1px solid",
            borderColor: "rgba(31, 41, 55, 0.30)",
            backgroundColor: "white",
            boxShadow: "0px 4px 0px 0px rgba(0, 0, 0, 0.19)",
          }}
          fontWeight={600}
          py={5}
          px={8}
          fontSize="sm"
          as="a"
        >
          Share
        </Button>
      </Flex>
    </Flex>
  );
};

export default EventDetailModule;
