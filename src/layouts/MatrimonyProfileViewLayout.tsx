import { Box, Flex } from "@chakra-ui/react";

interface MatrimonyProfileViewLayoutProps {
  children: React.ReactNode;
}

const MatrimonyProfileViewLayout: React.FC<MatrimonyProfileViewLayoutProps> = ({
  children,
}) => {
  return (
    <Flex mb={10} p={10} w="full" justify="center">
      <Box bg="yellow" w={1120}>
        {children}
      </Box>
    </Flex>
  );
};

export default MatrimonyProfileViewLayout;
