import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { camelCaseToSpaces } from "~/utils/helper";
import { btnThemeDark, btnThemeLight } from "../buttons/BtnThemes";
import useServerActions from "~/hooks/useServerActions";

interface MatrimonyProfileViewProps {
  submission: MatrimonyFormValues;
  user_id: string;
}

const MatrimonyProfileView: React.FC<MatrimonyProfileViewProps> = ({
  submission,
  user_id,
}) => {
  const { handleAcceptingUserMatrimonyApplication } = useServerActions();
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
        <Flex gap={3}>
          <Button
            onClick={() => {
              handleAcceptingUserMatrimonyApplication(user_id);
            }}
            style={btnThemeDark}
            size="md"
          >
            Approve Applicant
          </Button>
          <Button style={btnThemeLight} size="md">
            Reject Applicant
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
            <Grid mt={2} rowGap={1.5} templateColumns="repeat(3,1fr)">
              {submission.familyMembers?.map((familyMember, index) => {
                return (
                  <Flex key={index}>
                    <Flex>
                      <Text>{index}</Text>
                      <Flex>
                        {Object.keys(familyMember).map((keyName, index) => {
                          return (
                            <Flex gap={2} key={index}>
                              <Text fontWeight={500}>
                                {camelCaseToSpaces(keyName)} :
                              </Text>
                              <Text>{submission?.personalInfo[keyName]}</Text>
                            </Flex>
                          );
                        })}
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })}
            </Grid>
          ) : (
            <Text>None Added, to profile</Text>
          )}
        </Flex>

        {/* Check DB call for retrieving address data */}

        {/* <Flex flexDir="column">
        <Text textDecoration="underline" fontSize={"2xl"} fontWeight={"bold"}>
          Resedential Address
        </Text>
        <Grid mt={2} rowGap={1.5} templateColumns="repeat(3,1fr)">
          {Object.keys(submission.residentialAddressDetails).map(
            (keyName, index) => {
              return (
                <GridItem key={index}>
                  <Flex gap={2}>
                    <Text fontWeight={500}>{keyName} :</Text>
                    <Text>
                      {submission?.residentialAddressDetails[keyName]}
                    </Text>
                  </Flex>
                </GridItem>
              );
            }
          )}
        </Grid>
      </Flex> */}

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
