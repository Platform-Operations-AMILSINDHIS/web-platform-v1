import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

import { LabelledInput, UploadFile } from "~/components/forms";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GrDocument } from "react-icons/gr";

import { api } from "~/utils/api";

const DonationsForm: React.FC = () => {
  const donationsFormMut = api.form.donations.useMutation();

  const [form, setForm] = useState<{
    donorName: string;
    contactNumber: string;
    email: string;
  }>({
    donorName: "",
    contactNumber: "",
    email: "",
  });

  const {
    acceptedFiles: panCardAcceptedFiles,
    getRootProps: getPanCardRootProps,
    getInputProps: getPanCardInputProps,
  } = useDropzone();

  const {
    acceptedFiles: addressProofAcceptedFiles,
    getRootProps: getAddressProofRootProps,
    getInputProps: getAddressProofInputProps,
  } = useDropzone();

  const handleSubmit = () => {
    const data = {
      ...form,
      panCard: panCardAcceptedFiles[0],
      addressProof: addressProofAcceptedFiles[0],
    };

    // donationsFormMut
    //   .mutateAsync({ formData: data })
    //   .then((res) => {
    //     console.log({ success: res.success });
    //   })
    //   .catch(console.error);
  };

  // // Logger
  // useEffect(() => console.log(form), [form]);

  return (
    <Flex direction="column" alignItems="center" gap="2rem">
      <Grid templateColumns="repeat(3, 1fr)" gap="2rem">
        <GridItem>
          <LabelledInput
            type="chakra-text"
            label="Full Name of the Donor"
            onChange={(e) => setForm({ ...form, donorName: e.target.value })}
          />
        </GridItem>
        <GridItem>
          <LabelledInput
            type="chakra-text"
            label="Contact Number"
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
          />
        </GridItem>
        <GridItem>
          <LabelledInput
            type="chakra-text"
            label="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </GridItem>
      </Grid>

      <Grid templateColumns="1fr 1fr" gap="2rem">
        <GridItem>
          <Text>Copy of PAN Card (Upload)</Text>
          <Spacer h="1rem" />
          <Flex
            h="8rem"
            w="22rem"
            bgColor="rgba(251, 31, 255, 0.07)"
            border="2px dashed #FB1FFF"
            borderRadius="10px"
            direction="column"
            justifyContent="center"
            alignItems="center"
            {...getPanCardRootProps({ className: "dropzone" })}
          >
            <input {...getPanCardInputProps()} />
            {panCardAcceptedFiles.length > 0 ? (
              <Flex alignItems="center" gap="0.35rem">
                <GrDocument size="1.5rem" />
                <Text>{panCardAcceptedFiles[0]!.name}</Text>
              </Flex>
            ) : (
              <Text>Drag & drop your files here or choose files</Text>
            )}
          </Flex>
        </GridItem>
        <GridItem>
          <Text>Copy of Address Proof (Upload)</Text>
          <Spacer h="1rem" />
          <Flex
            h="8rem"
            w="22rem"
            bgColor="rgba(251, 31, 255, 0.07)"
            border="2px dashed #FB1FFF"
            borderRadius="10px"
            direction="column"
            justifyContent="center"
            alignItems="center"
            {...getAddressProofRootProps({ className: "dropzone" })}
          >
            <input {...getAddressProofInputProps()} />
            {addressProofAcceptedFiles.length > 0 ? (
              <Flex alignItems="center" gap="0.35rem">
                <GrDocument size="1.5rem" />
                <Text>{addressProofAcceptedFiles[0]!.name}</Text>
              </Flex>
            ) : (
              <Text>Drag & drop your files here or choose files</Text>
            )}
          </Flex>
        </GridItem>
      </Grid>

      <Button
        h="3.25rem"
        w="15rem"
        colorScheme="yellow"
        rightIcon={<ArrowForwardIcon />}
      >
        Submit
      </Button>
    </Flex>
  );
};

const DonationsFormSection = () => {
  return (
    <Flex id="donations-form" direction="column" alignItems="center">
      <Box mb="4rem" w="40%" textAlign="center">
        <Heading fontWeight="semibold" fontSize="5xl">
          Donations Form
        </Heading>
        <Spacer h="1rem" />
        <Text fontSize="lg">
          Fill out the fields below to complete your personal profile. Make sure
          to fill all the fields and not miss out any important details.
        </Text>
      </Box>

      <DonationsForm />
    </Flex>
  );
};

export default DonationsFormSection;
