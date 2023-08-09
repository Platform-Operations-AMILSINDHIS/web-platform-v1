export interface FamilyMember {
  memberName: string;
  relationship: string;
  occupation: string;
  age: number | null;
}

export interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  occupation: string;
  dateOfBirth: Date;
  mobileNumber: string;
  emailId: string;
  maidenSurname: string;
  maidenName: string;
  fathersName: string;
  mothersName: string;
  // TODO: add member photo url/file type here (ref end of page at https://amilsindhis.org/membership/khudabadi-amil-panchayat)
}

export interface AddressInfo {
  residentialAddress: {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    pinCode: string;
  };
  officeAddress?: {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    pinCode: string;
  };
}

export interface MembershipInfo {
  membershipType: "patron" | "life-member" | null;
}

export interface ProposerInfo {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  // TODO: get this clarified (ref: end of page at https://amilsindhis.org/membership/khudabadi-amil-panchayat)
  // firstName2: string;
  // lastName2: string;
  // phone2: string;
}

export interface KAPMembershipFormValues {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  membershipInfo: MembershipInfo;
  familyMembers?: FamilyMember[];
  proposerInfo: ProposerInfo;
}
