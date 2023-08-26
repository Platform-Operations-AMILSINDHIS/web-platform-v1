import type { NextPage } from "next";

import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";
import KhudabadiAmilPanchayatMembershipForm from "~/components/forms/kap-membership-form";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  return (
    <Layout title="KAP Membership Form">
      <Spacer h="1.5rem" />
      <KhudabadiAmilPanchayatMembershipForm />
      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
