import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

interface TableLayoutProps {
  children?: React.ReactNode;
  tableHeaders: string[];
  variant?: string;
}

const TableLayout: React.FC<TableLayoutProps> = ({
  children,
  tableHeaders,
  variant = "striped",
}) => {
  return (
    <TableContainer mt={5} overflowX="auto" borderRadius="lg" border="1px solid" borderColor="gray.100" boxShadow="sm">
      <Table width="100%" minWidth="unset" variant={variant} colorScheme="gray" size="md" fontSize="sm">
        <Thead>
          <Tr>
            {tableHeaders.map((column_name, index) => {
              return (
                <Th
                  key={index}
                  py={3}
                  fontSize="xs"
                  letterSpacing="wider"
                  color="gray.500"
                  borderBottomWidth="2px"
                  borderBottomColor="gray.200"
                >
                  {column_name}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableLayout;
