import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "../forms/membership";

import { MatrimonyFormValues } from "../forms/matrimony";

export enum Status {
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
    | MatrimonyFormValues;
}

export interface MembershipBufferDataType {
  id: number;
  created_at: string;
  user_id: string;
  formType: string;
  status: Status;
  submission: KAPMembershipFormValues | YACMembershipFormValues;
}

export interface MatrimonyBufferDataType {
  created_at: string;
  formType: string;
  id: number;
  user_id: string;
  status: Status;
  submission: MatrimonyFormValues;
}
