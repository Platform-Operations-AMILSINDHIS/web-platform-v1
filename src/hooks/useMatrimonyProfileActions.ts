import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MatrimonyProfilesFetchResponse } from "~/types/api";
import { userAtomBody } from "~/types/atoms/users";

interface useMatrimonyProfileActionsProps {
  user: userAtomBody | null;
  matrimonyID: string;
}

type HandleMatrimonyIDFetch = (user_id: string) => Promise<{
  status: boolean;
  matrimony_id: string;
  message: string;
}>;

const useMatrimonyProfileActions = ({
  matrimonyID,
  user,
}: useMatrimonyProfileActionsProps) => {
  const toast = useToast()!;

  const [selectingProfile, setSelectingProfile] = useState<boolean>(false);
  const [triggerError, setTriggerError] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [requesting, setRequesting] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("");
  const [profileMatID, setProfileMatID] = useState<string | undefined>("");

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    handleMatrimonyIDFetch: HandleMatrimonyIDFetch, // Specify the correct type
    matrimonyProfiles: MatrimonyProfilesFetchResponse[]
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
      setProfileMatID(notty.matrimony_id);
      setProfileName(
        filtered[0]?.submission.personalInfo.firstName ?? "Default Name"
      );
      console.log(profileMatID);
      setFetchStatus(notty.status);
      setSelectingProfile(false);
    }
    console.log("Selected option:", selectedOption, notty);
  };

  const ProcessingRequestProfile = async (
    handleCloseSelectionModal: (
      setProfileMatID: (profile: string | undefined) => void,
      setFetchStatus: (status: boolean) => void
    ) => void,
    handleMatrimonyRequestProfile: (
      // Define a more specific return type
      requestee_name: string,
      requestee_id: string,
      requested_name: string,
      requested_id: string
    ) => Promise<{ status: boolean }> // Promise expected
  ) => {
    setTriggerError(false);
    setRequesting(true);

    if (profileName === "" || profileMatID === "") {
      setTriggerError(true);
      console.log("error");
      setRequesting(false);
      return;
    }

    console.log("success");

    await handleMatrimonyRequestProfile(
      user?.first_name ?? "",
      matrimonyID,
      profileName,
      profileMatID ?? ""
    );

    setRequesting(false);
    handleCloseSelectionModal(setProfileMatID, setFetchStatus);

    // Handle potential null or undefined toast:
    toast({
      title: "Profile Request Sent",
      description: "Your request has been sent to the community",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    fetchStatus,
    profileMatID,
    profileName,
    selectedOption,
    selectingProfile,
    triggerError,
    requesting,
    setProfileMatID,
    setFetchStatus,
    handleSelectChange,
    ProcessingRequestProfile,
  };
};

export default useMatrimonyProfileActions;
