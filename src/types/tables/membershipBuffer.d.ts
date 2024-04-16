import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "../forms/membership";

export interface MembershipBufferDataType {
  created_at: string;
  formType: string;
  id: number;
  user_id: string;
  submission: YACMembershipFormValues | KAPMembershipFormValues;
}
