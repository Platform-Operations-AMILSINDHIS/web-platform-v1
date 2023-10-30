import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../supabase";

interface LoginMailValidationHandlerRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

const LoginMailValidationHandler = async (
  req: LoginMailValidationHandlerRequest,
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
      res.status(200).json({ loginValidated: true, message: "" });
    } else {
      res
        .status(200)
        .json({ loginValidated: false, message: "Account does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default LoginMailValidationHandler;
