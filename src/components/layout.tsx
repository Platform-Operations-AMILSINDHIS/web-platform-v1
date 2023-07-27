import Head from "next/head";
import Navbar from "~/components/navbar";

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

      <div className="mx-auto max-w-screen-xl">
        <Navbar />
        <main className="w-full">{children}</main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
