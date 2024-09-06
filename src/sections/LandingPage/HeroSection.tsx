import { Flex, Spacer } from "@chakra-ui/react";
import LinkButton from "~/components/buttons/LinkButton";
import { satoshi } from "~/utils/fonts";

const HeroSection = () => {
  return (
    <div
      className={`${satoshi.variable} mx-auto mt-5 flex max-w-screen-lg flex-col gap-y-10 text-center text-[#1F2937]`}
    >
      {/* Hero */}
      <div className="mx-auto max-w-screen-lg text-center text-[#1F2937]">
        {/* Hero */}
        <div
          className={`${satoshi.variable} mt-10 font-heading text-4xl font-semibold leading-normal md:text-7xl`}
        >
          {`Sharing سنڌي,`}{" "}
          <span className="text-[#FF4D00]">
            Culture <br />
          </span>{" "}
          Language{" "}
          <span className="underline decoration-[#FF4D00] decoration-8">
            & History
          </span>
        </div>
        <div className="mx-auto mt-6 max-w-xl text-lg">
          At The Khudabadi Amil Panchayat of Bombay, we organise a wide range of
          events that cater to the well-being and progress of our community.
        </div>
      </div>
      <Flex w="100%" justify="center">
        <Flex direction={["column", "row"]} gap="1rem">
          <LinkButton
            CTAlabel="Donate Now"
            CTATheme={false}
            CTAlink="/donations"
          />
          <LinkButton CTAlabel="Become a member" CTAlink="/memberships" />
        </Flex>
      </Flex>

      <Spacer h="8rem" />
    </div>
  );
};

export default HeroSection;
