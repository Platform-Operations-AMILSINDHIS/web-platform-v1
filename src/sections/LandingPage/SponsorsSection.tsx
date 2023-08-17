import { Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const SponsorsSection = () => {
  const sponsorLogos = [
    {
      image: "/images/sponsors/amplitude.png",
      href: "",
    },
    {
      image: "/images/sponsors/bloomberg.png",
      href: "",
    },
    {
      image: "/images/sponsors/evernote.png",
      href: "",
    },
    {
      image: "/images/sponsors/dribbble.png",
      href: "",
    },
  ];
  return (
    <>
      <Spacer h="4rem" />

      <Flex w="100%" justify="space-between">
        {sponsorLogos.map(({ image, href }, i) => (
          <Link key={i} href={href}>
            <img alt="sponsor logo" src={image} />
          </Link>
        ))}
      </Flex>
    </>
  );
};

export default SponsorsSection;
