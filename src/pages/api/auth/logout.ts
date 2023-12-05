import { NextApiResponse, NextApiRequest } from "next";
import { useUserAtom } from "~/lib/atom";

import supabase from "./supabase";

const LogOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const [, setUser] = useUserAtom();
  const { error } = await supabase.auth.signOut();

  if (error)
    res.status(404).json({ responseFlag: 0, errorMessage: error.message });

  setUser({ user: null });
  res.status(200).json({ responseFlag: 0, responseMessage: "Logged out" });
};

export default LogOutHandler;
