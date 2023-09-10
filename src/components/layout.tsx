import Head from "next/head";
import Navbar from "~/components/navbar";

import { satoshi } from "../utils/fonts";

const Layout: React.FC<{
  title?: string;
  children: React.ReactNode;
  maxW?: boolean;
  blogPostPage?: boolean;
}> = ({ title, children, maxW = true, blogPostPage = false }) => {
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

      <div
        className={`${satoshi.variable} ${
          maxW && "max-w-screen-xl"
        } mx-auto font-sans`}
      >
        <Navbar blogPostPage={blogPostPage} />
        <main className={`mx-auto w-full ${maxW && "px-4 md:px-4"}`}>
          {children}
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
