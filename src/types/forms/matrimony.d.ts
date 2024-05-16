import type { FamilyMember, ProposerInfo } from "~/types/forms/membership";

export interface PersonalInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateAndTimeOfBirth: string;
  placeOfBirth: string;
  mobileNumber: string;
  emailId: string;
  occupation: string;
  incomePerAnnum: number | null;

  gender: "Male" | "Female";
  maritalStatus: "Single" | "Divorcee" | "Widower" | "Widow";
  manglik: "Yes" | "No";

  heightFeet: number;
  heightInches: number;
  weight: number;

  qualifications: string[]; // educational and other sorts of qualifications
  hobbies: string;
  complexionAndFeatures: string;

  [key: string]: string | number | null;
}

export interface ResidentialAddressDetails {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  pinCode: string;
}

export interface SpousePreferences {
  working: "Yes" | "No";
  dietaryPreference: "Veg" | "Non-veg";

  qualificationRequirements: string;
  complexion: string;

  heightFeet: number;
  heightInches: number;
  weight: number;

  horoscopeMatching: "Yes" | "No";
  build: "Medium" | "Slim" | "Healthy";
  siblings: "Yes" | "No";
}

export interface MatrimonyFormValues {
  personalInfo: PersonalInfo;
  familyMembers?: FamilyMember[];
  residentialAddressDetails: ResidentialAddressDetails;
  spousePreferences: SpousePreferences;
  proposerInfo: ProposerInfo;
}
