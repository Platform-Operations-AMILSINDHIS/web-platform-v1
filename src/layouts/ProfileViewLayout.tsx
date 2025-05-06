import { Box, Flex } from "@chakra-ui/react";
import { KAPMembershipPDF } from "~/server/pdfs/kap-membership";
import { YACMembershipPDF } from "~/server/pdfs/yac-membership";
import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "~/types/forms/membership";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

interface ProfileViewLayoutProps {
  children: React.ReactNode;
  submission: KAPMembershipFormValues | YACMembershipFormValues;
  formType: string | null | undefined;
}

const ProfileViewLayout: React.FC<ProfileViewLayoutProps> = ({
  children,
  submission,
  formType,
}) => {
  return (
    <Flex mb={10} p={10} w="full" justify="center">
      <Box bg="yellow" w={1120} h="80vh">
        <PDFViewer width="100%" height="100%">
          {formType === "YAC" ? (
            <YACMembershipPDF
              membershipNumber="#12345"
              yacForm={submission as YACMembershipFormValues}
            />
          ) : (
            <KAPMembershipPDF
              membershipNumber="#12345"
              kapForm={submission as KAPMembershipFormValues}
            />
          )}
        </PDFViewer>
        {children}
      </Box>
    </Flex>
  );
};

export default ProfileViewLayout;
