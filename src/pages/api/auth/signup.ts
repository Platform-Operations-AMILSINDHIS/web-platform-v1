import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface SignUpRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    account_name: string;
    KAP_member: boolean;
    YAC_member: boolean;
    age: number;
    membership_id: string;
    gender: string;
    first_name: string;
    last_name: string;
  };
}

const SignUpHandler = async (req: SignUpRequest, res: NextApiResponse) => {
  const {
    email,
    password,
    account_name,
    KAP_member,
    YAC_member,
    age,
    membership_id,
    gender,
    first_name,
    last_name,
  } = req.body;

  try {
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    // Insert user data into the general_accounts table
    const { data, error: insertError } = await supabase
      .from("general_accounts")
      .upsert([
        {
          email_id: email,
          account_name,
          KAP_member,
          YAC_member,
          age,
          membership_id,
          gender,
          first_name,
          last_name,
        },
      ]);

    if (insertError) {
      console.error(insertError);
      throw insertError;
    }

    res.status(200).json({ user, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default SignUpHandler;
