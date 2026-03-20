export interface ProfileRequestsDataType {
  id: number;
  created_at: string;
  requestee_name: string;
  requestee_id: string;
  requested_name: string;
  requested_id: string;
  email_id: string;
  requestee_user_id?: string | null;
  requested_user_id?: string | null;
  requestee_profile_s3_key?: string | null;
  requested_profile_s3_key?: string | null;
  requestee_matrimony_s3_key?: string | null;
  requested_matrimony_s3_key?: string | null;
}
