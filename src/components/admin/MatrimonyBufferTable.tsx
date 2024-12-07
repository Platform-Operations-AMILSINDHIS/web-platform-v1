import { Button, Td, Text, Tr } from "@chakra-ui/react";
import { useMemo } from "react";
import TableLayout from "~/layouts/TableLayout";
import { useProfileAtom } from "~/lib/atom";
import { MatrimonyBufferDataType, Status } from "~/types/tables/dataBuffer";
import { formMembershipBufferDataTableHeaders } from "~/utils/tableHeaders";

interface MatrimonyBufferTableProps {
  matrimonyBufferData: MatrimonyBufferDataType[];
  filterState: string;
  searchTerm: string;
}

const MatrimonyBufferTable: React.FC<MatrimonyBufferTableProps> = ({
  matrimonyBufferData,
  filterState,
  searchTerm,
}) => {
  const [, setProfileAtom] = useProfileAtom();

  const filteredData = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      return matrimonyBufferData;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return matrimonyBufferData.filter((buffer) => {
      const fullName =
        `${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`.toLowerCase();
      return fullName.includes(lowercaseSearchTerm);
    });
  }, [matrimonyBufferData, searchTerm]);

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
        .map((buffer, index) => {
          return (
            <Tr fontSize="sm" key={index}>
              <Td>{index + 1}</Td>
              <Td>{`${buffer?.user_id.substring(0, 20)}...`}</Td>
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
              <Td>{`${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`}</Td>
              <Td>{buffer?.submission.personalInfo.emailId}</Td>
              <Td>{`+91 ${buffer?.submission.personalInfo.mobileNumber}`}</Td>
              <Td>
                <Button
                  onClick={() => {
                    window.location.href = `/admin/${buffer?.user_id}.${buffer?.formType}`;
                    setProfileAtom({
                      selected_profile: {
                        form_id: buffer?.id,
                        user_id: buffer?.user_id,
                        formType: buffer?.formType,
                        status: buffer?.status,
                      },
                    });
                  }}
                  _hover={{ color: "#FF4D00" }}
                  color="gray.500"
                  variant="none"
                  size="small"
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

export default MatrimonyBufferTable;
