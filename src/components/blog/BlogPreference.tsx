import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { btnThemeDark, btnThemeLight } from "../buttons/BtnThemes";

interface BlogPreferenceProps {
  blogType: string[];
}

interface TypeCTAProps {
  type: string;
  active: boolean;
  onClick: () => void;
}

const TypeCTA: React.FC<TypeCTAProps> = ({ type, active, onClick }) => {
  return (
    <Button
      py={1}
      px={3}
      borderRadius={5}
      border={active ? "" : "2px solid"}
      borderColor="gray.200"
      style={active ? btnThemeDark : btnThemeLight}
      onClick={onClick}
    >
      {type}
    </Button>
  );
};

const BlogPreference: React.FC<BlogPreferenceProps> = ({ blogType }) => {
  const [activeType, setActiveType] = useState(0);

  const handleActive = (type: string, index: number) => {
    setActiveType(index);
    console.log(activeType);
    console.log(type);
  };

  return (
    <Flex flexDir="column">
      <Text mb={3} fontWeight={600} fontSize="2xl">
        Choose your{" "}
        <span
          style={{
            color: "#FF4D00",
            textDecoration: "underline",
          }}
        >
          reading
        </span>
      </Text>
      <Flex gap={5}>
        {blogType.map((type, index) => {
          const state = index === activeType ? true : false;
          return (
            <TypeCTA
              onClick={() => handleActive(type, index)}
              key={index}
              type={type}
              active={state}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default BlogPreference;
