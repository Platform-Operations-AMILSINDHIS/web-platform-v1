import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const eudoxus = localFont({
  src: "../assets/fonts/EudoxusSansGX.woff2",
  display: "swap",
  variable: "--font-eudoxus",
});
