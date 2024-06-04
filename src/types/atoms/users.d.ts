interface userAtomBody {
  auth_id: string;
  email_id: string;
  first_name: string;
  last_name: string;
  account_name: string;
  gender: string;
  membership_id: string;
  age: number;
  KAP_member: boolean;
  YAC_member: boolean;
}

interface userAtomState {
  user: userAtomBody | null;
}

export { userAtomBody, userAtomState };
