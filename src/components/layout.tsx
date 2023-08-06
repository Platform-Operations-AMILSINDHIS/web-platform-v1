import Head from "next/head";
import Navbar from "~/components/navbar";

import { poppins } from "../utils/fonts";

const Layout: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
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

      <div className={`${poppins.variable} mx-auto max-w-screen-xl font-sans`}>
        <Navbar />
        <main className="mx-auto w-full px-4 md:px-4">{children}</main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
