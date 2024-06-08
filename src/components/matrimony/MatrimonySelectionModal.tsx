import { Flex, Icon, Select, Text } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";
import { TbArrowsJoin } from "react-icons/tb";
import { MatrimonyProfilesFetchResponse } from "~/types/api";
import { userAtomBody } from "~/types/atoms/users";
import { useState } from "react";

interface MatrimonyApplicationSelectionModalProps {
  handleModal: () => void;
  modalState: boolean;
  matrimonyID: string;
  matrimonyProfiles: MatrimonyProfilesFetchResponse[];
  user: userAtomBody | null;
}

const MatrimonyApplicationSelectionModal: React.FC<
  MatrimonyApplicationSelectionModalProps
> = ({ handleModal, modalState, matrimonyID, matrimonyProfiles, user }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log("Selected option:", selectedOption);
  };

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
          fontWeight={500}
          border="1px solid"
          borderColor="gray.300"
          onChange={handleSelectChange}
          placeholder="Select Profile"
        >
          {/* <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option> */}
          {matrimonyProfiles
            .filter((e) => e.user_id !== user?.id)
            .map((profile, index) => {
              return (
                <option
                  key={index}
                  value={profile.user_id}
                >{`${profile.submission.personalInfo.firstName} ${profile.submission.personalInfo.middleName} ${profile.submission.personalInfo.lastName}`}</option>
              );
            })}
        </Select>
      </Flex>
    </ModalLayout>
  );
};

export default MatrimonyApplicationSelectionModal;
