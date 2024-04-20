interface userAtomBody {
  auth_id: string;
  email_id: string;
  first_name: string;
  last_name: string;
  account_name: string;
  gender: string;
  user_member: number;
  membership_id: string;
  age: number;
}

interface userAtomState {
  user: userAtomBody | null;
}

export { userAtomBody, userAtomState };
