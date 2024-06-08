import { Box, Flex, Grid, Icon, Spinner, Text } from "@chakra-ui/react";
import { MdMale, MdFemale } from "react-icons/md";

import React from "react";

import { MatrimonyProfilesFetchResponse } from "~/types/api";
import { userAtomBody } from "~/types/atoms/users";
import { formatPDFAge } from "~/utils/helper";

interface MatrimonyProfilesViewProps {
  isLoggedIn: boolean;
  matrimonyProfiles: MatrimonyProfilesFetchResponse[];
  user: userAtomBody | null;
}

const MatrimonyProfilesView: React.FC<MatrimonyProfilesViewProps> = ({
  isLoggedIn,
  matrimonyProfiles,
  user,
}) => {
  return (
    <Box>
      {isLoggedIn ? (
        <Flex gap={8} flexDir="column">
          <Flex flexDir="column">
            <Text fontSize={"3xl"} color="#1F2937" fontWeight={700}>
              Matrimony Profiles
            </Text>
            <Text>
              Select from any of the profiles below to request their entire
              details.
            </Text>
          </Flex>
          {matrimonyProfiles.length > 0 ? (
            <Grid gap={5} templateColumns="repeat(3, 1fr)">
              {matrimonyProfiles
                .filter((e) => e.user_id !== user?.id)
                .map((profile, index) => {
                  return (
                    <Flex
                      p={3}
                      gap={1}
                      borderRadius={10}
                      border="1px solid rgba(31, 41, 55, 0.45)"
                      boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19)"
                      flexDir="column"
                      key={index}
                    >
                      <Flex align="center" justify="space-between">
                        <Text pr={6} fontWeight={600} fontSize="xl">
                          {`${profile.submission.personalInfo.firstName} ${profile.submission.personalInfo.lastName},`}{" "}
                          <span
                            style={{
                              fontSize: "medium",
                              color: "rgba(0, 0, 0, 0.51)",
                            }}
                          >{`${formatPDFAge(
                            profile.submission.personalInfo
                              .dateAndTimeOfBirth as unknown
                          )}`}</span>
                        </Text>
                        <Flex
                          borderRadius={5}
                          fontSize="small"
                          bg={
                            profile.submission.personalInfo.gender === "Male"
                              ? "blue.200"
                              : "pink"
                          }
                          px={2}
                          py={0}
                          align="center"
                          gap={1}
                        >
                          <Text fontWeight={600}>
                            {profile.submission.personalInfo.gender}
                          </Text>
                          <Icon
                            boxSize={3}
                            as={
                              profile.submission.personalInfo.gender === "Male"
                                ? MdMale
                                : MdFemale
                            }
                          />
                        </Flex>
                      </Flex>
                      <Flex align="flex-start" flexDir="column">
                        <Text fontWeight={500} fontSize="lg">
                          {profile.submission.personalInfo.occupation}
                        </Text>
                        <Text fontWeight={600} color="gray.500">
                          {profile.submission.personalInfo.placeOfBirth}
                        </Text>
                      </Flex>
                      <Text
                        _hover={{
                          bg: "#1F2937",
                          cursor: "pointer",
                          color: "#FFFF",
                        }}
                        mt={3}
                        w="fit-content"
                        py={1}
                        px={4}
                        border="1px solid"
                        borderColor="#1F2937"
                        color="#1F2937"
                        borderRadius={5}
                        fontSize="small"
                        fontWeight={600}
                        transition="all 0.2s"
                      >
                        View Profile
                      </Text>
                    </Flex>
                  );
                })}
            </Grid>
          ) : (
            <Spinner />
          )}
        </Flex>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default MatrimonyProfilesView;
