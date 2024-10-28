interface profileAtomBody {
  form_id: number | null | undefined;
  user_id: string | null | undefined;
  formType: string | null | undefined;
  status: string | null | undefined;
  // only required for member applicants
  isMember?: boolean;
  paymentID?: string;
}

interface profileAtomState {
  selected_profile: profileAtomBody | null;
}

export { profileAtomBody, profileAtomState };
