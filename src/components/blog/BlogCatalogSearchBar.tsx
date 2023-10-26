import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Text,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { PiCommand } from "react-icons/pi";

const BlogCatalogSearchBar = () => {
  return (
    <InputGroup maxW={400}>
      <InputLeftElement mt={5}>
        <Icon boxSize={5} as={BiSearch} />
      </InputLeftElement>
      <Input
        fontSize="sm"
        variant="filled"
        mt={5}
        placeholder="Search samachar, newsletter and blogs"
      />
      <InputRightElement mr={1} mt={5}>
        <Kbd p={1} fontSize="11px" bg="white">
          <Flex gap={0.5} align="center">
            <Icon boxSize={4} as={PiCommand} />
            <Text fontSize="14.5px">F</Text>
          </Flex>
        </Kbd>
        {/* Customize fontSize and other styles as needed */}
      </InputRightElement>
    </InputGroup>
  );
};

export default BlogCatalogSearchBar;
