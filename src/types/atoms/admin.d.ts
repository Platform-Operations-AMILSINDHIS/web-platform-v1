interface adminAtomBody {
  id: string | null | undefined;
  admin_username: string | null | undefined;
  admin_email: string | null | undefined;
}

interface adminAtomState {
  admin: adminAtomBody | null;
}

export { adminAtomBody, adminAtomState };
