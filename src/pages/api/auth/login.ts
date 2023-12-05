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

    const { data: userData, error: fetchError } = await supabase
      .from("general_accounts")
      .select("*")
      .eq("email_id", data.user?.email);

    if (fetchError) res.status(404).json({ message: "fetch error from table" });
    res.status(200).json({ userData, message: "signed in :)" });
  } catch (error) {
    console.log({ error, message: "ass" });
  }
};

export default LoginHandler;
