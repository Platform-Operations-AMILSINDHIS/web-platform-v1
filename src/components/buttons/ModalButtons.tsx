import { Button } from "@chakra-ui/react";
import { btnThemeDark, btnThemeLight } from "./BtnThemes";

interface ModalButtonProps {
  CTAaction: () => void;
  CTAlabel: string;
  CTASize?: string;
  fontSize?: string;
  CTATheme?: boolean;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  CTAaction,
  CTAlabel,
  CTATheme,
  CTASize,
  fontSize,
}) => {
  return (
    <Button
      size={CTASize}
      fontSize={fontSize}
      onClick={CTAaction}
      style={CTATheme ? btnThemeLight : btnThemeDark}
      fontWeight={600}
      p={4}
    >
      {CTAlabel}
    </Button>
  );
};

export default ModalButton;
