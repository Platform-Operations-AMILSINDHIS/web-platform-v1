import TableLayout from "~/layouts/TableLayout";
import { formMembershipBufferDataTableHeaders } from "~/utils/tableHeaders";

const MembershipBufferTable = () => {
  return (
    <TableLayout
      tableHeaders={formMembershipBufferDataTableHeaders}
    ></TableLayout>
  );
};

export default MembershipBufferTable;
