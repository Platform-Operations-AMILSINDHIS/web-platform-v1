import { AdminType, adminAtomBody } from "./atoms/admin";
import { MatrimonyFormValues } from "./forms/matrimony";
import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "./forms/membership";

enum Status {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface FetchMembershipSubmissionResponse {
  submission: MatrimonyFormValues;
}

export interface FetchProfileResponse {
  account_name: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  email_id: string;
  created_at: string;
  membership_id: string;
  KAP_member: boolean;
  YAC_member: boolean;
}

export interface MatrimonySubmissionVerificationServerResponse {
  user_verification: boolean;
  user_matData: {
    created_at: string;
    formType: string;
    id: number;
    status: string;
    submission: MatrimonyFormValues;
    user_id: string;
  }[];
}

export interface MatrimonySubmissionApprovalVerificationResponse {
  status: boolean;
}

export interface MatrimonyLoginResponse {
  loggedIn: boolean;
  message: string;
}

export interface MatrimonyProfilesFetchResponse {
  created_at: string;
  formType: string;
  id: number;
  status: string;
  submission: MatrimonyFormValues;
  user_id: string;
}

export interface MatrimonyIdFetchResponse {
  status: boolean;
  matrimony_id: string | null;
  message: string;
}

export interface ProfileRequestsFetchResponse {
  id: number;
  created_at: string;
  requestee_name: string;
  requestee_id: string;
  requested_name: string;
  requested_id: string;
  email_id: string;
}

export interface MatrimonyFormBufferDataFetch {
  id: number;
  created_at: string;
  user_id: string;
  formType: string;
  status: Status;
  submission: MatrimonyFormValues;
}

export interface MembershipFormBufferDataFetch {
  id: number;
  created_at: string;
  user_id: string;
  formType: string;
  isMember: boolean;
  paymentID: string;
  status: Status;
  submission: KAPMembershipFormValues | YACMembershipFormValues;
}

export interface FormBufferDataFetch {
  id: number;
  created_at: string;
  user_id: string;
  formType: string;
  status: Status;
  submission:
    | MatrimonyFormValues
    | KAPMembershipFormValues
    | YACMembershipFormValues;
}

export interface RequestResponse {
  message: string;
  toastType: "success" | "error" | "info" | "warning";
}

export interface SendRecoveryURLResponse extends RequestResponse {
  dummy?: string;
}
export interface UpdatePasswordResponse extends RequestResponse {
  dummy?: string;
}

export interface DeleteResponseType {
  status: boolean;
  statusText: string;
}

export interface MatrimonyProfileResponse {
  id: string;
  user_id: string;
  matrimony_id: string;
}

export interface AdminLoginResponse {
  loginStatus: boolean;
  message: string;
  redirect: string;
  admin: AdminType | null;
}

export interface AddAdminResponse {
  success: boolean;
  message: string;
}

export interface verifyMemberStatusResponse {
  isMemberVerified: boolean;
}
