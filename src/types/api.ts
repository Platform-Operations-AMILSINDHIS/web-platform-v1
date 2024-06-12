import { MatrimonyFormValues } from "./forms/matrimony";

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
}
