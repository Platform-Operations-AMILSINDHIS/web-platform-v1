import { satoshi } from "~/utils/fonts";

const HeroSection = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-lg text-center text-[#1F2937]">
        {/* Hero */}
        <div
          className={`${satoshi.variable} mt-16 font-heading text-3xl font-semibold leading-normal md:text-7xl`}
        >
          Amil Blogs, <span className="text-[#FF4D00]">Samachar &</span>{" "}
          Publications all in{" "}
          <span className="underline decoration-[#FF4D00] decoration-8">
            one place
          </span>
        </div>
        <div className="mx-auto mt-4 max-w-xl text-lg">
          Subscribe to our amil blogs, samachar and publications today and stay
          up to date with all amil related news
        </div>
      </div>
    </>
  );
};

export default HeroSection;
