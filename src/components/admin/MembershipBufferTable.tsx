import { Button, Flex, Td, Text, Tr } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Tooltip } from "react-leaflet";
import { buffer } from "stream/consumers";
import TableLayout from "~/layouts/TableLayout";
import { useProfileAtom } from "~/lib/atom";
import { MembershipBufferDataType, Status } from "~/types/tables/dataBuffer";
import { formatCreatedTime } from "~/utils/helper";
import { formMembershipBufferDataTableHeaders } from "~/utils/tableHeaders";

interface MembershipBufferTableProps {
  membershipBufferData: MembershipBufferDataType[];
  filterState: string;
  searchTerm: string;
  membershipType: string;
  applicantType: string;
}

const MembershipBufferTable: React.FC<MembershipBufferTableProps> = ({
  membershipBufferData,
  filterState,
  applicantType,
  membershipType,
  searchTerm,
}) => {
  const [, setProfileAtom] = useProfileAtom();

  const filteredData = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      return membershipBufferData;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return membershipBufferData.filter((buffer) => {
      const fullName =
        `${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`.toLowerCase();
      return fullName.includes(lowercaseSearchTerm);
    });
  }, [membershipBufferData, searchTerm]);
  return (
    <TableLayout tableHeaders={formMembershipBufferDataTableHeaders}>
      {filteredData
        .filter((buffer) =>
          filterState === "All"
            ? buffer.status === Status.APPROVED || Status.PENDING
            : filterState === "Approved"
            ? buffer.status === Status.APPROVED
            : buffer.status === Status.PENDING
        )
        .filter((buffer) =>
          applicantType === "All applicants"
            ? buffer.isMember === true || buffer.isMember == false
            : applicantType === "New applicants"
            ? buffer.isMember === false
            : buffer.isMember === true
        )
        .filter((buffer) =>
          membershipType === "All members"
            ? buffer.formType === "KAP" || buffer.formType === "YAC"
            : membershipType === "KAP members"
            ? buffer.formType === "KAP"
            : buffer.formType === "YAC"
        )
        .map((buffer, index) => {
          return (
            <Tr fontSize="sm" key={index}>
              <Td>{index + 1}</Td>
              <Td>{`${buffer?.user_id.substring(0, 10)}...`}</Td>
              <Td>{buffer?.formType}</Td>
              <Td
                fontSize="small"
                fontWeight={600}
                color={
                  buffer?.status === Status.APPROVED
                    ? "green.500"
                    : "yellow.500"
                }
              >
                <Text
                  textAlign="center"
                  p={1}
                  px={3}
                  borderRadius={20}
                  bg={
                    buffer?.status === Status.APPROVED
                      ? "green.100"
                      : "yellow.100"
                  }
                  border="1px solid"
                >
                  {buffer?.status}
                </Text>
              </Td>
              <Td as={Flex} gap={1}>
                <Text>{`${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`}</Text>
                <Text color="orange.500" fontWeight="bold">{`${
                  buffer?.isMember ? `(Member)` : ``
                }`}</Text>
              </Td>
              <Td>{buffer?.submission.personalInfo.emailId}</Td>
              <Td>{`+91 ${buffer?.submission.personalInfo.mobileNumber}`}</Td>
              <Td>
                <Button
                  _hover={{ color: "#FF4D00" }}
                  color="gray.500"
                  variant="none"
                  size="small"
                  onClick={() => {
                    window.location.href = `/admin/${buffer?.user_id}.${buffer?.formType}`;
                    setProfileAtom({
                      selected_profile: {
                        form_id: buffer?.id,
                        user_id: buffer?.user_id,
                        formType: buffer?.formType,
                        status: buffer?.status,
                        isMember: buffer?.isMember,
                        paymentID: buffer?.paymentID,
                      },
                    });
                  }}
                >
                  View Profile
                </Button>
              </Td>
            </Tr>
          );
        })}
    </TableLayout>
  );
};

// Add later
{
  /* <Td
onMouseEnter={() => setIsHovered(true)}
onMouseLeave={() => setIsHovered(false)}
pos={"relative"}
>
{isHovered && (
  <Text
    pos="absolute"
    top={-3}
    left={0}
    bg="yellow.200"
    color="black"
    fontWeight={600}
    px={2}
    py={1}
    borderRadius="md"
    zIndex="1"
  >
    {`${buffer?.user_id}`} {/* Full user ID */
}
// </Text>
// )}

{
  /* <>{`${buffer?.user_id.substring(0, 10)}...`}</> */
}
// </Td> */}

export default MembershipBufferTable;
