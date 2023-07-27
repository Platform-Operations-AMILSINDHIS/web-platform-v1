import type { NextPage } from "next";
import Layout from "~/components/layout";

import { eudoxus } from "~/utils/fonts";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-screen-lg text-center">
        <div
          className={`${eudoxus.variable} mt-16 font-heading text-7xl font-bold leading-normal text-[#1F2937]`}
        >
          Amil Blogs, <span className="text-[#0079FF]">Samachar &</span>{" "}
          Publications all in{" "}
          <span className="underline decoration-[#FFB84C] decoration-8">
            one place
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
