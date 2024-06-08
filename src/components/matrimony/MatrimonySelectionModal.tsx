import { Button, Flex, Icon, Select, Text } from "@chakra-ui/react";
import ModalLayout from "~/layouts/ModalLayout";
import { TbArrowsJoin } from "react-icons/tb";
import {
  MatrimonyIdFetchResponse,
  MatrimonyProfilesFetchResponse,
} from "~/types/api";
import { userAtomBody } from "~/types/atoms/users";
import { useState } from "react";
import useServerActions from "~/hooks/useServerActions";

interface MatrimonyApplicationSelectionModalProps {
  handleModal: () => void;
  modalState: boolean;
  matrimonyID: string;
  matrimonyProfiles: MatrimonyProfilesFetchResponse[];
  user: userAtomBody | null;
  handleMatrimonyIDFetch: (
    user_id: string
  ) => Promise<MatrimonyIdFetchResponse>;
  handleCloseSelectionModal: (
    setProfileMatID: (profileMatID: string | undefined) => void,
    setFetchStatus: (status: boolean) => void
  ) => void;
}

const MatrimonyApplicationSelectionModal: React.FC<
  MatrimonyApplicationSelectionModalProps
> = ({
  handleModal,
  handleMatrimonyIDFetch,
  handleCloseSelectionModal,
  modalState,
  matrimonyID,
  matrimonyProfiles,
  user,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [profileMatID, setProfileMatID] = useState<string | undefined>("");
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);

  const { handleMatrimonyRequestProfile } = useServerActions();

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const notty = await handleMatrimonyIDFetch(event.target.value);

    if (notty === undefined) {
      setProfileMatID(undefined);
      console.log(profileMatID);
      setFetchStatus(false);
    } else {
      setProfileMatID(notty.matrimony_id ?? "");
      console.log(profileMatID);
      setFetchStatus(notty.status);
    }
    console.log("Selected option:", selectedOption, notty);
  };

  return (
    <ModalLayout
      modalHeader="Select Profile"
      handleModal={() =>
        handleCloseSelectionModal(setProfileMatID, setFetchStatus)
      }
      modalState={modalState}
    >
      <Flex gap={3} flexDir="column">
        <Text textAlign="center" fontWeight={500}>
          Select a profile from the drop down to request it's information. The
          team will get back to you in 3 to 4 days
        </Text>
        <Flex w="full" justify="center">
          <Flex
            transition="all 0.2s"
            px={2}
            borderRadius={5}
            bg={
              fetchStatus && profileMatID !== undefined
                ? "green.300"
                : "gray.300"
            }
            gap={2}
            align="center"
          >
            <Text
              transition="all 0.2s"
              fontWeight={fetchStatus && profileMatID !== undefined ? 600 : 500}
            >
              {matrimonyID}
            </Text>
            <Icon transition="all 0.2s" as={TbArrowsJoin} />
            <Text fontWeight={600}>{profileMatID}</Text>
          </Flex>
        </Flex>
        <Select
          fontWeight={500}
          border="1px solid"
          borderColor="gray.300"
          onChange={handleSelectChange}
          placeholder="Select Profile"
        >
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
        <Flex justify="center" mb={2} gap={3}>
          <Button
            isLoading={false}
            type="submit"
            _hover={{
              bg: "gray.700",
            }}
            color="white"
            bg="#0E0E11"
            onClick={() =>
              handleMatrimonyRequestProfile(
                user?.first_name ?? "",
                user?.membership_id ?? "",
                profileMatID ?? "",
                selectedOption
              )
            }
          >
            Request Profile
          </Button>
          <Button
            color="#FF4D00"
            bg="none"
            border="2px solid"
            borderColor="#FF4D00"
            _hover={{
              color: "white",
              bg: "#FF4D00",
            }}
            onClick={() =>
              handleCloseSelectionModal(setProfileMatID, setFetchStatus)
            }
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </ModalLayout>
  );
};

export default MatrimonyApplicationSelectionModal;
