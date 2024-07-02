import { Box, Flex } from "@chakra-ui/react";
import EventHeroCard from "~/components/events/EventsHeroCard";
import { satoshi } from "~/utils/fonts";

const HeroSection = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-lg text-center text-[#1F2937]">
        {/* Hero */}
        <div
          className={`${satoshi.variable} mt-10 font-heading text-4xl font-semibold leading-normal md:text-7xl`}
        >
          Our Events,{" "}
          <span className="text-[#FF4D00]">
            Drives & <br />
          </span>{" "}
          Camps all{" "}
          <span className="underline decoration-[#FF4D00] decoration-8">
            right here
          </span>
        </div>
        <div className="mx-auto mt-4 max-w-xl text-lg">
          At The Khudabadi Amil Panchayat of Bombay, we organise a wide range of
          events that cater to the well-being and progress of our community.
        </div>
      </div>
    </>
  );
};

export default HeroSection;
