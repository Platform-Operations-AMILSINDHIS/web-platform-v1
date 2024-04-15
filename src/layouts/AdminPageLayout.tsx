import { Flex, Text } from "@chakra-ui/react";

interface AdminPageLayoutProps {
  children: React.ReactNode;
  adminUsername: string | undefined;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  adminUsername,
}) => {
  return (
    <Flex>
      <Text>Hey there, {adminUsername ?? ""}</Text>
      {children}
    </Flex>
  );
};

export default AdminPageLayout;
