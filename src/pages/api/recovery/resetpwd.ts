import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../auth/supabase";
import hasher from "~/utils/hasher";

interface ResetPasswordRequestHandler extends NextApiRequest {
  body: {
    email: string;
    newPassword: string;
  };
}

const ResetHandler = async (
  req: ResetPasswordRequestHandler,
  res: NextApiResponse
) => {
  const { email, newPassword } = req.body;
  try {
    const hashed_password = await hasher(newPassword);
    const { data, error } = await supabase
      .from("general_accounts")
      .update({ password: hashed_password })
      .eq("email_id", email);

    console.log(data);

    if (error) {
      console.log(error.message);
      throw error;
    }

    res.status(200).send({
      message: "password reset successful",
    });
  } catch (error) {
    console.log(error);
  }
};

export default ResetHandler;
