import { Button, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { btnThemeDark, btnThemeLight } from "~/components/buttons/BtnThemes";
import LinkButton from "~/components/buttons/LinkButton";
import { satoshi } from "~/utils/fonts";

const HeroSection = () => {
  return (
    <div
      className={`${satoshi.variable} mx-auto mt-16 flex max-w-screen-lg flex-col gap-y-10 text-center text-[#1F2937]`}
    >
      {/* Hero */}
      <div className="flex-col font-heading text-3xl font-semibold leading-5 md:text-7xl">
        Preserving sindhi culture,
        <p className="mt-5">
          <span className="text-[#FF4D00]">language</span> & history{" "}
          <span className="underline decoration-[#FF4D00] decoration-8">
            since 1952
          </span>
        </p>
      </div>
      <div className="mx-auto max-w-4xl text-xl">
        The Khudabadi Amil Panchayat of Bombay, is a registered Non-Profit
        Charitable Trust that aims to provide assistance to underprivileged
        Sindhis displaced from Sindh and to bring the Sindhi Amil community
        together.
      </div>
      <Flex w="100%" justify="center">
        <Flex gap="2.5rem">
          <LinkButton
            CTAlink="/memberships"
            CTAlabel="Membership"
            CTATheme={false}
          />
          <LinkButton CTAlabel="Donate now" CTAlink="/donations" />
        </Flex>
      </Flex>

      <Spacer h="8rem" />
    </div>
  );
};

export default HeroSection;
