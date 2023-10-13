import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

interface NavigationDropDownProps {
  linkTitle: string;
  subURLs: {
    linkTitle: string;
    linkURL: string;
  }[];
}

const NavigationDropDown: React.FC<NavigationDropDownProps> = ({
  linkTitle,
  subURLs,
}) => {
  return (
    <Menu>
      <MenuButton>
        <Flex align="center" gap={2}>
          <Text>{linkTitle}</Text>
          <Icon as={IoIosArrowDown} />
        </Flex>
      </MenuButton>
      <MenuList>
        {subURLs.map((item, index) => {
          return (
            <MenuItem as="a" href={item.linkURL} key={index}>
              {item.linkTitle}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default NavigationDropDown;
