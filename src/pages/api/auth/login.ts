import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface LoginHandlerRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const LoginHandler = async (req: LoginHandlerRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    res.status(200).json({ data, "signed in :)" });
  } catch (error) {
    console.log(error);
  }
};

export default LoginHandler;
