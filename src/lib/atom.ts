import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { adminAtomState } from "~/types/atoms/admin";
import { userAtomState } from "~/types/atoms/users";

export const userAtom = atomWithStorage<userAtomState>("userAtomState", {
  user: null,
});

export const adminAtom = atomWithStorage<adminAtomState>("adminAtomState", {
  admin: null,
});

export const useUserAtom = () => useAtom(userAtom);
export const useAdminAtom = () => useAtom(adminAtom);
