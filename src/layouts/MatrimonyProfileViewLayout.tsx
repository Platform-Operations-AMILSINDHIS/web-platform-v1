import { Box, Flex } from "@chakra-ui/react";
import { MatrimonyFormValues } from "~/types/forms/matrimony";

interface MatrimonyProfileViewLayoutProps {
  children: React.ReactNode;
}

const MatrimonyProfileViewLayout: React.FC<MatrimonyProfileViewLayoutProps> = ({
  children,
}) => {
  return (
    <Flex mb={10} p={10} w="full" justify="center">
      <Flex flexDir="column" gap={3} w={1120}>
        <Box>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default MatrimonyProfileViewLayout;
