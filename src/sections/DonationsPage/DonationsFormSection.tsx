import axios from "axios";
import usePayment from "~/hooks/usePayment";

import { env } from "~/env.mjs";
import { useEffect, useState, useCallback } from "react";
import {
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  Heading,
  Spacer,
  Button,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { createId as cuid } from "@paralleldrive/cuid2";
import { LabelledInput } from "~/components/forms";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GrDocument } from "react-icons/gr";
import { toWords } from "~/utils/helper";
import { api } from "~/utils/api";
import { truncate } from "lodash";

import QRImage from "../../../public/images/payments/qr_sbi.jpg";
import Image from "next/image";

const DonationsForm: React.FC = () => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadedFilesCount, setUploadedFilesCount] = useState<number>(0);
  const [paymentTransactionId, setPaymentTransactionId] = useState<string>("");

  const donationsFormMut = api.form.donations.useMutation();
  const { mutateAsync: fetchPresignedUrls } =
    api.r2.getPresignedUrl.useMutation();

  const [form, setForm] = useState<{
    amount: number | null;
    donorName: string;
    contactNumber: string;
    email: string;
    paymentTransactionId: string;
  }>({
    amount: null,
    donorName: "",
    contactNumber: "",
    email: "",
    paymentTransactionId: "",
  });

  const [panPresignedUrl, setPanPresignedUrl] = useState<string | null>(null);
  const [addressPresignedUrl, setAddressPresignedUrl] = useState<string | null>(
    null
  );

  const [panFilename, setPanFilename] = useState<string | null>(null);
  const [addressFilename, setAddressFilename] = useState<string | null>(null);

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

      const uniqueFilename = cuid() + "_" + file.name.trim();

      fetchPresignedUrls({
        key: uniqueFilename,
      })
        .then((url) => {
          setPanPresignedUrl(url);
          setPanFilename(uniqueFilename);
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

      const uniqueFilename = cuid() + "_" + file.name.trim();

      fetchPresignedUrls({
        key: uniqueFilename,
      })
        .then((url) => {
          setAddressPresignedUrl(url);
          setAddressFilename(uniqueFilename);
        })
        .catch((err) => console.error(err));
    },
  });
  const handleSubmit = async () => {
    if (
      panCardAcceptedFiles.length > 0 &&
      panPresignedUrl !== null &&
      addressProofAcceptedFiles.length > 0 &&
      addressPresignedUrl !== null
    ) {
      const panFile = panCardAcceptedFiles[0]!;
      const addressProofFile = addressProofAcceptedFiles[0]!;

      try {
        // Upload PAN Card
        setIsSubmitting(true);
        await axios
          .put(panPresignedUrl, panFile.slice(), {
            headers: { "Content-Type": panFile.type },
          })
          .catch((err) => {
            throw new Error(`PAN Card upload failed: ${err.message}`);
          });

        // Upload Address Proof
        await axios
          .put(addressPresignedUrl, addressProofFile.slice(), {
            headers: { "Content-Type": addressProofFile.type },
          })
          .catch((err) => {
            throw new Error(`Address Proof upload failed: ${err.message}`);
          });

        // Submit form with payment transaction ID
        const res = await donationsFormMut.mutateAsync({
          formData: {
            ...form,
            amount: form.amount!,
            panCard: `${env.NEXT_PUBLIC_R2_ACCESS_URL}/${panFilename}`,
            addressProof: `${env.NEXT_PUBLIC_R2_ACCESS_URL}/${addressFilename}`,
            paymentTransactionId: form.paymentTransactionId,
          },
        });

        // Handle specific server-side errors
        if (!res.success) {
          throw new Error(res.error || "Form submission failed");
        }

        toast({
          title: "Form submitted.",
          description: "Thank you for your contribution!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsSubmitting(false);
      } catch (err: unknown) {
        setIsSubmitting(false);
        const errorMessage =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "An unexpected error occurred";

        toast({
          title: "Submission Error",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        console.error(err);
      }
    }
  };
  return (
    <Flex direction="column" alignItems="center" gap="2rem">
      <Flex w={["90%", "40%"]} mx="auto">
        <FormControl>
          <FormLabel fontWeight="semibold">Donation Amount</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              ₹
            </InputLeftElement>
            <Input
              name="donationAmount"
              type="number"
              onChange={(e) =>
                setForm({ ...form, amount: parseInt(e.target.value) })
              }
              placeholder="1000"
              borderColor="gray.400"
              _hover={{
                borderColor: "#FF4D00",
              }}
              focusBorderColor="#FF4D00"
            />
          </InputGroup>

          <FormHelperText>
            {typeof form.amount === "number" && form.amount > 0 ? (
              <>{toWords.convert(form.amount)} Rupees Only</>
            ) : (
              <>
                &nbsp;
                <br />
              </>
            )}
          </FormHelperText>
        </FormControl>
      </Flex>

      <Grid templateColumns={["1fr", "repeat(3, 1fr)"]} gap="2rem">
        <GridItem>
          <LabelledInput
            type="chakra-text"
            label="Full Name of the Donor"
            required
            onChange={(e) => setForm({ ...form, donorName: e.target.value })}
          />
        </GridItem>
        <GridItem>
          <LabelledInput
            type="chakra-text"
            label="Contact Number"
            required
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
          />
        </GridItem>
        <GridItem>
          <LabelledInput
            type="chakra-text"
            label="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </GridItem>
      </Grid>

      <Grid templateColumns={["1fr", "1fr 1fr"]} gap="2rem">
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
                <Text>{truncate(panCardAcceptedFiles[0]!.name)}</Text>
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

      <Flex direction="column" alignItems="center" gap="1rem">
        <Image src={QRImage} alt="Payment QR Code" width={300} height={300} />
        <Text fontSize="md" textAlign="center">
          Scan the QR code to make your donation. After payment, please enter
          the transaction ID below.
        </Text>

        <Input
          placeholder="Enter Transaction ID"
          w="300px"
          value={form.paymentTransactionId}
          onChange={(e) =>
            setForm({ ...form, paymentTransactionId: e.target.value })
          }
        />
      </Flex>

      <Button
        h="3.25rem"
        w="15rem"
        colorScheme="yellow"
        rightIcon={<ArrowForwardIcon />}
        onClick={handleSubmit}
        isDisabled={
          !form.amount ||
          !form.donorName ||
          !form.contactNumber ||
          !form.email ||
          !form.paymentTransactionId ||
          panCardAcceptedFiles.length === 0 ||
          addressProofAcceptedFiles.length === 0
        }
        isLoading={isSubmitting}
      >
        Confirm Donation
      </Button>
    </Flex>
  );
};

const DonationsFormSection = () => {
  return (
    <Box position="relative">
      <Flex id="donations-form" direction="column" alignItems="center">
        <Box mb="4rem" w={["90%", "40%"]} textAlign="center">
          <Heading fontWeight="semibold" fontSize="5xl">
            Donations Form
          </Heading>
          <Spacer h="1rem" />
          <Text fontSize="lg">
            Fill out the fields below to complete your personal profile. Make
            sure to fill all the fields and not miss out any important details.
          </Text>
          <Spacer h="2rem" />
          <Text
            bg="yellow.100"
            px={4}
            py={2}
            borderRadius={5}
            border="solid 1.5px"
            borderColor="yellow.500"
            fontWeight={500}
            color="yellow.700"
          >
            No special charecters or spaces in file name only underscores
            allowed
          </Text>
        </Box>

        <DonationsForm />
      </Flex>
    </Box>
  );
};

export default DonationsFormSection;
