import { Button, Flex, Icon, Select, Spinner, Text } from "@chakra-ui/react";
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
  const [selectingProfile, setSelectingProfile] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [triggerError, setTriggerError] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("");
  const [profileMatID, setProfileMatID] = useState<string | undefined>("");

  const { handleMatrimonyRequestProfile } = useServerActions();

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTriggerError(false);
    setSelectingProfile(true);
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const notty = await handleMatrimonyIDFetch(event.target.value);

    const filtered = matrimonyProfiles.filter(
      (e) => e.user_id === selectedValue
    );

    if (notty === undefined) {
      setProfileMatID(undefined);
      setProfileName("");
      console.log(notty);
      setFetchStatus(false);
      setSelectingProfile(false);
    } else {
      setProfileMatID(notty.matrimony_id ?? "");
      setProfileName(filtered[0]?.submission.personalInfo.firstName as string);
      console.log(profileMatID);
      setFetchStatus(notty.status);
      setSelectingProfile(false);
    }
    console.log("Selected option:", selectedOption, notty);
  };

  const ProcessingRequestProfile = async () => {
    setTriggerError(false);
    setRequesting(true);

    if (profileName === "" || profileMatID === "") {
      setTriggerError(true);
      console.log("error");
      setRequesting(false);
      return;
    }

    console.log("successs");

    await handleMatrimonyRequestProfile(
      user?.first_name ?? "",
      matrimonyID,
      profileName,
      profileMatID ?? ""
    );
    console.log({
      A: user?.first_name ?? "",
      B: matrimonyID,
      C: profileName,
      D: profileMatID ?? "",
    });
    setRequesting(false);
    handleCloseSelectionModal(setProfileMatID, setFetchStatus);
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
            <Text fontWeight={600}>
              {selectingProfile ? <Spinner boxSize={3} /> : profileMatID}
            </Text>
          </Flex>
        </Flex>
        <Flex gap={1} flexDir="column">
          <Select
            fontWeight={500}
            border="1px solid"
            borderColor={triggerError ? "red.400" : "gray.500"}
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
          {triggerError ? (
            <Text fontWeight={500} color="red" fontSize="small" pl={1}>
              Please select a pofile name
            </Text>
          ) : (
            <></>
          )}
        </Flex>
        <Flex justify="center" mb={2} gap={3}>
          <Button
            isLoading={requesting}
            type="submit"
            _hover={{
              bg: "gray.700",
            }}
            color="white"
            bg="#0E0E11"
            onClick={() => ProcessingRequestProfile()}
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
