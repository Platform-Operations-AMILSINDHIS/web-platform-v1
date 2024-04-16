import { Button, Td, Tr } from "@chakra-ui/react";
import TableLayout from "~/layouts/TableLayout";
import { MembershipBufferDataType } from "~/types/tables/dataBuffer";
import { formatCreatedTime } from "~/utils/helper";
import { formMembershipBufferDataTableHeaders } from "~/utils/tableHeaders";

interface MembershipBufferTableProps {
  membershipBufferData: MembershipBufferDataType[];
}

const MembershipBufferTable: React.FC<MembershipBufferTableProps> = ({
  membershipBufferData,
}) => {
  return (
    <TableLayout tableHeaders={formMembershipBufferDataTableHeaders}>
      {membershipBufferData.map((buffer, index) => {
        return (
          <Tr fontSize="sm" key={index}>
            <Td>{index + 1}</Td>
            <Td>{`${buffer?.user_id.substring(0, 25)}...`}</Td>
            <Td>{buffer?.formType}</Td>
            <Td>{formatCreatedTime(buffer?.created_at)}</Td>
            <Td>{`${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`}</Td>
            <Td>{buffer?.submission.personalInfo.emailId}</Td>
            <Td>{`+91 ${buffer?.submission.personalInfo.mobileNumber}`}</Td>
            <Td>
              <Button
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

export default MembershipBufferTable;
