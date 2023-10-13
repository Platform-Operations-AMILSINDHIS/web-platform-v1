import { Text } from "@chakra-ui/react";

const NavigationRegular = () => {
  return (
    <Text as="a" href={navItem.linkURL}>
      {navItem.linkTitle}
    </Text>
  );
};

export default NavigationRegular;
