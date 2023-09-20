import React from "react";
import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "~/components/layout";
import usePayment from "~/hooks/usePayment";

const AboutPage: NextPage = () => {
  const { handlePayment } = usePayment();
  return (
    <Layout title="About">
      <div>hi, this is the about page</div>
      {/*eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={() => handlePayment(100)}>Pay now</Button>
    </Layout>
  );
};

export default AboutPage;
