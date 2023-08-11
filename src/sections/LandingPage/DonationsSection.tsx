import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const DonationsSection = () => {
  return (
    <>
      <Spacer h="8rem" />

      {/* Donations & Memberships section */}
      <Flex flexDir="column" gap="2rem">
        <Box textAlign="center">
          <Text color="#0079FF">Donations & Memberships</Text>
          <Spacer h="0.5rem" />
          <Heading fontSize="6xl">Donations & Memberships</Heading>
        </Box>

        <Flex align="center" justify={"space-between"}>
          <Box>
            <Image
              alt="donation pic"
              width={1500}
              height={0}
              src="/images/donations-and-memberships-section.png"
            />
          </Box>
          <Box>
            <Text lineHeight="30px">
              By donating today, you are helping us provide essential aid to
              those in need during challenging times.
            </Text>
            <Text mt="2rem" lineHeight="30px">
              Your contribution can have a significant impact on our
              community&apos;s well-being and cultural preservation. Together,
              let&apos;s build a stronger and sustainable community.
            </Text>
            <Spacer h="2rem" />
            <Flex gap="1rem">
              <Link href="/donations">
                <Button
                  px="3rem"
                  py="1.6rem"
                  colorScheme="blue"
                  bgColor="#0079FF"
                  _hover={{ bgColor: "#0068db" }}
                  border="1px solid #0079FF"
                  boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
                >
                  Donate now
                </Button>
              </Link>
              <Link href="/memberships/khudabadi-amil-panchayat">
                <Button
                  px="2rem"
                  py="1.6rem"
                  bgColor="#FFFFFF"
                  border="1px solid rgba(31, 41, 55, 0.45);"
                  boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
                >
                  Become a member
                </Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default DonationsSection;
