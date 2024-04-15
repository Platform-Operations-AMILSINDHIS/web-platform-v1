import { Box } from "@chakra-ui/react";

interface SideBarNavProps {}

const SideBarNav: React.FC<SideBarNavProps> = () => {
  return (
    <Box borderRight="1px solid" borderColor="gray.200" w="12%" h="full">
      Side Bar Nav
    </Box>
  );
};

export default SideBarNav;
