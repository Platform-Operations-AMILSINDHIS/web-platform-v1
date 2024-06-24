/* eslint-disable */
import { jsPDF } from "jspdf";
import { MatrimonyFormValues } from "~/types/forms/matrimony";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  return `<span class="math-inline">\{day\}/</span>{month}/${year}`;
}

function formatAge(dateString: string) {
  const dob = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    return age - 1;
  }
  return age;
}

const generateMatrimonyProfilePDF = (details: MatrimonyFormValues) => {
  const doc = new jsPDF();
  // Header
  doc.setFontSize(16);
  doc.text(
    `${details.personalInfo.firstName} ${details.personalInfo.middleName} ${details.personalInfo.lastName}'s Matrimony Profile`,
    80,
    10
  );
  doc.setFontSize(12);

  // Proposer Details
  let y = 20;

  // Spouse Preferences
  doc.text("Spouse Preferences", 14, y + 10);
  y += 15;
  for (const key in details.spousePreferences) {
    const value = details.spousePreferences[key];
    doc.text(`${key.toUpperCase()}: ${value}`, 14, y);
    y += 7;
  }

  // Residential Address
  doc.text("Residential Address", 14, y + 10);
  y += 15;
  for (const key in details.residentialAddressDetails) {
    const value = details.residentialAddressDetails[key];
    doc.text(`${key.toUpperCase()}: ${value}`, 14, y);
    y += 7;
  }

  // Family Members
  if (details.familyMembers && details.familyMembers.length > 0) {
    doc.text("Family Members", 14, y + 10);
    y += 15;

    for (const member of details.familyMembers) {
      let memberInfo = `Name: ${member.memberName}\nRelationship: ${member.relationship}\nOccupation: ${member.occupation}`;
      const age = formatAge(
        (member.dateOfBirth as string) ? (member.dateOfBirth as string) : ""
      );
      if (age) {
        memberInfo += `\nAge: ${age}`;
      }
      doc.text(memberInfo, 14, y);
      y += 12; // Adjust spacing as needed
    }

    doc.text(
      "Page 1 of 2",
      doc.internal.pageSize.getWidth() - 30,
      doc.internal.pageSize.getHeight() - 10
    );
  }

  const personalInfo = details.personalInfo;
  let contactDetails = "";
  let physicalAttributes = "";
  let otherInfo = "";

  // Loop through each key-value pair in personalInfo
  for (const key in personalInfo) {
    const value = personalInfo[key];
    let formattedValue = value;
    if (key === "dateOfBirth") {
      formattedValue = formatDate(value as string);
    }

    // Split information based on key names
    switch (key) {
      case "emailId":
      case "mobileNumber":
        contactDetails += `${key.toUpperCase()}: ${formattedValue}\n`;
        break;
      case "weight":
      case "heightInches":
      case "heightFeet":
      case "complexionAndFeatures":
        physicalAttributes += `${key.toUpperCase()}: ${formattedValue}\n`;
        break;
      default:
        otherInfo += `${key.toUpperCase()}: ${formattedValue}\n`;
    }
  }

  // Personal Information
  // Add a new page for Personal Information
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Personal Information", 14, 10);

  // Add separate sections with headings
  y = 20; // Adjust starting y-position as needed

  doc.text("Contact Details", 14, y);
  y += 10;
  doc.text(contactDetails, 14, y);
  y += 20; // Adjust spacing as needed

  doc.text("Physical Attributes", 14, y);
  y += 12;
  doc.text(physicalAttributes, 14, y);
  y += 40; // Adjust spacing as needed

  doc.text("Other Information", 14, y); // Add heading for "Other Information"
  y += 12;
  doc.text(otherInfo, 14, y);
  y += 12; // Adjust spacing as needed
  doc.text(
    "Page 2 of 2",
    doc.internal.pageSize.getWidth() - 30,
    doc.internal.pageSize.getHeight() - 10
  );
  doc.save("biodata.pdf");
  const pdfBuffer = doc.output("arraybuffer");
  return new Uint8Array(pdfBuffer);
};

export default generateMatrimonyProfilePDF;
