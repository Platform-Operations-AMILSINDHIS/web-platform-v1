import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

interface TableLayoutProps {
  children?: React.ReactNode;
  tableHeaders: string[];
}

const TableLayout: React.FC<TableLayoutProps> = ({
  children,
  tableHeaders,
}) => {
  return (
    <TableContainer mt={5}>
      <Table>
        <Thead>
          <Tr>
            {tableHeaders.map((column_name, index) => {
              return <Th key={index}>{column_name}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableLayout;
