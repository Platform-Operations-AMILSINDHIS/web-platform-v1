import type { NextPage } from "next";

import { Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";
import YoungAmilCircleMembershipForm from "~/components/forms/yac-membership-form";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  return (
    <Layout title="YAC Membership Form">
      <Spacer h="1.5rem" />
      <YoungAmilCircleMembershipForm />
      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
