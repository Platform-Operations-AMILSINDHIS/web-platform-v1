export interface FamilyMember {
  memberName?: string;
  relationship?: string;
  occupation?: string;
  age?: number | null;

  [key: string]: string | number | null;
}

export interface PersonalInfo {
  firstName: string;
  middleName?: string;
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
    addressLine3?: string;
    pinCode: string;
  };
  officeAddress?: {
    addressLine1: string;
    addressLine2: string;
    addressLine3?: string;
    pinCode: string;
  };
}

export interface KAPMembershipInfo {
  membershipType: "patron" | "life-member" | null;
}

export interface ProposerInfo {
  firstName: string;
  lastName: string;
  mobileNumber: string;

  [key: string]: string | number | null;
}

export interface KAPMembershipFormValues {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  familyMembers?: FamilyMember[];
  proposerInfo: ProposerInfo;
  membershipInfo: KAPMembershipInfo;
}

export interface YACMembershipFormValues {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  familyMembers?: FamilyMember[];
  proposerInfo: ProposerInfo;
}

export interface KAPFormSectionProps {
  user: userAtomBody;
}
export interface KhudabadiAmilPanchayatMembershipFormProps
  extends KAPFormSectionProps {}

export interface YACFormSectionProps {
  user: userAtomBody;
}
export interface YoungAmilCircleMembershipFormProps
  extends KAPFormSectionProps {}

export interface MatrimonyFormSectionProps {
  user: userAtomBody;
  submissionVerification?: boolean;
}

export interface MatrimonyFormProps extends MatrimonyFormSectionProps {}
