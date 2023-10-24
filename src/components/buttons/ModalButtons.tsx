import { Button } from "@chakra-ui/react";
import { btnThemeDark, btnThemeLight } from "./BtnThemes";

interface ModalButtonProps {
  CTAaction: () => void;
  CTAlabel: string;
  CTATheme?: boolean;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  CTAaction,
  CTAlabel,
  CTATheme,
}) => {
  return (
    <Button
      onClick={CTAaction}
      style={CTATheme ? btnThemeLight : btnThemeDark}
      fontWeight={600}
      py={7}
      px={9}
    >
      {CTAlabel}
    </Button>
  );
};

export default ModalButton;
