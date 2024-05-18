import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { btnThemeDark, btnThemeLight } from "~/components/buttons/BtnThemes";
import { MatrimonyFormValues } from "~/types/forms/matrimony";

interface MatrimonyProfileViewLayoutProps {
  children: React.ReactNode;
  submission: MatrimonyFormValues;
}

const MatrimonyProfileViewLayout: React.FC<MatrimonyProfileViewLayoutProps> = ({
  children,
  submission,
}) => {
  return (
    <Flex mb={10} p={10} w="full" justify="center">
      <Flex flexDir="column" gap={3} w={1120}>
        <Flex align="center" justify="space-between" w="full">
          <Flex flexDir="column">
            <Text
              fontWeight={600}
              fontSize={"xx-large"}
            >{`${submission?.personalInfo?.firstName} ${submission?.personalInfo?.lastName}`}</Text>
            <Text
              fontWeight={500}
              mt={-0.5}
            >{`${submission?.personalInfo?.occupation}, ${submission?.personalInfo?.placeOfBirth}`}</Text>
          </Flex>
          <Flex gap={3}>
            <Button style={btnThemeDark} size="md">
              Approve Applicant
            </Button>
            <Button style={btnThemeLight} size="md">
              Reject Applicant
            </Button>
          </Flex>
        </Flex>
        <Box>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default MatrimonyProfileViewLayout;
