import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Black.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

// export const eudoxus = localFont({
//   src: "../assets/fonts/EudoxusSansGX.woff2",
//   display: "swap",
//   variable: "--font-eudoxus",
// });
