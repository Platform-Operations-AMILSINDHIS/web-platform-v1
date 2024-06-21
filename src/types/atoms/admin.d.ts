interface adminAtomBody {
  id: string | null | undefined;
  admin_username: string | null | undefined;
  admin_email: string | null | undefined;
}

interface adminAtomState {
  admin: adminAtomBody | null;
}

interface AdminType {
  id: string;
  admin_username: string;
  admin_password: string;
  admin_email: string;
}

export { adminAtomBody, adminAtomState, AdminType };
