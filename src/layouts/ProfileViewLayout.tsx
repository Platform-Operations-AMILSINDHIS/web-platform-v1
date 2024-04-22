import { Box, Flex } from "@chakra-ui/react";
import { KAPMembershipPDF } from "~/server/pdfs/kap-membership";
import { KAPMembershipFormValues } from "~/types/forms/membership";
import dynamic from "next/dynamic";
import useServerActions from "~/hooks/useServerActions";
import { useEffect } from "react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

interface ProfileViewLayoutProps {
  children: React.ReactNode;
}

const ProfileViewLayout: React.FC<ProfileViewLayoutProps> = ({ children }) => {
  const dummyKapForm: KAPMembershipFormValues = {
    personalInfo: {
      firstName: "Rahul",
      middleName: "Kumar",
      lastName: "Sharma",
      occupation: "Backend Developer",
      dateOfBirth: new Date("1999-01-01"),
      mobileNumber: "+919999999999",
      emailId: "rahulkumargupta@gmail.com",
      maidenSurname: "Sharma",
      maidenName: "Rahul Sharma",
      fathersName: "Vikas Kumar",
      mothersName: "Sunita Sharma",
    },
    addressInfo: {
      residentialAddress: {
        addressLine1: "134, 1st Floor, 2nd Cross",
        addressLine2: "2nd Stage, 2nd Block",
        addressLine3: "Rajajinagar",
        pinCode: "560010",
      },
      officeAddress: {
        addressLine1: "567, 3rd Floor",
        addressLine2: "Devika Tower, Elm Street",
        addressLine3: "Gopalapuram",
        pinCode: "560020",
      },
    },
    membershipInfo: {
      membershipType: "life-member",
    },
    familyMembers: [
      {
        memberName: "Vikas Kumar",
        relationship: "Father",
        occupation: "Manager",
        age: 50,
      },
      {
        memberName: "Sunita Sharma",
        relationship: "Mother",
        occupation: "Business owner",
        age: 46,
      },
    ],
    proposerInfo: {
      firstName: "Gokul",
      lastName: "Das",
      mobileNumber: "+918888888888",
    },
  };

  return (
    <Flex p={10} w="full" justify="center">
      <Box bg="yellow" w={1120} h="80vh">
        <PDFViewer width="100%" height="100%">
          <KAPMembershipPDF membershipNumber="#12345" kapForm={dummyKapForm} />
        </PDFViewer>
      </Box>
    </Flex>
  );
};

export default ProfileViewLayout;
