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
  useDisclosure,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { createId as cuid } from "@paralleldrive/cuid2";

import { LabelledInput } from "~/components/forms";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GrDocument } from "react-icons/gr";

import usePayment from "~/hooks/usePayment";

import { toWords } from "~/utils/helper";
import { api } from "~/utils/api";
import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

const DonationsForm: React.FC = () => {
  const toast = useToast();
  const [uploadedFilesCount, setUploadedFilesCount] = useState<number>(0);

  const donationsFormMut = api.form.donations.useMutation();
  const { mutateAsync: fetchPresignedUrls } =
    api.r2.getPresignedUrl.useMutation();

  const [form, setForm] = useState<{
    amount: number | null;
    donorName: string;
    contactNumber: string;
    email: string;
  }>({
    amount: null,
    donorName: "",
    contactNumber: "",
    email: "",
  });

  const { handlePayment, paymentId, isPaying } = usePayment({
    prefillDetails: {
      name: form.donorName,
      email: form.email,
      contact: form.contactNumber,
    },
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
          setUploadedFilesCount(uploadedFilesCount + 1);
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
          setUploadedFilesCount(uploadedFilesCount + 1);
          console.log(response);
          console.log(
            "Successfully uploaded Address Proof file: ",
            addressFilename
          );
        })
        .catch((err) => console.error(err));

      try {
        const res = await donationsFormMut.mutateAsync({
          formData: {
            ...form,
            amount: form.amount!,
            panCard: env.NEXT_PUBLIC_R2_ACCESS_URL + "/" + encodeURIComponent(panFilename ?? ""),
            addressProof: env.NEXT_PUBLIC_R2_ACCESS_URL + "/" + encodeURIComponent(addressFilename ?? ""),
          },
        });

        if (!res.success) {
          toast({
            title: "An error occurred.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });

          console.error("An error occurred while submitting the form");
          return;
        }

        toast({
          title: "Form submitted.",
          description: "Thank you for your contribution!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err: unknown) {
        toast({
          title: "An error occurred.",
          description: err as string,
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        console.error(err);
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
    toast,
    uploadedFilesCount,
  ]);

  useEffect(() => {
    if (paymentId) {
      void handleSubmit();
    }
  }, [paymentId]);

  // // Logger
  // useEffect(() => console.log(form), [form]);

  return (
    <Flex direction="column" alignItems="center" gap="2rem">
      <Flex w="40%" mx="auto">
        {/* <LabelledInput
          type="chakra-text"
          label="Donation Amount"
          onChange={(e) => setForm({ ...form, donorName: e.target.value })}
        /> */}
        <FormControl isRequired>
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

      <Grid templateColumns="repeat(3, 1fr)" gap="2rem">
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
        // onClick={() => void handleSubmit()}
        onClick={() => {
          if (!form.amount) {
            toast({
              title: "An error occurred.",
              description: "Please enter a valid donation amount.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          if (
            !panFilename?.toLowerCase().endsWith(".jpg") &&
            !panFilename?.toLowerCase().endsWith(".jpeg") &&
            !panFilename?.toLowerCase().endsWith(".png") &&
            !panFilename?.endsWith(".pdf")
          ) {
            toast({
              title: "File Upload Error",
              description:
                "Please upload either a JPG, PNG, or PDF of your PAN Card.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            return;
          }

          if (
            !addressFilename?.toLowerCase().endsWith(".jpg") &&
            !addressFilename?.toLowerCase().endsWith(".jpeg") &&
            !addressFilename?.toLowerCase().endsWith(".png") &&
            !addressFilename?.endsWith(".pdf")
          ) {
            toast({
              title: "File Upload Error",
              description:
                "Please upload either a JPG, PNG, or PDF of your address proof.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            return;
          }

          void handlePayment(form.amount * 100, "donation");
        }}
        isDisabled={
          panPresignedUrl === null ||
          panCardAcceptedFiles.length === 0 ||
          addressPresignedUrl === null ||
          addressProofAcceptedFiles.length === 0 ||
          submitDisabled
        }
        isLoading={
          (isPaying && !paymentId) ||
          (0 < uploadedFilesCount && uploadedFilesCount < 1) ||
          donationsFormMut.isLoading
        }
      >
        Pay now
      </Button>
    </Flex>
  );
};

const DonationsFormSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayState, setDisplayState] = useState(false);
  const [{ user }] = useUserAtom();

  const handleModal = (state: boolean) => {
    setDisplayState(state);
    onOpen();
  };
  return (
    <Box position="relative">
      {/* <Box
        display={user ? "none" : ""}
        left="50%"
        top="50%"
        transform="translate(-50%,-50%)"
        zIndex={2}
        height={100}
        position="absolute"
      >
        <UserBlockModal />
      </Box>
      <Box
        _hover={user ? {} : { cursor: "not-allowed" }}
        filter={user ? "" : "blur(2px)"}
      > */}
      <Flex id="donations-form" direction="column" alignItems="center">
        <Box mb="4rem" w="40%" textAlign="center">
          <Heading fontWeight="semibold" fontSize="5xl">
            Donations Form
          </Heading>
          <Spacer h="1rem" />
          <Text fontSize="lg">
            Fill out the fields below to complete your personal profile. Make
            sure to fill all the fields and not miss out any important details.
          </Text>
        </Box>

        <DonationsForm />
      </Flex>
    </Box>
    // </Box>
  );
};

export default DonationsFormSection;
