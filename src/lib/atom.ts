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

export interface adminAtomBody {
  id: string;
  admin_username: string;
  admin_password: string;
  admin_email: string;
}

export interface userAtomState {
  user: userAtomBody | null;
}

export interface adminAtomState {
  admin: adminAtomBody | null;
}

export const userAtom = atomWithStorage<userAtomState>("userAtomState", {
  user: null,
});

export const adminAtom = atomWithStorage<adminAtomState>("adminAtomState", {
  admin: null,
});

export const useUserAtom = () => useAtom(userAtom);
export const useAdminAtom = () => useAtom(adminAtom);
