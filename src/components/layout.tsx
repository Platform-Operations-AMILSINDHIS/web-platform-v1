import Head from "next/head";
import Navigation from "./Navigation";

import { satoshi } from "../utils/fonts";
import { Box, Flex } from "@chakra-ui/react";
import { navigation } from "../constants/LandingConstants.json";
import { useRouter } from "next/router";
import Footer from "./Footer";

const Layout: React.FC<{
  title?: string;
  children: React.ReactNode;
  maxW?: boolean;
  blogPostPage?: boolean;
}> = ({ title, children, maxW = true }) => {
  const router = useRouter();
  const currentEndpoint = router.pathname;
  return (
    <div>
      <Head>
        <title>
          {title
            ? `${title} | Khudabadi Amil Panchayat`
            : "Khudabadi Amil Panchayat of Bombay"}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        flexDir="column"
        align="center"
        className={`${satoshi.variable} ${
          maxW && "max-w-screen-xl"
        } mx-auto font-sans`}
      >
        <Box w={1000} my={6}>
          <Navigation
            userLocation={currentEndpoint}
            /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
            navigationItems={navigation}
          />
        </Box>
        <main className={`mx-auto w-full ${maxW && "px-4 md:px-4"}`}>
          {children}
        </main>
      </Flex>
      <Footer />
    </div>
  );
};

export default Layout;
