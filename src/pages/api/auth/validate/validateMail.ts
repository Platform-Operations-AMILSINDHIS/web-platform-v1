import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../supabase";

interface ValidateMailHandlerRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

const ValidateMailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email } = req.body;

  try {
    const { data, error } = await supabase
      .from("auth")
      .select("*")
      .eq("email", email);

    if (error) throw error;

    if (data && data.length > 0) {
      // Email ID already exists
      res.status(400).json({ error: "Email ID already in use" });
    } else {
      // Email ID is available
      res.status(200).json({ message: "Email ID is available" });
    }
  } catch (error) {
    alert(`${error} occured, please reload the page`);
  }
};
