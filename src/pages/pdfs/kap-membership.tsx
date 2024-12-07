import type { NextPage } from "next";
import Layout from "~/components/layout";

// import KAPMembershipPDF from "~/components/pdfs/kap-membership";

import type { KAPMembershipFormValues } from "~/types/forms/membership";

// const KAPMembershipPDF = dynamic(
//   () => import("~/components/pdfs/kap-membership"),
//   { ssr: false }
// );

const MembershipsHomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <></>
    </Layout>
  );
};

export default MembershipsHomePage;
