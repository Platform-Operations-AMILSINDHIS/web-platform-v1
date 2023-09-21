import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

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
    <Box color={active ? "red" : ""} onClick={onClick}>
      {type}
    </Box>
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
      <Text mb={3} fontWeight={600} fontSize="xl">
        Choose your{" "}
        <span
          style={{
            color: "#FF4D00",
          }}
        >
          reading
        </span>
      </Text>
      <Flex>
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
