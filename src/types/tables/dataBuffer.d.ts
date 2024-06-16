import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "../forms/membership";

import { MatrimonyFormValues } from "../forms/matrimony";

enum Status {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface FormBufferDataType {
  created_at: string;
  formType: string;
  id: number;
  user_id: string;
  status: Status;
  submission:
    | YACMembershipFormValues
    | KAPMembershipFormValues
    | MatrimonyBufferDataType;
}

export interface MembershipBufferDataType {
  created_at: string;
  formType: string;
  id: number;
  user_id: string;
  status: Status;
  submission: YACMembershipFormValues | KAPMembershipFormValues;
}

export interface MatrimonyBufferDataType {
  created_at: string;
  formType: string;
  id: number;
  user_id: string;
  status: Status;
  submission: MatrimonyFormValues;
}
