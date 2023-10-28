import {
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Heading,
  Spacer,
  Divider,
  Button,
} from "@chakra-ui/react";

import LinkButton from "~/components/buttons/LinkButton";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { HiClock } from "react-icons/hi";
import { IoIosPin } from "react-icons/io";
import { BiSolidShareAlt } from "react-icons/bi";

const PerksSection: React.FC = () => {
  return (
    <Grid mt={10} templateColumns="1fr 1fr" gap="3rem" position="relative">
      <GridItem>
        <Text color="#FF4D00" fontSize="lg" fontWeight="semibold">
          Your perks
        </Text>
        <Spacer h="0.4rem" />
        <Heading color="#00162B" fontSize="7xl">
          What&apos;s{" "}
          <Text as="span" color="#FF4D00">
            in store
          </Text>{" "}
          for you ?
        </Heading>
        <Box w="100%" borderBottom="1px solid #00000045">
          <Flex mt="1rem" alignItems="center" transform="translateX(-30px)">
            {/* <BsFillRocketTakeoffFill

              size="2rem"
              color="#FF4D00"
              style={{
                filter: "drop-shadow(4px 4px 42px #FF4D00);",
              }}
            /> */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="108"
              height="108"
              viewBox="0 0 108 108"
              fill="none"
            >
              <g filter="url(#filter0_d_562_774)">
                <path
                  d="M53.9022 44.6851C53.5714 44.6852 53.2509 44.8001 52.9953 45.0101C52.7397 45.2201 52.5649 45.5122 52.5005 45.8367C52.4361 46.1611 52.4862 46.4979 52.6423 46.7895C52.7984 47.0812 53.0508 47.3097 53.3564 47.4361C53.6621 47.5626 54.0022 47.5791 54.3187 47.483C54.6352 47.3868 54.9086 47.1839 55.0923 46.9088C55.2759 46.6336 55.3585 46.3033 55.3259 45.9742C55.2934 45.645 55.1477 45.3373 54.9137 45.1035C54.781 44.9705 54.6233 44.8651 54.4497 44.7933C54.2762 44.7215 54.0901 44.6847 53.9022 44.6851Z"
                  fill="#FF4D00"
                />
                <path
                  d="M61.8628 38.9674C61.8625 38.9658 61.8625 38.9642 61.8628 38.9626C61.8175 38.764 61.7176 38.582 61.5744 38.4372C61.4311 38.2924 61.2503 38.1904 61.0522 38.1429C59.4557 37.7534 56.9442 38.1686 54.1611 39.2829C51.356 40.4079 48.7277 42.0686 46.9512 43.8483C46.3818 44.4147 45.8528 45.0203 45.3681 45.6606C44.1718 45.6071 43.118 45.7774 42.2303 46.1647C39.137 47.526 38.2536 51.0098 38.0184 52.4401C37.9844 52.6434 37.9977 52.8517 38.0573 53.049C38.117 53.2462 38.2213 53.427 38.3623 53.5774C38.5032 53.7277 38.677 53.8435 38.87 53.9157C39.063 53.9879 39.27 54.0146 39.475 53.9937H39.482L42.9278 53.6176C42.9321 53.6616 42.937 53.7017 42.9407 53.7387C42.985 54.1586 43.1722 54.5505 43.4711 54.8487L45.1527 56.5314C45.4505 56.8307 45.8424 57.0182 46.2622 57.0623L46.3774 57.0746L46.0024 60.5161V60.523C45.9833 60.7084 46.003 60.8957 46.0603 61.073C46.1177 61.2503 46.2114 61.4136 46.3355 61.5526C46.4596 61.6917 46.6113 61.8032 46.781 61.8803C46.9506 61.9573 47.1345 61.9981 47.3209 62C47.3953 62.0001 47.4697 61.994 47.5432 61.9818C48.9816 61.7504 52.4639 60.8777 53.8214 57.7678C54.2056 56.886 54.3754 55.8366 54.3277 54.6425C54.971 54.1589 55.5788 53.6298 56.1465 53.0594C57.9375 51.2776 59.6036 48.6708 60.7169 45.9065C61.8253 43.1551 62.2426 40.6249 61.8628 38.9674ZM56.1272 48.336C55.687 48.7766 55.126 49.0768 54.5152 49.1986C53.9044 49.3203 53.2711 49.2582 52.6956 49.02C52.1201 48.7818 51.6282 48.3782 51.2821 47.8604C50.936 47.3426 50.7512 46.7337 50.7512 46.1109C50.7512 45.4881 50.936 44.8792 51.2821 44.3614C51.6282 43.8436 52.1201 43.44 52.6956 43.2018C53.2711 42.9636 53.9044 42.9015 54.5152 43.0232C55.126 43.145 55.687 43.4452 56.1272 43.8858C56.4223 44.1764 56.6566 44.5228 56.8165 44.9048C56.9764 45.2868 57.0588 45.6968 57.0588 46.1109C57.0588 46.525 56.9764 46.935 56.8165 47.317C56.6566 47.699 56.4223 48.0454 56.1272 48.336Z"
                  fill="#FF4D00"
                />
                <path
                  d="M44.9598 56.9879C44.7525 56.9621 44.543 57.013 44.3705 57.1309C44.0282 57.365 43.6843 57.5964 43.3371 57.822C42.6348 58.2784 41.7947 57.477 42.2121 56.7505L42.863 55.6255C42.956 55.4894 43.0079 55.3293 43.0122 55.1645C43.0166 54.9997 42.9733 54.8371 42.8876 54.6962C42.8019 54.5553 42.6773 54.4422 42.5289 54.3703C42.3805 54.2985 42.2145 54.271 42.0508 54.2911C41.3284 54.3824 40.6569 54.7115 40.142 55.2264C39.9459 55.423 39.3496 56.0198 39.0287 58.2939C38.9374 58.9472 38.8798 59.6046 38.8562 60.2638C38.8533 60.3782 38.8733 60.492 38.9151 60.5985C38.9568 60.7051 39.0195 60.8022 39.0994 60.8841C39.1793 60.9661 39.2748 61.0312 39.3802 61.0756C39.4857 61.12 39.599 61.1429 39.7134 61.1429H39.7348C40.3945 61.1195 41.0525 61.0623 41.7063 60.9715C43.9816 60.65 44.5784 60.0532 44.7745 59.8572C45.2918 59.3421 45.6201 58.6674 45.7061 57.9425C45.7337 57.717 45.6705 57.4897 45.5306 57.3107C45.3907 57.1317 45.1854 57.0156 44.9598 56.9879Z"
                  fill="#FF4D00"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_562_774"
                  x="0"
                  y="0"
                  width="108"
                  height="108"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="21" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0.301961 0 0 0 0 0 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_562_774"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_562_774"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>

            <Text
              fontSize="3xl"
              fontWeight="semibold"
              transform="translateX(-30px)"
            >
              Goal at hand
            </Text>
          </Flex>
        </Box>

        <Text mt={3} fontSize="xl">
          With the aim of giving back to the society, these events are driven to
          holistically support the society and aid in its protection as well as
          development.
        </Text>
        <Spacer h="2rem" />
        <Flex gap="1.5rem">
          <LinkButton
            CTAlink="#"
            CTAlabel="Learn about connecting"
            px="1.5rem"
            py="1.5rem"
          />
          <LinkButton
            CTAlabel={
              <Flex alignItems="center" gap="0.5rem">
                <Box>Go</Box>
                <ArrowForwardIcon />
              </Flex>
            }
            CTAlink="#"
            CTATheme={false}
            px="1.5rem"
            py="1.5rem"
          />
        </Flex>

        <Spacer h="4rem" />
      </GridItem>

      <GridItem position="absolute" bottom="-40px" right="0">
        <Box
          px="2.5rem"
          h="570px"
          w="449px"
          backgroundImage="/images/backgrounds/orange_phone.png"
          backgroundRepeat="no-repeat"
        >
          <Box transform="translateY(-80px)">
            <Box
              p="2rem"
              bgColor="#FFFFFF"
              border="1px solid rgba(31, 41, 55, 0.18)"
              borderRadius="10px"
              boxShadow="0px 5px 0px 0px rgba(31, 41, 55, 0.25)"
            >
              <Text fontSize="xl" fontWeight="semibold">
                Movie screening happening @ Marine Drive, Rd #04
              </Text>

              <Spacer h="1rem" />

              <Flex gap="0.5rem">
                <Box mt="0.25rem">
                  <HiClock color="#FF4D00" />
                </Box>
                <Box fontSize="lg">
                  <Text fontWeight="semibold" color="#1F2937AB">
                    Saturday, 13 Feb 2023
                  </Text>
                  <Text fontWeight="semibold" color="#00162B">
                    7:00 pm
                  </Text>
                </Box>
              </Flex>

              <Spacer h="1rem" />

              <Flex gap="0.5rem">
                <Box mt="0.25rem">
                  <IoIosPin color="#FF4D00" />
                </Box>
                <Box>
                  <Text
                    fontWeight="semibold"
                    fontSize="lg"
                    color="#E003E5"
                    lineHeight="132.5%"
                    textDecor="underline"
                  >
                    Marine Drive, Rd #04
                  </Text>
                </Box>
              </Flex>

              <Spacer h="1rem" />

              {/* Dashed line */}
              <hr
                style={{
                  border: "2px dashed #C0C0C0",
                  color: "#FFFFFF",
                }}
              />

              <Spacer h="1rem" />

              <Flex gap="0.5rem">
                <LinkButton
                  CTAlink="#"
                  CTAlabel="RSVP"
                  CTATheme={false}
                  px="1.5rem"
                  py="1rem"
                />
                <Button variant="ghost" leftIcon={<BiSolidShareAlt />}>
                  Share
                </Button>
              </Flex>
            </Box>

            <Spacer h="2rem" />

            <Heading textColor="white">Event Details</Heading>

            <Spacer h="0.80rem" />
            <Divider colorScheme="whiteAlpha" />
            <Spacer h="0.80rem" />

            <Text color="white" fontSize="lg">
              Join us for a cinematic extravaganza under the stars! Movie Night
              @ Marine Drive on February 13th, 2023, starting at 7 PM promises
              an unforgettable evening of film magic. Nestled by the serene
              waterfronts of Mumbai.
            </Text>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default PerksSection;
