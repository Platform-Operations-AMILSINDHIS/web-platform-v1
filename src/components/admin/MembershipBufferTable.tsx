import { Button, Td, Tr } from "@chakra-ui/react";
import TableLayout from "~/layouts/TableLayout";
import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "~/types/forms/membership";
import { MembershipBufferDataType } from "~/types/tables/membershipBuffer";
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
            <Td>{buffer?.user_id}</Td>
            <Td>{buffer?.formType}</Td>
            <Td>{buffer?.created_at}</Td>
            <Td>{`${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`}</Td>
            <Td>{buffer?.submission.personalInfo.emailId}</Td>
            <Td>{buffer?.submission.personalInfo.mobileNumber}</Td>
            <Td>
              <Button>Action CTA</Button>
            </Td>
          </Tr>
        );
      })}
    </TableLayout>
  );
};

export default MembershipBufferTable;
