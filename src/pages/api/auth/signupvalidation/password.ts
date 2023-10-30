const bcrypt = require("bcrypt");

import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../supabase";

interface ValidatePasswordHandlerRequest extends NextApiRequest {
  body: {
    password: string;
  };
}

const ValidatePasswordHandler = async (
  req: ValidatePasswordHandlerRequest,
  res: NextApiResponse
) => {
  const { password } = req.body;

  try {
    const { data: users, error } = await supabase
      .from("general_accounts")
      .select("password");

    if (error) throw error;

    const isPasswordTaken = users.some((user) => {
      // Compare hashed password with input password
      return bcrypt.compareSync(password, user.password);
    });

    if (isPasswordTaken) {
      // Password is already taken
      res
        .status(200)
        .json({ error: "Password already in use", trigger_password: true });
    } else {
      // Password is available
      res
        .status(200)
        .json({ message: "Password is available", trigger_password: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default ValidatePasswordHandler;
