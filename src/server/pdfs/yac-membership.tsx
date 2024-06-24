/* eslint-disable */
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

import type { YACMembershipFormValues } from "~/types/forms/membership";

interface YACMembershipFormPDFProps {
  membershipNumber: string;
  yacForm: YACMembershipFormValues;
  amount?: string;
}

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

export const YACMembershipPDF: React.FC<YACMembershipFormPDFProps> = ({
  membershipNumber,
  yacForm,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <View style={styles.headerInnerSection}>
            {/* <Image
              // src={window.location.origin + "/images/pdfs/kap-pdf-header.png"}
              src="https://i.ibb.co/mbT3pcx/kap-pdf-header.jpg"
              style={{ width: "80%" }}
            /> */}
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
        <View
          style={{ ...styles.connectedSection, marginHorizontal: 10, gap: 5 }}
        >
          <View
            style={{
              ...styles.centerTextWithBorder,
              fontWeight: "extrabold",
              textTransform: "uppercase",
              fontSize: 10,
              height: 20,
            }}
          >
            <Text>YAC Membership / Application Form - Member</Text>
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
                  {yacForm.personalInfo.lastName.toUpperCase()}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "33%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.personalInfo.firstName.toUpperCase()}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "33%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.personalInfo?.middleName?.toUpperCase() ?? ""}
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
                  {yacForm.personalInfo.maidenSurname.toUpperCase()}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.personalInfo.maidenName.toUpperCase()}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.personalInfo.fathersName.toUpperCase()}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.personalInfo.mothersName.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ ...styles.connectedSectionRow, height: 70 }}>
            <View
              style={{
                ...styles.centerTextWithBorder,
                width: "15%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>Residential</Text>
              <Text style={{ fontSize: 10 }}>Address</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.addressInfo.residentialAddress.addressLine1.toUpperCase()}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.addressInfo.residentialAddress.addressLine2.toUpperCase()}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.addressInfo.residentialAddress?.addressLine3?.toUpperCase() ??
                    ""}
                </Text>
              </View>
              <View style={{ flexDirection: "row", height: "25%" }}>
                <View style={{ ...styles.centerTextWithBorder, width: "15%" }}>
                  <Text style={{ fontSize: 10 }}>Pin Code</Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, width: "35%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {yacForm.addressInfo.residentialAddress.pinCode.toUpperCase()}
                  </Text>
                </View>
                <View style={{ ...styles.centerTextWithBorder, width: "15%" }}>
                  <Text style={{ fontSize: 10 }}>Tel no.</Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, width: "35%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {yacForm.personalInfo.mobileNumber.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ ...styles.connectedSectionRow, height: 70 }}>
            <View
              style={{
                ...styles.centerTextWithBorder,
                width: "15%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>Office</Text>
              <Text style={{ fontSize: 10 }}>Address</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.addressInfo.officeAddress?.addressLine1.toUpperCase() ??
                    ""}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.addressInfo.officeAddress?.addressLine2.toUpperCase() ??
                    ""}
                </Text>
              </View>
              <View style={{ ...styles.rightTextWithBorder, height: "25%" }}>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {yacForm.addressInfo.officeAddress?.addressLine3?.toUpperCase() ??
                    ""}
                </Text>
              </View>
              <View style={{ flexDirection: "row", height: "25%" }}>
                <View style={{ ...styles.centerTextWithBorder, width: "15%" }}>
                  <Text style={{ fontSize: 10 }}>Pin Code</Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, width: "35%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {yacForm.addressInfo.officeAddress?.pinCode.toUpperCase() ??
                      ""}
                  </Text>
                </View>
                <View style={{ ...styles.centerTextWithBorder, width: "15%" }}>
                  <Text style={{ fontSize: 10 }}>Tel no.</Text>
                </View>
                <View style={{ ...styles.rightTextWithBorder, width: "35%" }}>
                  <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                    {yacForm.personalInfo.mobileNumber.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ ...styles.connectedSectionRow, height: 30 }}>
            <View
              style={{
                ...styles.centerTextWithBorder,
                width: "15%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>Occupation</Text>
            </View>
            <View style={{ ...styles.rightTextWithBorder, width: "35%" }}>
              <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                {yacForm.personalInfo.occupation.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                ...styles.centerTextWithBorder,
                width: "10%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>Date of</Text>
              <Text style={{ fontSize: 10 }}>Birth</Text>
            </View>
            <View style={{ ...styles.rightTextWithBorder, width: "15%" }}>
              <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                {yacForm.personalInfo.dateOfBirth.toLocaleDateString("en-IN")}
              </Text>
            </View>
            <View
              style={{
                ...styles.centerTextWithBorder,
                width: "10%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>Age</Text>
              <Text style={{ fontSize: 10 }}>in Years</Text>
            </View>
            <View style={{ ...styles.rightTextWithBorder, width: "15%" }}>
              <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                {Math.floor(
                  (new Date().getTime() -
                    yacForm.personalInfo.dateOfBirth.getTime()) /
                    (1000 * 60 * 60 * 24 * 365)
                )}
              </Text>
            </View>
          </View>

          <View style={{ ...styles.connectedSectionRow, height: 100 }}>
            <View
              style={{
                ...styles.rightTextWithBorder,
                paddingTop: "20px",
                flexDirection: "column",
                alignItems: "baseline",
                width: "15%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>List of</Text>
              <Text style={{ fontSize: 10 }}>other</Text>
              <Text style={{ fontSize: 10 }}>members</Text>
              <Text style={{ fontSize: 10 }}>in the</Text>
              <Text style={{ fontSize: 10 }}>family</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row", height: "16.66%" }}>
                <View style={{ ...styles.centerTextWithBorder, width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>Name</Text>
                </View>
                <View style={{ ...styles.centerTextWithBorder, width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>Relationship</Text>
                </View>
                <View style={{ ...styles.centerTextWithBorder, width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>Occuption</Text>
                </View>
                <View style={{ ...styles.centerTextWithBorder, width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>Age</Text>
                </View>
              </View>
              {yacForm.familyMembers?.[0] ? (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[0].memberName?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[0].relationship?.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.rightTextWithBorder,
                      width: "25%",
                    }}
                  >
                    <Text style={{ fontSize: 6 }}>
                      {yacForm.familyMembers[0].occupation?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[0].age?.toString()}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                </View>
              )}

              {yacForm.familyMembers?.[1] ? (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[1].memberName?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[1].relationship?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 6 }}>
                      {yacForm.familyMembers[1].occupation?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[1].age?.toString()}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                </View>
              )}

              {yacForm.familyMembers?.[2] ? (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[2].memberName?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[2].relationship?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 6 }}>
                      {yacForm.familyMembers[2].occupation?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[2].age?.toString()}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                </View>
              )}

              {yacForm.familyMembers?.[3] ? (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[3].memberName?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[3].relationship?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 6 }}>
                      {yacForm.familyMembers[3].occupation?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[3].age?.toString()}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                </View>
              )}

              {yacForm.familyMembers?.[4] ? (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[4].memberName?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[4].relationship?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 6 }}>
                      {yacForm.familyMembers[4].occupation?.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ ...styles.rightTextWithBorder, width: "25%" }}>
                    <Text style={{ fontSize: 10 }}>
                      {yacForm.familyMembers[4].age?.toString()}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row", height: "16.66%" }}>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                  <View
                    style={{ ...styles.rightTextWithBorder, width: "25%" }}
                  ></View>
                </View>
              )}
            </View>
          </View>

          <View style={{ ...styles.connectedSectionRow, height: 80 }}>
            <View
              style={{
                ...styles.centerTextWithBorder,
                width: "15%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>Declaration</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View
                style={{
                  ...styles.rightTextWithBorder,
                  flexDirection: "column",
                  alignItems: "baseline",
                  paddingHorizontal: 4,
                  paddingTop: 4,
                  height: "100%",
                }}
              >
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  The applicant hereby declares that: I am a Khudabadi Amil and
                  request the Committee to
                </Text>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  {/* TODO: Strike out whichever is not applicable */}
                  admit me as a Member of The Young Amil Circle.
                </Text>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  I agree to abide by the Constitution and Rules of the
                  Khudabadi Amil Panchayat of Bombay in
                </Text>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  force from time to time.
                </Text>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  I hereby enclose cheque / cash for Rs. 1000/- as membership
                  fees.
                </Text>
                <Text
                  style={{
                    ...styles.fieldValue,
                    paddingTop: 6,
                    fontSize: 10,
                  }}
                >
                  Date: {new Date().toLocaleDateString("en-IN")}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ ...styles.connectedSectionRow, height: 83 }}>
            <View
              style={{
                ...styles.centerTextWithBorder,
                width: "15%",
                gap: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>Name and</Text>
              <Text style={{ fontSize: 10 }}>Signature</Text>
              <Text style={{ fontSize: 10 }}>of the</Text>
              <Text style={{ fontSize: 10 }}>Proposer</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row", height: "50%" }}>
                <View
                  style={{
                    ...styles.centerTextWithBorder,
                    width: "15%",
                  }}
                >
                  <Text style={{ fontSize: 8 }}>Surname</Text>
                  <Text style={{ fontSize: 8 }}>First Name</Text>
                  <Text style={{ fontSize: 8 }}>Middle Name</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <View
                    style={{ ...styles.rightTextWithBorder, height: "33%" }}
                  >
                    <Text style={{ ...styles.fieldValue, fontSize: 8 }}>
                      {yacForm.personalInfo.lastName.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{ ...styles.rightTextWithBorder, height: "33%" }}
                  >
                    <Text style={{ ...styles.fieldValue, fontSize: 8 }}>
                      {yacForm.personalInfo.firstName.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{ ...styles.rightTextWithBorder, height: "33%" }}
                  >
                    <Text style={{ ...styles.fieldValue, fontSize: 8 }}>
                      {yacForm.personalInfo.middleName?.toUpperCase() ?? ""}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.rightTextWithBorder,
                  flexDirection: "column",
                  alignItems: "baseline",
                  paddingHorizontal: 4,
                  paddingTop: 3,
                  height: "50%",
                }}
              >
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  I certify that the applicant is a Khudabadi Amil and is
                  eligible for
                </Text>
                <Text style={{ ...styles.fieldValue, fontSize: 10 }}>
                  membership of the Young Amil Circle.
                </Text>
                <View
                  style={{
                    ...styles.rightTextWithBorder,
                    flexDirection: "column",
                    alignItems: "baseline",
                    paddingHorizontal: 4,
                    paddingTop: 3,
                    height: "50%",
                  }}
                >
                  <Text
                    style={{
                      ...styles.fieldValue,
                      paddingTop: 2,
                      fontSize: 10,
                    }}
                  >
                    Date: {new Date().toLocaleDateString("en-IN")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const generateYACMembershipPDF = async (
  props: YACMembershipFormPDFProps
) => await renderToBuffer(<YACMembershipPDF {...props} />);
