export interface KAPMembershipFormPDFValues {
  surname: string;
  firstName: string;
  middleName: string;

  maidenSurname: string;
  maidenName: string;
  fathersName: string;
  mothersName: string;

  residentialAddress: string;
  pinCode: string;
  telNumber: string;
  phoneNumber: string;
  emailAddress: string;

  officeAddress: string;
  pinCode: string;
  telNumber: string;
  phoneNumber: string;
  emailAddress: string;

  occupation: string;
  dateOfBirth: string;
  ageInYears: string;

  familyMembers?: {
    name: string;
    relationship: string;
    occupation: string;
    age: string;
  }[];

  membershipFees: string;
  dateOfApplication: string;

  proposerSurname: string;
  proposerFirstName: string;
  proposerMiddleName: string;
  proposerDate: string;

  // TODO: Office use section
}
