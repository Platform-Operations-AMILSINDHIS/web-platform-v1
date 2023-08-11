import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  Grid,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FaArrowCircleRight } from "react-icons/fa";
import { EventThumb } from "~/components/events";
import Layout from "~/components/layout";

import { eudoxus } from "~/utils/fonts";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <Layout title="Home" maxW={false}>
      <Box maxW="1280px" mx="auto" px="2rem">
        {/* TODO: Rewrite in Chakra */}
        <div className="mx-auto max-w-screen-lg text-center text-[#1F2937]">
          {/* Hero */}
          <div
            className={`${eudoxus.variable} mt-16 font-heading text-3xl font-bold leading-normal md:text-7xl`}
          >
            Preserving sindhi culture,
            <br />
            <span className="text-[#0079FF]">language</span> & history{" "}
            <span className="underline decoration-[#FFB84C] decoration-8">
              since 1952
            </span>
          </div>
          <div className="mx-auto mt-4 max-w-3xl text-lg">
            The Khudabadi Amil Panchayat of Bombay, is a registered
            Non&mdash;Profit Charitable Trust that aims to provide assistance to
            underprivileged Sindhis displaced from Sindh and to bring the Sindhi
            Amil community together.
          </div>
        </div>

        <Spacer h="2.5rem" />

        {/* Call to action buttons */}
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

        <Spacer h="12rem" />

        {/* Sponsors */}
        <Flex w="100%" justify="space-between">
          {[
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
          ].map(({ image, href }, i) => (
            <Link key={i} href={href}>
              <img alt="" src={image} />
            </Link>
          ))}
        </Flex>
      </Box>

      <Spacer h="5rem" />

      {/* What are we Section */}
      <Flex
        py="7rem"
        w="100vw"
        background="linear-gradient(180deg, #0079FF 47.71%, #FFC01F 100%)"
        justify="center"
        align="center"
      >
        <Flex>
          <Flex>
            <img
              alt=""
              src="/images/backgrounds/what-are-we-illustration.png"
            />
          </Flex>

          <Flex flexDir="column" maxW="600px">
            <Heading color="white" fontWeight="bold" fontSize="7xl">
              What are <span style={{ color: "#FFCF54" }}>we&nbsp;?</span>
            </Heading>
            <Text
              mt="0.5rem"
              color="white"
              maxW="100%"
              fontSize="lg"
              lineHeight="30px"
            >
              We the Khudabadi Amil Panchayat offer a range of services. Joining
              our community is now easier than ever with our simple and
              convenient online membership process. As a member, you gain access
              to various benefits and opportunities to connect with fellow
              Amils.
            </Text>
            {/* <Link href="/blog"> */}
            <Button
              onClick={() => {
                router.push("/blog").catch(console.error);
              }}
              rightIcon={<FaArrowCircleRight />}
              h="3rem"
              mt="2rem"
              w="40%"
              colorScheme="yellow"
            >
              Connecting Amils
            </Button>
            {/* </Link> */}
          </Flex>
        </Flex>
      </Flex>

      <Spacer h="5rem" />

      {/* What we offer section */}
      <Box maxW="1280px" mx="auto" px="2rem">
        <Grid templateColumns="repeat(4, 1fr)" gap="3rem">
          <Flex
            gridColumn="span 2"
            flexDir="column"
            align="baseline"
            gap="0.5rem"
          >
            <Text color="#0079FF">Offerings</Text>
            <Heading fontSize="5xl">
              What we <span style={{ color: "#0079FF" }}>offer</span>
            </Heading>
            <Text>
              At KAP, we are committed to serving our members and fostering a
              strong sense of unity. Feel free to explore our website and take
              advantage of these offerings. Together, let&apos;s make our
              vibrant community thrive!
            </Text>
          </Flex>

          {[
            {
              image: "/images/what-we-offer/memberships.jpg",
              name: "Memberships",
              href: "/memberships/khudabadi-amil-panchayat",
            },
            {
              image: "/images/what-we-offer/donations.png",
              name: "Donations",
              href: "/donations",
            },
            {
              image: "/images/what-we-offer/matrimony.png",
              name: "Matrimony",
              href: "/connecting/matrimony",
            },
            {
              image: "/images/what-we-offer/events.png",
              name: "Events",
              href: "/events",
            },
            {
              image: "/images/what-we-offer/blogs.png",
              name: "Blogs",
              href: "/blog",
            },
            {
              image: "/images/what-we-offer/connect.png",
              name: "Connect",
              href: "/connecting/matrimony",
            },
          ].map(({ image, name, href }, i) => (
            <Link key={i} href={href} _hover={{ textDecor: "none" }}>
              <Flex
                h="200px"
                w="100%"
                p="20px"
                flexDir="column-reverse"
                backgroundImage={image}
                objectFit="fill"
                borderRadius="15px"
                boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
              >
                <Text color="white" fontWeight="semibold">
                  {name} <ArrowForwardIcon />
                </Text>
              </Flex>
            </Link>
          ))}
        </Grid>

        <Spacer h="5rem" />

        {/* Curious about our events section */}
        <Box>
          <Grid templateColumns="repeat(2, 1fr)" gap="3rem">
            <Flex flexDir="column" align="baseline" gap="0.5rem">
              <Text color="#0079FF">Sindhi events & Occasions</Text>
              <Heading fontSize="6xl">
                Curious about <br /> our{" "}
                <span style={{ color: "#0079FF" }}>events ?</span>
              </Heading>
            </Flex>
            <Flex flexDir="column" align="baseline" gap="2rem">
              <Text lineHeight="30px">
                At Khudabadi Amil Panchayat, we organise a wide range of events
                that cater to the well-being and progress of our community.
                Click the button below to begin exploring our events.
              </Text>
              <Link href="/events">
                <Button
                  px="2.5rem"
                  py="1.75rem"
                  bgColor="#FFFFFF"
                  border="1px solid rgba(31, 41, 55, 0.45);"
                  boxShadow="0px 4px 0px 0px rgba(0, 0, 0, 0.19);"
                >
                  Explore events
                </Button>
              </Link>
            </Flex>
          </Grid>
          <Spacer h="3rem" />
          <Grid templateColumns="repeat(3, 1fr)" gap="3rem">
            {[
              {
                image: "/images/curious-about-events/blue-circle.png",
                date: new Date("2023-02-13"),
                title: "Vaccination Drive, Blue Circle",
              },
              {
                image: "/images/curious-about-events/powai-lake.png",
                date: new Date("2023-02-13"),
                title: "Cheti Chanda, Powai Lake",
              },
              {
                image: "/images/curious-about-events/marine-drive.png",
                date: new Date("2023-02-13"),
                title: "Movie Screening, Marine Drive",
              },
            ].map((event, i) => (
              <EventThumb key={i} {...event} />
            ))}
          </Grid>
        </Box>

        <Spacer h="5rem" />

        {/* Donations & Memberships section */}
        <Flex flexDir="column" gap="2rem">
          <Box textAlign="center">
            <Text color="#0079FF">Donations & Memberships</Text>
            <Spacer h="0.5rem" />
            <Heading fontSize="6xl">Donations & Memberships</Heading>
          </Box>

          <Grid templateColumns="repeat(2, 1fr)" gap="3rem">
            <Box>
              <img src="/images/donations-and-memberships-section.png" />
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
          </Grid>
        </Flex>
      </Box>

      <Spacer h="5rem" />

      {/* Q&A section */}

      <Spacer h="12rem" />
    </Layout>
  );
};

export default HomePage;
