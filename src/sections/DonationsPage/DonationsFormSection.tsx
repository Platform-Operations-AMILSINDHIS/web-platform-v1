import { env } from "~/env.mjs";

import { useState, useCallback } from "react";
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
import axios from "axios";
import { createId as cuid } from "@paralleldrive/cuid2";

import { LabelledInput, UploadFile } from "~/components/forms";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GrDocument } from "react-icons/gr";

import { api } from "~/utils/api";

const DonationsForm: React.FC = () => {
  const donationsFormMut = api.form.donations.useMutation();
  const { mutateAsync: fetchPresignedUrls } =
    api.r2.getPresignedUrl.useMutation();

  const [form, setForm] = useState<{
    donorName: string;
    contactNumber: string;
    email: string;
  }>({
    donorName: "",
    contactNumber: "",
    email: "",
  });

  const [panPresignedUrl, setPanPresignedUrl] = useState<string | null>(null);
  const [addressPresignedUrl, setAddressPresignedUrl] = useState<string | null>(
    null
  );

  const [panFilename, setPanFilename] = useState<string | null>(null);
  const [addressFilename, setAddressFilename] = useState<string | null>(null);

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const {
    acceptedFiles: panCardAcceptedFiles,
    getRootProps: getPanCardRootProps,
    getInputProps: getPanCardInputProps,
  } = useDropzone({
    maxFiles: 1,
    maxSize: 0.1 * 2 ** 30, // roughly 100MB
    multiple: false,
    onDropAccepted: (files, _event) => {
      const file = files[0] as File;

      const uniqueFilename = cuid() + "_" + file.name;

      fetchPresignedUrls({
        key: uniqueFilename,
      })
        .then((url) => {
          setPanPresignedUrl(url);
          setPanFilename(uniqueFilename);
          setSubmitDisabled(false);
        })
        .catch((err) => console.error(err));
    },
  });

  const {
    acceptedFiles: addressProofAcceptedFiles,
    getRootProps: getAddressProofRootProps,
    getInputProps: getAddressProofInputProps,
  } = useDropzone({
    maxFiles: 1,
    maxSize: 0.1 * 2 ** 30, // roughly 100MB
    multiple: false,
    onDropAccepted: (files, _event) => {
      const file = files[0] as File;

      const uniqueFilename = cuid() + "_" + file.name;

      fetchPresignedUrls({
        key: uniqueFilename,
      })
        .then((url) => {
          setAddressPresignedUrl(url);
          setAddressFilename(uniqueFilename);
          setSubmitDisabled(false);
        })
        .catch((err) => console.error(err));
    },
  });

  // const handleSubmit = () => {
  //   // const data = {
  //   //   ...form,
  //   //   panCard: panCardAcceptedFiles[0],
  //   //   addressProof: addressProofAcceptedFiles[0],
  //   // };

  //   // donationsFormMut
  //   //   .mutateAsync({ formData: data })
  //   //   .then((res) => {
  //   //     console.log({ success: res.success });
  //   //   })
  //   //   .catch(console.error);
  // };

  const handleSubmit = useCallback(async () => {
    if (
      panCardAcceptedFiles.length > 0 &&
      panPresignedUrl !== null &&
      addressProofAcceptedFiles.length > 0 &&
      addressPresignedUrl !== null
    ) {
      const panFile = panCardAcceptedFiles[0]!;
      const addressProofFile = addressProofAcceptedFiles[0]!;

      // Upload PAN Card
      await axios
        .put(panPresignedUrl, panFile.slice(), {
          headers: { "Content-Type": panFile.type },
        })
        .then((response) => {
          console.log(response);
          console.log("Successfully uploaded PAN Card file: ", panFilename);
        })
        .catch((err) => console.error(err));

      // Upload Address Proof
      await axios
        .put(addressPresignedUrl, addressProofFile.slice(), {
          headers: { "Content-Type": addressProofFile.type },
        })
        .then((response) => {
          console.log(response);
          console.log(
            "Successfully uploaded Address Proof file: ",
            addressFilename
          );
        })
        .catch((err) => console.error(err));

      const res = await donationsFormMut.mutateAsync({
        formData: {
          ...form,
          panCard: env.NEXT_PUBLIC_R2_ACCESS_URL + "/" + panFilename,
          addressProof: env.NEXT_PUBLIC_R2_ACCESS_URL + "/" + addressFilename,
        },
      });

      if (!res.success) {
        console.error("An error occurred while submitting the form");
        return;
      }

      setSubmitDisabled(true);
    }
  }, [
    addressFilename,
    addressPresignedUrl,
    addressProofAcceptedFiles,
    donationsFormMut,
    form,
    panCardAcceptedFiles,
    panFilename,
    panPresignedUrl,
  ]);

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
        onClick={() => void handleSubmit()}
        isDisabled={
          panPresignedUrl === null ||
          panCardAcceptedFiles.length === 0 ||
          addressPresignedUrl === null ||
          addressProofAcceptedFiles.length === 0 ||
          submitDisabled
        }
        // isLoading={}
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
