import { Flex, Text } from "@chakra-ui/react";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({ children }) => {
  return (
    <Flex>
      <Text>Hi there Layout here for yall</Text>
      {children}
    </Flex>
  );
};

export default AdminPageLayout;
