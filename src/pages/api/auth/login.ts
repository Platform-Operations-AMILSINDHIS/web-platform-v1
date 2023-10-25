import { env } from "../../../env.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase_URL = env.SUPABASE_URL;
const supabase_API_KEY = env.SUPABASE_API_KEY;

const supabase = createClient(supabase_URL, supabase_API_KEY);

interface SupabaseLoginHandlerRequest extends NextApiRequest {
  body: {
    email: string | null;
    username: string;
  };
}

const SupabaseLoginHandler = async (
  req: SupabaseLoginHandlerRequest,
  res: NextApiResponse
) => {
  try {
    const { data: existingUser, error } = await supabase
      .from("general_accounts")
      .select("email_id")
      .eq("email_id", req.body.email);
    if (existingUser?.length > 0) {
      res.status(200).json({ data });
    }
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export default SupabaseLoginHandler;
