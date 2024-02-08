import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  color,
} from "@chakra-ui/react";
import React from "react";
import ModalLayout from "~/layouts/ModalLayout";
import LinkButton from "../buttons/LinkButton";

interface ModalGalleryProps {
  modalState: boolean;
  handleModal: () => void;
  galleryPictures: Array<{ url?: string }> | undefined;
  eventName: string | null | undefined;
}

const ModalGallery: React.FC<ModalGalleryProps> = ({
  modalState,
  handleModal,
  galleryPictures,
  eventName,
}) => {
  return (
    <ModalLayout handleModal={handleModal} modalState={modalState}>
      <Text
        my={3}
        fontSize="xl"
        fontWeight={700}
      >{`${eventName} Event Gallery`}</Text>
      <Box maxH="400px" overflowY="auto">
        <Grid gridTemplateColumns="repeat(2,1fr)" gap={2}>
          {galleryPictures?.map((picture, index) => {
            return (
              <GridItem key={index}>
                <Image
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
                  borderRadius={10}
                  w={1000}
                  src={picture.url}
                  alt={`picture #${index}`}
                  objectFit="cover"
                />
              </GridItem>
            );
          })}
        </Grid>
        <Flex mt={5} mb={3}>
          <Button
            onClick={handleModal}
            borderColor="#FF4D00"
            border="2px solid"
            px={6}
            color="#FF4D00"
            fontWeight={700}
            bg="white"
            _hover={{
              bg: "#FF4D00",
              color: "white",
            }}
          >
            Return
          </Button>
        </Flex>
      </Box>
    </ModalLayout>
  );
};

export default ModalGallery;
