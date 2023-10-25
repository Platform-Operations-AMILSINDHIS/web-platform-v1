import { env } from "../../../env.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase_URL = env.SUPABASE_URL;
const supabase_API_KEY = env.SUPABASE_API_KEY;

const supabase = createClient(supabase_URL, supabase_API_KEY);

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
