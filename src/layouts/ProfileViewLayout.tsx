import { Box, Flex } from "@chakra-ui/react";
import { KAPMembershipPDF } from "~/server/pdfs/kap-membership";
import { KAPMembershipFormValues } from "~/types/forms/membership";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

interface ProfileViewLayoutProps {
  children: React.ReactNode;
  submission: KAPMembershipFormValues;
}

const ProfileViewLayout: React.FC<ProfileViewLayoutProps> = ({
  children,
  submission,
}) => {
  return (
    <Flex p={10} w="full" justify="center">
      <Box bg="yellow" w={1120} h="80vh">
        <PDFViewer width="100%" height="100%">
          <KAPMembershipPDF membershipNumber="#12345" kapForm={submission} />
        </PDFViewer>
      </Box>
    </Flex>
  );
};

export default ProfileViewLayout;
