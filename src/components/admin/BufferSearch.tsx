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
import {
  MembershipBufferDataType,
  MatrimonyBufferDataType,
} from "~/types/tables/dataBuffer";

const BufferSearch: React.FC = () => {
  return (
    <InputGroup maxW={400}>
      <InputLeftElement>
        <Icon boxSize={5} as={BiSearch} />
      </InputLeftElement>
      <Input
        fontSize="sm"
        variant="filled"
        placeholder="Search KAP and YAC applicants"
      />
      <InputRightElement mr={1}>
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

export default BufferSearch;
