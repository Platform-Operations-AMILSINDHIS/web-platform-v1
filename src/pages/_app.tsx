import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as JotaiProvider } from "jotai";

import { Analytics } from "@vercel/analytics/next";

import { api } from "~/utils/api";
import useUserStatusSync from "~/hooks/useUserStatusSync";

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

/** Mounts app-wide effects that require Jotai + Chakra context. */
const AppEffects = () => {
  useUserStatusSync();
  return null;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Analytics />
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <JotaiProvider>
            <AppEffects />
            <Component {...pageProps} />
          </JotaiProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
