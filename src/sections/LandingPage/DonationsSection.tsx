import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import DonationImage from "../../../public/images/donations-and-memberships-section.png";
import LinkButton from "~/components/buttons/LinkButton";

interface sectionProps {
  imageUrl: string;
}

const DonationsSection = ({ imageUrl }: sectionProps) => {
  return (
    <>
      <Spacer h="8rem" />

      {/* Donations & Memberships section */}
      <Flex flexDir="column" gap="2rem">
        <Box textAlign="center">
          <Text color="#FF4D00" fontWeight={500}>
            Donations & Memberships
          </Text>
          <Spacer h="0.3rem" />
          <Heading fontSize="6xl" fontWeight={700}>
            Donations & <span style={{ color: "#FF4D00" }}>Memberships</span>
          </Heading>
        </Box>

        <Flex align="center" justify={"space-between"}>
          <Box>
            <Image
              alt="donation pic"
              width={1500}
              height={0}
              src={DonationImage}
            />
          </Box>
          <Box>
            <Text fontSize="18px" lineHeight="30px">
              By donating today, you are helping us provide essential aid to
              those in need during challenging times.
            </Text>
            &nbsp;
            <Text fontSize="18px" lineHeight="30px">
              Your contribution can have a significant impact on our
              community&apos;s well-being and cultural preservation. Together,
              let&apos;s build a stronger and sustainable community.
            </Text>
            <Spacer h="2rem" />
            <Flex gap="1rem">
              <LinkButton
                CTAlabel="Donate Now"
                CTATheme={false}
                CTAlink="/donations"
              />
              <LinkButton CTAlabel="Become a member" CTAlink="/memberships" />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default DonationsSection;
