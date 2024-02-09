import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface userAtomBody {
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

export interface userAtomState {
  user: userAtomBody | null;
}

export const userAtom = atomWithStorage<userAtomState>("userAtomState", {
  user: null,
});
export const useUserAtom = () => useAtom(userAtom);
