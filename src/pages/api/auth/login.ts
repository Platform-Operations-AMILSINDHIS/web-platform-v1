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

    if (error) res.status(404).json({ data, message: "fucked bro" });
    res.status(200).json({ data, message: "signed in :)" });
  } catch (error) {
    console.log(error);
  }
};

export default LoginHandler;
