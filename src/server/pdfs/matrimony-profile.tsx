/* eslint-disable */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { MatrimonyFormValues } from "~/types/forms/matrimony";

interface MatrimonyPDFProps {
  profileData: MatrimonyFormValues;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "white",
  },
  infoGap: {
    marginBottom: 3,
  },
  heading: {
    fontSize: 18,
    textDecoration: "underline",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export const MatrimonyPDF: React.FC<MatrimonyPDFProps> = ({ profileData }) => {
  const {
    personalInfo,
    proposerInfo,
    residentialAddressDetails,
    spousePreferences,
    familyMembers,
  } = profileData;
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text
            style={{
              fontSize: 25,
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Matrimony Profile Information
          </Text>
          <Text
            style={{
              marginTop: 15,
              lineHeight: 1.4,
              paddingBottom: 5,
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              border: "1px",
              borderRadius: 6,
            }}
          >
            The following information provided to you should not be shared
            online or forwarded anywhere. Doing so will lead to strict action by
            the community
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginTop: 20, fontSize: 20 }}>
            {personalInfo.firstName} {personalInfo.middleName}{" "}
            {personalInfo.lastName}, {personalInfo.gender}
          </Text>
          <Text style={{ marginTop: 3, fontSize: 14 }}>
            {personalInfo.occupation}
          </Text>
        </View>
        <Text style={styles.heading}>Personal Information</Text>
        <View>
          <Text style={styles.infoGap}>
            Marital Status: {personalInfo.maritalStatus}
          </Text>
          <Text style={styles.infoGap}>
            Date of Birth: {personalInfo.dateAndTimeOfBirth.slice(0, 10)}
          </Text>
          <Text style={styles.infoGap}>
            Height: {personalInfo.heightFeet}' {personalInfo.heightInches}"
          </Text>
          <Text style={styles.infoGap}>Weight: {personalInfo.weight} Kg</Text>
          <Text style={styles.infoGap}>Email: {personalInfo.emailId}</Text>
          <Text style={styles.infoGap}>
            Mobile Number: {personalInfo.mobileNumber}
          </Text>
          <Text style={styles.infoGap}>
            Place of Birth: {personalInfo.placeOfBirth}
          </Text>
          <Text style={styles.infoGap}>
            Qualifications: {personalInfo.qualifications}
          </Text>
          <Text style={styles.infoGap}>
            Annual Income: Rs.{" "}
            {personalInfo.incomePerAnnum?.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.infoGap}>
            Complexion: {personalInfo.complexionAndFeatures}
          </Text>
        </View>

        <Text style={styles.heading}>
          Proposer Information (if different from Personal Information)
        </Text>
        {proposerInfo.firstName && (
          <View>
            <Text style={styles.infoGap}>
              Name: {proposerInfo.firstName} {proposerInfo.lastName}
            </Text>
            <Text style={styles.infoGap}>
              Mobile Number: {proposerInfo.mobileNumber}
            </Text>
          </View>
        )}

        <Text style={styles.heading}>Family Members</Text>
        {familyMembers?.map((member, index) => (
          <View key={index}>
            <Text style={styles.infoGap}>
              {index + 1}. {member.memberName} ({member.relationship}),{" "}
              {member.occupation}, {member.age}
            </Text>
          </View>
        ))}

        <Text style={styles.heading}>Spouse Preferences</Text>
        <View>
          <Text style={styles.infoGap}>Build: {spousePreferences.build}</Text>
          <Text style={styles.infoGap}>
            Height: {spousePreferences.heightFeet}'{" "}
            {spousePreferences.heightInches}"
          </Text>
          <Text style={styles.infoGap}>
            Weight: {spousePreferences.weight} Kg
          </Text>
          <Text style={styles.infoGap}>
            Working: {spousePreferences.working}
          </Text>
          <Text style={styles.infoGap}>
            Siblings: {spousePreferences.siblings}
          </Text>
          <Text style={styles.infoGap}>
            Complexion: {spousePreferences.complexion}
          </Text>
          <Text style={styles.infoGap}>
            Dietary Preference: {spousePreferences.dietaryPreference}
          </Text>
          <Text style={styles.infoGap}>
            Horoscope Matching: {spousePreferences.horoscopeMatching}
          </Text>
          <Text style={styles.infoGap}>
            Qualification Requirements:{" "}
            {spousePreferences.qualificationRequirements}
          </Text>
        </View>

        <Text style={styles.heading}>Residential Address Details</Text>
        <View>
          <Text style={styles.infoGap}>
            Address: {residentialAddressDetails.addressLine1}
          </Text>
          <Text style={styles.infoGap}>
            {residentialAddressDetails.addressLine2},{" "}
            {residentialAddressDetails.addressLine3}
          </Text>
          <Text style={styles.infoGap}>
            Pincode: {residentialAddressDetails.pinCode}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export const generateMatrimonyProfilePDF = async (props: MatrimonyPDFProps) =>
  await renderToBuffer(<MatrimonyPDF {...props} />);
