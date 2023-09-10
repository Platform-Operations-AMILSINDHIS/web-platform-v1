import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Layout from "~/components/layout";

// import KAPMembershipPDF from "~/components/pdfs/kap-membership";

import type { KAPMembershipFormValues } from "~/types/forms/membership";

const KAPMembershipPDF = dynamic(
  () => import("~/components/pdfs/kap-membership"),
  { ssr: false }
);

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

const MembershipsHomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <KAPMembershipPDF membershipNumber="#12345" kapForm={dummyKapForm} />
    </Layout>
  );
};

export default MembershipsHomePage;
