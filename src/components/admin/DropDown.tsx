import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";

interface DropDownProps {
  MenuItems: string[];
  setIsSelected: (isSelected: string) => void;
  isSelected: string;
}

const DropDown: React.FC<DropDownProps> = ({
  MenuItems,
  setIsSelected,
  isSelected,
}) => {
  return (
    <Menu>
      <MenuButton
        fontSize="small"
        variant="none"
        border="1px solid rgba(31, 41, 55, 0.45)"
        boxShadow="0px 3px 0px 0px rgba(0, 0, 0, 0.19)"
        as={Button}
        h={"35px"}
      >
        {isSelected}
      </MenuButton>
      <MenuList>
        {MenuItems.map((item, index) => {
          return (
            <MenuItem
              fontSize="small"
              fontWeight={500}
              onClick={() => setIsSelected(item)}
              key={index}
            >
              {item}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default DropDown;
