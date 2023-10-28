import type { ReactNode } from "react";

import { Button } from "@chakra-ui/react";
import { btnThemeDark, btnThemeLight } from "./BtnThemes";

interface LinkButtonProps {
  CTAlink: string;
  CTAlabel: string | ReactNode;
  CTATheme?: boolean;
  py?: number | string;
  px?: number | string;
  // onClick?: (...any) => unknown;
  onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  CTAlink,
  CTATheme = true,
  CTAlabel,
  py,
  px,
  onClick,
}) => {
  return (
    <Button
      style={CTATheme ? btnThemeLight : btnThemeDark}
      fontWeight={600}
      py={py ?? 7}
      px={px ?? 9}
      as="a"
      href={CTAlink}
      onClick={onClick}
    >
      {CTAlabel}
    </Button>
  );
};

export default LinkButton;
