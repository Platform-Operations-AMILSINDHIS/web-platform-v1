import { Button, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { eudoxus } from "~/utils/fonts";

const HeroSection = () => {
  return (
    <div className="mx-auto mt-16 flex max-w-screen-lg flex-col gap-y-10 text-center text-[#1F2937]">
      {/* Hero */}
      <div
        className={`${eudoxus.variable} flex-col font-heading text-3xl font-bold leading-5 md:text-7xl`}
      >
        Preserving sindhi culture,
        <p className="mt-5">
          <span className="text-[#0079FF]">language</span> & history{" "}
          <span className="underline decoration-[#FFB84C] decoration-8">
            since 1952
          </span>
        </p>
      </div>
      <div className="mx-auto max-w-4xl text-xl font-medium">
        The Khudabadi Amil Panchayat of Bombay, is a registered Non&mdash;Profit
        Charitable Trust that aims to provide assistance to underprivileged
        Sindhis displaced from Sindh and to bring the Sindhi Amil community
        together.
      </div>
      <Spacer h="2.5rem" />
      <Flex w="100%" justify="center">
        <Flex gap="1rem">
          <Link href="/memberships/khudabadi-amil-panchayat">
            <Button
              px="3rem"
              py="2rem"
              colorScheme="blue"
              bgColor="#0079FF"
              _hover={{ bgColor: "#0068db" }}
              border="1px solid #0079FF"
              boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
            >
              Membership
            </Button>
          </Link>
          <Link href="/donations">
            <Button
              px="3rem"
              py="2rem"
              bgColor="#FFFFFF"
              border="1px solid rgba(31, 41, 55, 0.45);"
              boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
            >
              Donate now
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Spacer h="8rem" />
    </div>
  );
};

export default HeroSection;
