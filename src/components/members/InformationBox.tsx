import { Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import LinkButton from "../buttons/LinkButton";
import ModalButton from "../buttons/ModalButtons";
import KapModal from "../membership_modals/kapModal";
import YacModal from "../membership_modals/yacModal";

interface InformationBoxProps {
  identifier: string;
  title: string;
  modalDisplayState: boolean;
  content: string[];
  URL: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({
  identifier,
  title,
  content,
  URL,
  modalDisplayState,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleModal = () => {
    onOpen();
  };
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
          mb={1}
        >
          {title}
        </Heading>
        {content.map((text, index) => {
          return <Text key={index}>{text}</Text>;
        })}
      </Flex>
      <Flex mt={1} gap={3} w="full">
        <LinkButton
          size="sm"
          px={5}
          py={5}
          CTATheme={false}
          CTAlabel={"Go to Form"}
          CTAlink={URL}
        />
      </Flex>
    </Flex>
  );
};

export default InformationBox;
