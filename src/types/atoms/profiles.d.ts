interface profileAtomBody {
  form_id: number | null | undefined;
  user_id: string | null | undefined;
  formType: string | null | undefined;
  status: string | null | undefined;
  isMember: boolean;
  paymentID: string;
}

interface profileAtomState {
  selected_profile: profileAtomBody | null;
}

export { profileAtomBody, profileAtomState };
