import { NextApiResponse, NextApiRequest } from "next";

import supabase from "./supabase";

const LogOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { error } = await supabase.auth.signOut();

  if (error)
    res.status(404).json({ responseFlag: 0, errorMessage: error.message });

  res.status(200).json({ responseFlag: 1, responseMessage: "Logged out" });
};

export default LogOutHandler;
