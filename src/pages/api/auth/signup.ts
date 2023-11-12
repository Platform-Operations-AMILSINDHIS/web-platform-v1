import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface SignUpRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    phonenumber: string;
  };
}

const SignUpHandler = async (req: SignUpRequest, res: NextApiResponse) => {
  const { email, password, phonenumber } = req.body;

  try {
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
      phone: phonenumber,
    });

    if (error) throw error;

    const auth_id = user?.user?.id;

    res.status(200).json({ user, message: "success", auth_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export default SignUpHandler;
