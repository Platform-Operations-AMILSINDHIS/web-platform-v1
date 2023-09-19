import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "~/components/layout";
import usePayment from "~/hooks/usePayment";

const AboutPage: NextPage = () => {
  const { handlePayment } = usePayment();
  return (
    <Layout title="Home">
      <div>hi, this is the about page</div>
      <Button onClick={handlePayment}>Pay now</Button>
    </Layout>
  );
};

export default AboutPage;
