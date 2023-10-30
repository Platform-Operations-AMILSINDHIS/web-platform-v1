import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../supabase";

interface ValidateMailHandlerRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

const ValidateMailHandler = async (
  req: ValidateMailHandlerRequest,
  res: NextApiResponse
) => {
  const { email } = req.body;

  try {
    const { data, error } = await supabase
      .from("general_accounts")
      .select("*")
      .eq("email_id", email);

    if (error) throw error;

    if (data && data.length > 0) {
      // Email ID already exists
      res.status(200).json({
        error: "Account already exists, forgot password?",
        trigger: true,
      });
    } else {
      // Email ID is available
      res
        .status(200)
        .json({ message: "Email ID is available", trigger: false });
    }
  } catch (error) {
    console.log(error);
  }
};

export default ValidateMailHandler;
