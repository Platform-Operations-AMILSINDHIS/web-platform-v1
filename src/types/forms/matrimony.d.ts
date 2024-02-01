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

  gender: "Male" | "Female" | null;
  maritalStatus: "Single" | "Divorcee" | "Widower" | "Widow" | null;
  manglik: "Yes" | "No" | null;

  heightFeet: number | null;
  heightInches: number | null;
  weight: number | null;

  qualifications: string[]; // educational and other sorts of qualifications
  hobbies: string;
  complexionAndFeatures: string;
}

export interface ResidentialAddressDetails {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  pinCode: string;
}

export interface SpousePreferences {
  working: boolean | null;
  dietaryPreference: "veg" | "non-veg" | null;

  qualificationRequirements: string;
  complexion: string;

  heightFeet: number | null;
  heightInches: number | null;
  weight: number | null;

  horoscopeMatching: "yes" | "no" | null;
  build: "medium" | "slim" | "healthy" | null;
  siblings: "yes" | "no" | null;
}

export interface MatrimonyFormValues {
  personalInfo: PersonalInfo;
  familyMembers?: FamilyMember[];
  residentialAddressDetails: ResidentialAddressDetails;
  spousePreferences: SpousePreferences;
  proposerInfo: ProposerInfo;
}
