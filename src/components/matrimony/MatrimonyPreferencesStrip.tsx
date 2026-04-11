// src/components/matrimony/MatrimonyPreferencesStrip.tsx
import { Badge, Flex, Text } from "@chakra-ui/react";
import type { SpousePreferences } from "~/types/forms/matrimony";

interface MatrimonyPreferencesStripProps {
  prefs: SpousePreferences | null | undefined;
}

const MatrimonyPreferencesStrip: React.FC<MatrimonyPreferencesStripProps> = ({ prefs }) => {
  if (!prefs) return null;

  const items: { label: string; value: string | number | null | undefined }[] = [
    {
      label: "Height",
      value: prefs.heightFeet && prefs.heightFeet > 0
        ? `${prefs.heightFeet}'${prefs.heightInches}"`
        : null,
    },
    { label: "Build", value: prefs.build || null },
    { label: "Complexion", value: prefs.complexion || null },
    { label: "Qualifications", value: prefs.qualificationRequirements || null },
    { label: "Dietary", value: prefs.dietaryPreference || null },
  ];

  const activeItems = items.filter((i) => i.value);
  if (activeItems.length === 0) return null;

  return (
    <Flex
      align="center"
      gap={2}
      flexWrap="wrap"
      px={4}
      py={3}
      bg="orange.50"
      borderRadius="lg"
      border="1px solid"
      borderColor="orange.200"
    >
      <Text fontSize="xs" fontWeight={700} color="orange.600" textTransform="uppercase" letterSpacing="wider" flexShrink={0}>
        Your Preferences
      </Text>
      {activeItems.map((item) => (
        <Badge
          key={item.label}
          colorScheme="orange"
          variant="subtle"
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          fontWeight={600}
        >
          {item.label}: {String(item.value)}
        </Badge>
      ))}
    </Flex>
  );
};

export default MatrimonyPreferencesStrip;
