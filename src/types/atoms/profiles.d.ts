interface profileAtomBody {
  user_id: string | null | undefined;
  formType: string | null | undefined;
}

interface profileAtomState {
  selected_profile: profileAtomBody | null;
}

export { profileAtomBody, profileAtomState };
