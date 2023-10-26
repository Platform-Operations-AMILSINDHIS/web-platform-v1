import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface SignUpRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const SignUpHandler = async (req: SignUpRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    res.status(200).json({ user, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default SignUpHandler;
