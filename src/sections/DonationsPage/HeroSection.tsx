import { Flex, Box, Text, Spacer } from "@chakra-ui/react";

import LinkButton from "~/components/buttons/LinkButton";

import { satoshi } from "~/utils/fonts";

const HeroSection = () => {
  return (
    <div
      className={`${satoshi.variable} mx-auto mt-16 flex max-w-screen-lg flex-col gap-y-10 text-center text-[#1F2937]`}
    >
      {/* Hero */}
      <div className="flex-col font-heading text-4xl font-semibold leading-5 md:text-7xl">
        Donate to Make a
        <p className="mt-5">
          <span className="text-[#FF4D00]">Difference</span>
        </p>
      </div>
      <div className="mx-auto max-w-4xl flex-col text-xl">
        We, the Khudabadi Amil Panchayat of Bombay, are a global community of
        Amil Sindhis. We are committed to helping society by uplifting the lives
        of the underprivileged. We also take up aiding initiatives for young
        Amil aspirants who wish to sparkle in their educational path.
        <p className="mt-5">
          Giving is not just about donating, it is about making a difference.
        </p>
      </div>
      <Flex w="100%" justify="center">
        <Flex gap={["1rem", "2.5rem"]}>
          <LinkButton
            CTAlink="/donations#types-of-donations"
            CTAlabel="Learn More"
            onClick={(e) => {
              e.preventDefault();

              document.querySelector("#types-of-donations")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            CTATheme={false}
          />
          <LinkButton
            CTAlabel="Donate now"
            CTAlink="/donations#donations-form"
            onClick={(e) => {
              e.preventDefault();

              document.querySelector("#donations-form")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        </Flex>
      </Flex>

      <Spacer h="8rem" />
    </div>
  );
};

export default HeroSection;
