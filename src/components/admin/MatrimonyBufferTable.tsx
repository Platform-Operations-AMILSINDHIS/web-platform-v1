import { Button, Td, Tr } from "@chakra-ui/react";
import TableLayout from "~/layouts/TableLayout";
import { useProfileAtom } from "~/lib/atom";
import { MatrimonyBufferDataType } from "~/types/tables/dataBuffer";
import { formatCreatedTime } from "~/utils/helper";
import { formMembershipBufferDataTableHeaders } from "~/utils/tableHeaders";

interface MatrimonyBufferTableProps {
  matrimonyBufferData: MatrimonyBufferDataType[];
}

const MatrimonyBufferTable: React.FC<MatrimonyBufferTableProps> = ({
  matrimonyBufferData,
}) => {
  const [, setProfileAtom] = useProfileAtom();
  console.log(matrimonyBufferData);
  return (
    <TableLayout tableHeaders={formMembershipBufferDataTableHeaders}>
      {matrimonyBufferData.map((buffer, index) => {
        return (
          <Tr fontSize="sm" key={index}>
            <Td>{index + 1}</Td>
            <Td>{`${buffer?.user_id.substring(0, 20)}...`}</Td>
            <Td>{buffer?.formType}</Td>
            <Td>{formatCreatedTime(buffer?.created_at)}</Td>
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
