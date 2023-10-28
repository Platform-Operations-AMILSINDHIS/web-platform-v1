import type { ReactNode } from "react";

import { Button } from "@chakra-ui/react";
import { btnThemeDark, btnThemeLight } from "./BtnThemes";

interface LinkButtonProps {
  CTAlink: string;
  CTAlabel: string | ReactNode;
  CTATheme?: boolean;
  py?: number | string;
  px?: number | string;
  size?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  CTAlink,
  CTATheme = true,
  CTAlabel,
  py,
  px,
  size,
}) => {
  return (
    <Button
      style={CTATheme ? btnThemeLight : btnThemeDark}
      fontWeight={600}
      py={py ?? 7}
      px={px ?? 9}
      as="a"
      size={size}
      href={CTAlink}
    >
      {CTAlabel}
    </Button>
  );
};

export default LinkButton;
