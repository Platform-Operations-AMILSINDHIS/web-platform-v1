import { Button } from "@chakra-ui/react";
import { btnThemeDark, btnThemeLight } from "./BtnThemes";

interface ModalButtonProps {
  CTAaction: () => void;
  CTAlabel: string;
  CTASize: string;
  CTATheme?: boolean;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  CTAaction,
  CTAlabel,
  CTATheme,
  CTASize,
}) => {
  return (
    <Button
      size={CTASize}
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
