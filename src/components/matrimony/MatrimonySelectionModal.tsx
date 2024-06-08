import { Flex, Icon, Select, Text } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";
import { TbArrowsJoin } from "react-icons/tb";

interface MatrimonyApplicationSelectionModalProps {
  handleModal: () => void;
  modalState: boolean;
  matrimonyID: string;
}

const MatrimonyApplicationSelectionModal: React.FC<
  MatrimonyApplicationSelectionModalProps
> = ({ handleModal, modalState, matrimonyID }) => {
  return (
    <ModalLayout
      modalHeader="Select Profile"
      handleModal={handleModal}
      modalState={modalState}
    >
      <Flex gap={3} flexDir="column">
        <Text textAlign="center" fontWeight={500}>
          Select a profile from the drop down to request it's information. The
          team will get back to you in 3 to 4 days
        </Text>
        <Flex w="full" justify="center">
          <Flex px={2} borderRadius={5} bg="gray.300" gap={2} align="center">
            <Text fontWeight={500}>{matrimonyID}</Text>
            <Icon as={TbArrowsJoin} />
          </Flex>
        </Flex>
        <Select
          onChange={(e) => console.log(e.target.value)}
          placeholder="Select Profile"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
    </ModalLayout>
  );
};

export default MatrimonyApplicationSelectionModal;
