import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";

interface DropDownProps {
  MenuItems: string[];
}

const DropDown: React.FC<DropDownProps> = ({ MenuItems }) => {
  const [isSelected, setIsSelected] = useState<string>("Memberships");
  return (
    <Menu>
      <MenuButton as={Button}>{isSelected}</MenuButton>
      <MenuList>
        {MenuItems.map((item, index) => {
          return (
            <MenuItem onClick={() => setIsSelected(item)} key={index}>
              {item}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default DropDown;
