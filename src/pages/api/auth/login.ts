import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface SupabaseLoginHandlerRequest extends NextApiRequest {
  body: {
    email: string;
    username: string;
  };
}

const SupabaseLoginHandler = async (
  req: SupabaseLoginHandlerRequest,
  res: NextApiResponse
) => {
  try {
    const query = req.query;
    const { col, value } = query;
    const { data: existingUser, error } = await supabase
      .from("general_accounts")
      .select("email_id")
      .eq(`${col}`, value);

    if (existingUser && existingUser?.length > 0) {
      let loginStatus = true;
      res.status(200).json({ loginStatus, user: existingUser });
    }
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export default SupabaseLoginHandler;
