import type { NextPage } from "next";
import Layout from "~/components/layout";

import { eudoxus } from "~/utils/fonts";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-screen-lg text-center text-[#1F2937]">
        <div
          className={`${eudoxus.variable} mt-16 font-heading text-7xl font-bold leading-normal`}
        >
          Amil Blogs, <span className="text-[#0079FF]">Samachar &</span>{" "}
          Publications all in{" "}
          <span className="underline decoration-[#FFB84C] decoration-8">
            one place
          </span>
        </div>
        <div className="mx-auto mt-4 max-w-xl text-lg">
          Subscribe to our amil blogs, samachar and publications today and stay
          up to date with all amil related news
        </div>
      </div>
    </Layout>
  );
};

export default Home;
