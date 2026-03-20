import Head from "next/head";

import { satoshi } from "../utils/fonts";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "./Footer";
import { useRouter } from "next/router";
// import Navigation from "./navigation";

const Layout: React.FC<{
  title?: string;
  children: React.ReactNode;
  maxW?: boolean;
  blogPostPage?: boolean;
}> = ({ title, children, maxW = true }) => {
  const router = useRouter();
  const currentEndpoint = router.pathname;
  return (
    <>
      <Head>
        <title suppressHydrationWarning>
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
          {/* <Navigation 
            userLocation={currentEndpoint}
            navigationItems={navigation}
          /> */}
        </Box>
        <main className={`mx-auto w-full ${maxW && "px-4 md:px-4"}`}>
          {children}
        </main>
      </Flex>
      <Footer />
    </>
  );
};

export default Layout;
