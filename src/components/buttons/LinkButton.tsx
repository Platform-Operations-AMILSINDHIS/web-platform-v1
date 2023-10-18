import { Button } from "@chakra-ui/react";
import { btnThemeDark, btnThemeLight } from "./BtnThemes";

interface LinkButtonProps {
  CTAlink: string;
  CTAlabel: string;
  CTATheme?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  CTAlink,
  CTATheme = true,
  CTAlabel,
}) => {
  return (
    <Button
      style={CTATheme ? btnThemeLight : btnThemeDark}
      fontWeight={600}
      py={7}
      px={9}
      as="a"
      href={CTAlink}
    >
      {CTAlabel}
    </Button>
  );
};

export default LinkButton;
