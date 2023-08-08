import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const LabelledInput: React.FC<{
  label: string;
  onChange?: () => unknown;
}> = ({ label, onChange }) => (
  <FormControl>
    <FormLabel fontSize="sm" fontWeight="light">
      {label}
    </FormLabel>
    <Input
      py="30px"
      borderRadius="5px"
      type="text"
      onChange={onChange ?? undefined}
    />
  </FormControl>
);
