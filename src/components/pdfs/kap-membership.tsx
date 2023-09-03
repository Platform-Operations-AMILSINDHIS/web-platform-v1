import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import type { KAPMembershipFormValues } from "~/types/forms/membership";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    margin: 10,
    // padding: 10,
    // flexGrow: 1,
  },
  headerInnerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
  },
  centerTextWithBorder: {
    width: "100%",
    height: "100%",
    border: "1px solid black",
    justifyContent: "center",
    alignItems: "center",
  },
  rightTextWithBorder: {
    width: "100%",
    height: "100%",
    border: "1px solid black",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  topTextWithBorder: {
    width: "100%",
    height: "100%",
    padding: 5,
    border: "1px solid black",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  connectedSection: {
    flexDirection: "column",
  },
  connectedSectionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const KAPMembershipPDF: React.FC<{
  membershipNumber: string;
  kapForm: KAPMembershipFormValues;
}> = ({ membershipNumber, kapForm }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "80vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.section}>
            <View style={styles.headerInnerSection}>
              <Image
                src={window.location.origin + "/images/pdfs/kap-pdf-header.png"}
                style={{ width: "80%" }}
              />
              <View
                style={{
                  ...styles.centerTextWithBorder,
                  width: "20%",
                  height: "150%",
                  transform: "translateY(30px)",
                }}
              >
                <Text style={{ fontSize: 10 }}>Photo</Text>
              </View>
            </View>
          </View>

          {/* Membership Number semi-section */}
          <View style={{ ...styles.section, flexDirection: "row", gap: 80 }}>
            <View
              style={{
                ...styles.topTextWithBorder,
                width: "20%",
                height: "50px",
              }}
            >
              <Text style={{ fontSize: 10 }}>Membership No.</Text>
              <Text style={styles.fieldValue}>
                {membershipNumber.toUpperCase()}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 10 }}>
                (Please complete in Capital Letters)
              </Text>
            </View>
          </View>

          {/* Membership/application form section */}
          <View style={{ ...styles.connectedSection, margin: 10, gap: 5 }}>
            <View
              style={{
                ...styles.centerTextWithBorder,
                fontWeight: "extrabold",
                textTransform: "uppercase",
                fontSize: 10,
                height: 20,
              }}
            >
              <Text>Membership / Application Form - Patron / Life-Member</Text>
            </View>

            <View style={{ ...styles.connectedSectionRow, height: 60 }}>
              <View
                style={{
                  ...styles.centerTextWithBorder,
                  width: "15%",
                }}
              >
                <Text style={{ fontSize: 10 }}>NAME</Text>
                <Text style={{ fontSize: 10 }}>Mr/Mrs/Miss</Text>
              </View>
              <View
                style={{
                  ...styles.centerTextWithBorder,
                  width: "15%",
                }}
              >
                <Text style={{ fontSize: 10 }}>Surname</Text>
                <Text style={{ fontSize: 10 }}>First Name</Text>
                <Text style={{ fontSize: 10 }}>Middle Name</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <View style={{ ...styles.rightTextWithBorder, height: "33%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {kapForm.personalInfo.lastName.toUpperCase()}
                  </Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, height: "33%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {kapForm.personalInfo.firstName.toUpperCase()}
                  </Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, height: "33%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {kapForm.personalInfo.middleName.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ ...styles.connectedSectionRow, height: 60 }}>
              <View
                style={{
                  ...styles.centerTextWithBorder,
                  width: "30%",
                  gap: 3,
                }}
              >
                <Text style={{ fontSize: 10 }}>Maiden Surname</Text>
                <Text style={{ fontSize: 10 }}>Maiden Name</Text>
                <Text style={{ fontSize: 10 }}>Father&apos;s Name</Text>
                <Text style={{ fontSize: 10 }}>Mother&apos;s Name</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {kapForm.personalInfo.maidenSurname.toUpperCase()}
                  </Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {kapForm.personalInfo.maidenName.toUpperCase()}
                  </Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {kapForm.personalInfo.fathersName.toUpperCase()}
                  </Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {kapForm.personalInfo.mothersName.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* <View style={styles.section}>
            <Text>Hello World!</Text>
          </View> */}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default KAPMembershipPDF;
