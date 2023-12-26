import type { NextPage } from "next";

import { Box, Spacer } from "@chakra-ui/react";

import Layout from "~/components/layout";
import YoungAmilCircleMembershipForm from "~/components/forms/yac-membership-form";
import UserBlockModal from "~/components/authentication/UserBlockModal";
import { useUserAtom } from "~/lib/atom";

const KhudabadiAmilPanchayatMembershipPage: NextPage = () => {
  const [{ user }] = useUserAtom();
  return (
    <Layout title="KAP Membership Form">
      <Spacer h="1.5rem" />
      <Box position="relative">
        <Box
          display={user ? "none" : ""}
          left="50%"
          top="50%"
          transform="translate(-50%,-95%)"
          zIndex={2}
          height={100}
          position="absolute"
        >
          <UserBlockModal />
        </Box>
        <Box
          filter={user ? "" : "blur(2px)"}
          _hover={user ? {} : { cursor: "not-allowed" }}
        >
          <YoungAmilCircleMembershipForm />
        </Box>
      </Box>
      <Spacer h="5rem" />
    </Layout>
  );
};

export default KhudabadiAmilPanchayatMembershipPage;
