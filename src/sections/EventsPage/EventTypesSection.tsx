import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

import BusinessDeal from "../../../public/images/eventTypes/BusinessDeal.svg";
import Checkup from "../../../public/images/eventTypes/Checkup.svg";
import DiverseTeam from "../../../public/images/eventTypes/DiverseTeam.svg";
import LIVEBROADCAST from "../../../public/images/eventTypes/LIVEBROADCAST.svg";

import Image from "next/image";

const EventTypesSection = () => {
  const eventTypes = [
    "AGM",
    "Social Events",
    "Drives & Camps",
    "Entertainment",
  ];

  const eventDetails = [
    {
      eventName: "Annual General Body Meeting",
      eventDescription: `We hold an annual general body meeting (AGM) accompanied by a
        delightful lunch, fostering camaraderie and communication among our
        members. These events are a testament to our commitment of creating a
        strong Amil community.`,
      eventIllustration: BusinessDeal,
    },
    {
      eventName: "Social Gatherings",
      eventDescription: `These events revolve around the objective of strengthening the bond among the KAP and YAC members, thereby leading to the growth and development of the community.`,
      eventIllustration: DiverseTeam,
    },
    {
      eventName: "Events for a cause",
      eventDescription: `With the aim of giving back to the society, these events are driven to holistically support the society and aid in its protection as well as development.`,
      eventIllustration: Checkup,
    },
    {
      eventName: "Events to entertain",
      eventDescription: `YAC usually organises fun activities for its members to encourage team building and to foster stronger relations within the members of YAC, so that they can eventually improve their ecosystem.`,
      eventIllustration: LIVEBROADCAST,
    },
  ];

  const [selected, setSelected] = useState<number>(0);
  return (
    <Flex
      flexDir="row-reverse"
      gap={40}
      justify="center"
      align="center"
      w="full"
    >
      <Flex gap={3} flexDir="column">
        <Flex gap={5}>
          {eventTypes.map((type, index) => {
            return (
              <Text
                onClick={() => setSelected(index)}
                _hover={{ cursor: "pointer" }}
                color={selected === index ? "#FF4D00" : "gray.400"}
                fontWeight={selected === index ? 600 : 500}
                variant="none"
                key={index}
              >
                {type}
              </Text>
            );
          })}
        </Flex>
        <Text fontWeight={500} fontSize="4xl">
          {eventDetails[selected]?.eventName}
        </Text>
        <Text lineHeight="171.5%" maxW={550}>
          {eventDetails[selected]?.eventDescription}
        </Text>
      </Flex>
      <Image
        alt="meh"
        height={400}
        width={400}
        src={eventDetails[selected]?.eventIllustration}
      />
    </Flex>
  );
};

export default EventTypesSection;
