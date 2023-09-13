import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import {
  formatDate,
  getDayOfWeekFromDate,
  getTimeFromDate,
} from "~/utils/helper";
import LinkButton from "../buttons/LinkButton";

import { api } from "~/utils/api";

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
  const toast = useToast();
  const rvspMut = api.event.rsvp.useMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [rsvpingEvent, setRsvpingEvent] = useState<{
    eventName: string;
    name: string;
    email: string;
  }>({
    eventName: "",
    name: "",
    email: "",
  });

  return (
    <>
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
            as="a"
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
            onClick={() => {
              // TODO: Implement modal to take in user's name and email
              setRsvpingEvent({
                ...rsvpingEvent,
                eventName: title ?? "",
              });
              onOpen();

              // rvspMut.mutate({
              //   eventName: title ?? "",
              //   name: "Test Name",
              //   email: "test@email.com",
              // });
            }}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>RSVP for {rsvpingEvent.eventName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Rakul Singh"
                onChange={(e) =>
                  setRsvpingEvent({ ...rsvpingEvent, name: e.target.value })
                }
              />
            </FormControl>

            <Spacer h="1rem" />

            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="text"
                placeholder="rakul.singh@example.com"
                onChange={(e) =>
                  setRsvpingEvent({ ...rsvpingEvent, email: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              isLoading={rvspMut.isLoading}
              onClick={() => {
                rvspMut
                  .mutateAsync({
                    eventName: title ?? "",
                    name: rsvpingEvent.name,
                    email: rsvpingEvent.email,
                  })
                  .then((data) => {
                    onClose();

                    if (data.success) {
                      toast({
                        title: "RSVPed Successfully",
                        description:
                          "You have successfully RSVP'd for this event.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: "RSVP Error",
                        description:
                          "There was an error while RSVPing for this event.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                  })
                  .catch(console.error);
              }}
            >
              RSVP
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventDetailModule;
