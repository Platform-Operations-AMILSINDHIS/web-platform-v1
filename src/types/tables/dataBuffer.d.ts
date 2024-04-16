import {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "../forms/membership";

import { MatrimonyFormValues } from "../forms/matrimony";

export interface MembershipBufferDataType {
  created_at: string;
  formType: string;
  id: number;
  user_id: string;
  submission: YACMembershipFormValues | KAPMembershipFormValues;
}

export interface MatrimonyBufferDataType {
  created_at: string;
  formType: string;
  id: number;
  user_id: string;
  submission: MatrimonyFormValues;
}
