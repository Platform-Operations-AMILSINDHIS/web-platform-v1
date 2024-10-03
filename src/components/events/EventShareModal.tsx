import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// @ts-ignore
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import ModalLayout from "~/layouts/ModalLayout";

interface EventModalProps {
  eventTitle: string;
}

const EventShareModal: React.FC<EventModalProps> = ({ eventTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shareUrl, setShareUrl] = useState("");

  const handleEventModal = () => {
    setShareUrl(window.location.href);
    onOpen();
  };

  const quote = `Hey there! Check this upcoming event ${eventTitle} By the Khudabadhi Amil Panchayat`;

  return (
    <>
      <Button
        onClick={handleEventModal}
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

      <ModalLayout handleModal={onClose} modalState={isOpen}>
        <Text my={3} fontSize="xl" fontWeight={700}>
          Share this event
        </Text>
        <Box mb={4}>
          <Text mb={2} fontWeight={600}>
            Event URL:
          </Text>
          <Input
            border="1px solid"
            fontWeight={600}
            value={shareUrl}
            isReadOnly
          />
        </Box>
        <Flex gap={3} mb={4}>
          <FacebookShareButton
            url={shareUrl}
            hashtag="#KhudabadhiAmilPanchayat"
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={quote}
            hashtags={["KhudabadhiAmilPanchayat"]}
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton
            url={shareUrl}
            title={eventTitle}
            summary={quote}
            source="Khudabadhi Amil Panchayat"
          >
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl} title={quote}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={`Invitation: ${eventTitle}`}
            body={quote}
          >
            <EmailIcon size={40} round />
          </EmailShareButton>
        </Flex>
        <Button
          onClick={onClose}
          borderColor="#FF4D00"
          border="2px solid"
          px={6}
          color="#FF4D00"
          fontWeight={700}
          bg="white"
          _hover={{
            bg: "#FF4D00",
            color: "white",
          }}
          mb={3}
        >
          Close
        </Button>
      </ModalLayout>
    </>
  );
};

export default EventShareModal;
