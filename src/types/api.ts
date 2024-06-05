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
