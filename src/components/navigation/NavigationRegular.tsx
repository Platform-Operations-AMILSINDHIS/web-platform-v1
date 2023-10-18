import { Text } from "@chakra-ui/react";

interface NavigationRegularProps {
  linkURL: string;
  linkTitle: string;
}

const NavigationRegular: React.FC<NavigationRegularProps> = ({
  linkTitle,
  linkURL,
}) => {
  return (
    <Text as="a" href={linkURL}>
      {linkTitle}
    </Text>
  );
};

export default NavigationRegular;
