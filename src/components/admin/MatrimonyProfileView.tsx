import { Button, Flex, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { camelCaseToSpaces } from "~/utils/helper";
import { btnThemeDark, btnThemeLight } from "../buttons/BtnThemes";
import useServerActions from "~/hooks/useServerActions";
import { useState } from "react";
import { useProfileAtom } from "~/lib/atom";

interface MatrimonyProfileViewProps {
  submission: MatrimonyFormValues;
  user_id: string;
}

const MatrimonyProfileView: React.FC<MatrimonyProfileViewProps> = ({
  submission,
  user_id,
}) => {
  const {
    handleAcceptingUserMatrimonyApplication,
    handleRejectingUserMatrimonyApplication,
  } = useServerActions();

  const [{ selected_profile }] = useProfileAtom();

  const [isGeneratingID, setIsGeneratingID] = useState<boolean>(false);
  const [isSendingMail, setIsSendingMail] = useState<boolean>(false);
  const [isApprovingApplication, setIsApprovingApplication] =
    useState<boolean>(false);
  const [isRejectingApplication, setIsRejectingApplication] =
    useState<boolean>(false);

  return (
    <>
      {" "}
      <Flex align="center" justify="space-between" w="full">
        <Flex flexDir="column">
          <Text
            fontWeight={600}
            fontSize={"xx-large"}
          >{`${submission?.personalInfo?.firstName} ${submission?.personalInfo?.lastName}`}</Text>
          <Text
            fontWeight={500}
            mt={-0.5}
          >{`${submission?.personalInfo?.occupation}, ${submission?.personalInfo?.placeOfBirth}`}</Text>
        </Flex>
        <Flex
          display={selected_profile?.status === "APPROVED" ? "none" : ""}
          gap={3}
        >
          <Button
            onClick={() => {
              handleAcceptingUserMatrimonyApplication(
                user_id,
                submission?.personalInfo.emailId,
                setIsGeneratingID,
                setIsSendingMail,
                setIsApprovingApplication
              );
            }}
            style={btnThemeDark}
            size="md"
          >
            {isApprovingApplication ? (
              <Flex gap={2} align={"center"}>
                <Spinner />{" "}
                {isGeneratingID
                  ? `Generating ID`
                  : isSendingMail
                  ? `Sending Mail`
                  : `Loading`}
              </Flex>
            ) : (
              <Text>Approve Applicant</Text>
            )}
          </Button>
          <Button
            onClick={() =>
              handleRejectingUserMatrimonyApplication(
                submission?.personalInfo.emailId,
                user_id,
                setIsSendingMail,
                setIsRejectingApplication
              )
            }
            style={btnThemeLight}
            size="md"
          >
            {isRejectingApplication ? (
              <Flex gap={2} align={"center"}>
                <Spinner /> {isSendingMail ? `Sending Mail` : `Loading`}
              </Flex>
            ) : (
              <Text>Reject</Text>
            )}
          </Button>
        </Flex>
        <Flex>
          <Button style={btnThemeDark} size="md">
            Send Profile
          </Button>
        </Flex>
      </Flex>
      <Flex mt={5} gap={8} flexDir="column">
        <Flex
          p={3}
          borderRadius={10}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          flexDir="column"
        >
          <Text color="#FF4D00" fontSize={"2xl"} fontWeight={"bold"}>
            Personal Details
          </Text>
          <Grid mt={2} rowGap={1.5} templateColumns="repeat(3,1fr)">
            {Object.keys(submission.personalInfo).map((keyName, index) => {
              return (
                <GridItem key={index}>
                  <Flex gap={2}>
                    <Text fontWeight={500}>{camelCaseToSpaces(keyName)} :</Text>
                    <Text>{submission?.personalInfo[keyName]}</Text>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        </Flex>

        <Flex
          p={3}
          borderRadius={10}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          flexDir="column"
        >
          <Text color="#FF4D00" fontSize={"2xl"} fontWeight={"bold"}>
            Family Members
          </Text>
          {submission?.familyMembers && submission?.familyMembers.length > 0 ? (
            <Flex justify="center" flexDir="column">
              {submission.familyMembers?.map((familyMember, index) => {
                return (
                  <Flex key={index}>
                    <Grid templateColumns="repeat(4,2fr)" columnGap={20}>
                      {Object.keys(familyMember).map((keyName, index) => {
                        return (
                          <Flex gap={2} key={index}>
                            <Text
                              fontWeight={500}
                              style={{ textAlign: "right" }}
                            >
                              {camelCaseToSpaces(keyName)} :
                            </Text>
                            <Text>{familyMember[keyName]}</Text>
                          </Flex>
                        );
                      })}
                    </Grid>
                  </Flex>
                );
              })}
            </Flex>
          ) : (
            <Text>None Added, to profile</Text>
          )}
        </Flex>

        {/* Check DB call for retrieving address data */}

        <Flex
          p={3}
          borderRadius={10}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          flexDir="column"
        >
          <Text color="#FF4D00" fontSize={"2xl"} fontWeight={"bold"}>
            Resedential Address
          </Text>
          <Grid mt={2} rowGap={1.5} templateColumns="repeat(3,1fr)">
            {Object.keys(submission?.residentialAddressDetails).map(
              (keyName, index) => {
                return (
                  <GridItem key={index}>
                    <Flex gap={2}>
                      <Text fontWeight={500}>
                        {camelCaseToSpaces(keyName)} :
                      </Text>
                      <Text>
                        {submission?.residentialAddressDetails[keyName]}
                      </Text>
                    </Flex>
                  </GridItem>
                );
              }
            )}
          </Grid>
        </Flex>

        <Flex
          p={3}
          borderRadius={10}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          flexDir="column"
        >
          <Text color="#FF4D00" fontSize={"2xl"} fontWeight={"bold"}>
            Proposer Details
          </Text>
          <Grid mt={2} rowGap={1.5} templateColumns="repeat(3,1fr)">
            {Object.keys(submission.proposerInfo).map((keyName, index) => {
              return (
                <GridItem key={index}>
                  <Flex gap={2}>
                    <Text fontWeight={500}>{camelCaseToSpaces(keyName)} :</Text>
                    <Text>{submission?.proposerInfo[keyName]}</Text>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        </Flex>

        <Flex
          p={3}
          borderRadius={10}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          flexDir="column"
        >
          <Text color="#FF4D00" fontSize={"2xl"} fontWeight={"bold"}>
            Spouse Preferences
          </Text>
          <Grid mt={2} rowGap={1.5} templateColumns="repeat(3,1fr)">
            {Object.keys(submission.spousePreferences).map((keyName, index) => {
              return (
                <GridItem key={index}>
                  <Flex gap={2}>
                    <Text fontWeight={500}>{camelCaseToSpaces(keyName)} :</Text>
                    <Text>{submission?.spousePreferences[keyName]}</Text>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};

export default MatrimonyProfileView;
