import Head from "next/head";
import Navigation from "./Navigation";

import { satoshi } from "../utils/fonts";
import { Box } from "@chakra-ui/react";

const Layout: React.FC<{
  title?: string;
  children: React.ReactNode;
  maxW?: boolean;
  blogPostPage?: boolean;
}> = ({ title, children, maxW = true }) => {
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

      <Box
        className={`${satoshi.variable} ${
          maxW && "max-w-screen-xl"
        } mx-auto font-sans`}
      >
        <Box mx="90px" my={6}>
          <Navigation />
        </Box>
        <main className={`mx-auto w-full ${maxW && "px-4 md:px-4"}`}>
          {children}
        </main>
        xxxx
        <footer></footer>
      </Box>
    </div>
  );
};

export default Layout;
