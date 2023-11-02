import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as JotaiProvider } from "jotai";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/fonts.css";

const theme = extendTheme({
  fonts: {
    heading: "'satoshi sans', sans-serif",
    body: "'satoshi sans', sans-serif",
  },
  colors: {
    orange: {
      500: "#FF4D00",
      600: "#DD4809",
    },
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <JotaiProvider>
          <Component {...pageProps} />
        </JotaiProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
