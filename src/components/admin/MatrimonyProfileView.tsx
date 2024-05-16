import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { MatrimonyFormValues } from "~/types/forms/matrimony";

interface MatrimonyProfileViewProps {
  submission: MatrimonyFormValues;
}

const MatrimonyProfileView: React.FC<MatrimonyProfileViewProps> = ({
  submission,
}) => {
  console.log(submission);
  return (
    <Flex gap={5} flexDir="column">
      <Flex flexDir="column">
        <Text textDecoration="underline" fontSize={"2xl"} fontWeight={"bold"}>
          Personal Details
        </Text>
        <Grid mt={2} rowGap={1.5} templateColumns="repeat(3,1fr)">
          {Object.keys(submission.personalInfo).map((keyName, index) => {
            return (
              <GridItem key={index}>
                <Flex gap={2}>
                  <Text fontWeight={500}>{keyName} :</Text>
                  <Text>{submission?.personalInfo[keyName]}</Text>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </Flex>

      <Flex flexDir="column">
        <Text textDecoration="underline" fontSize={"2xl"} fontWeight={"bold"}>
          Family Members
        </Text>
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
                          <Text fontWeight={500}>{keyName} :</Text>
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
      </Flex>
    </Flex>
  );
};

export default MatrimonyProfileView;
