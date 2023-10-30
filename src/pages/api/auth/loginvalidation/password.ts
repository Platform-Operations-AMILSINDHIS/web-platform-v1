import bcrypt from "bcrypt";

import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../supabase";

interface ValidatePasswordHandlerRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const ValidatePasswordHandler = async (
  req: ValidatePasswordHandlerRequest,
  res: NextApiResponse
) => {
  const { email, password } = req.body;

  try {
    const { data: users, error } = await supabase
      .from("general_accounts")
      .select("password")
      .eq("email_id", email)
      .limit(1)
      .single();

    if (error) throw error;

    const passwordCheck = await bcrypt.compare(
      password,
      users.password as string
    );

    if (!passwordCheck) {
      res
        .status(200)
        .json({ passwordValidate: false, message: "Invalid Password" });
    } else {
      res.status(200).json({ passwordValidate: true, message: "" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default ValidatePasswordHandler;
