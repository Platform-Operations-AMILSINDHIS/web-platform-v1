import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface SectionProps {
  uniqueTags: string[];
  uniqueTypes: string[];
}

const FiltersSection: React.FC<SectionProps> = ({
  uniqueTags,
  uniqueTypes,
}) => {
  const [typeState, setTypeState] = useState(uniqueTypes[2]);
  const handleType = (type: string) => {
    setTypeState(type);
  };

  return (
    <Flex justify="space-between" w="full">
      <Box maxW={900} position="relative">
        <Swiper
          direction="horizontal"
          slidesPerView={10}
          spaceBetween={-5}
          loop={true}
        >
          <Flex>
            {uniqueTags.map((tag, index) => (
              <SwiperSlide key={index}>
                <Flex justify="center">
                  <Tag bg="gray.100" px={3} py={2} borderRadius={10}>
                    {tag}
                  </Tag>
                </Flex>
              </SwiperSlide>
            ))}
          </Flex>
        </Swiper>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={20}
          background="linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
        />
      </Box>
      <Menu>
        <MenuButton
          borderRadius={20}
          fontWeight={600}
          textTransform="capitalize"
          fontSize="sm"
          px={3}
          py={4}
          size="sm"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          border="1px solid"
          borderColor="gray.100"
          bg="none"
          boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.04), 0px 14px 14px 0px rgba(0, 0, 0, 0.03), 0px 32px 19px 0px rgba(0, 0, 0, 0.02), 0px 56px 22px 0px rgba(0, 0, 0, 0.01), 0px 88px 25px 0px rgba(0, 0, 0, 0.00)"
        >
          {typeState}
        </MenuButton>
        <MenuList>
          {uniqueTypes?.map((type, index) => (
            <MenuItem onClick={() => handleType(type)} key={index}>
              {type}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default FiltersSection;
