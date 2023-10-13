import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

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
      <MenuButton>{linkTitle}</MenuButton>
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
