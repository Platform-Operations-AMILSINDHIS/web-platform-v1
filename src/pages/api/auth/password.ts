import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface ValidatePasswordHandlerRequest extends NextApiRequest {
  body: {
    password: string;
  };
}

const ValidatePasswordHandler = async (
  req: ValidatePasswordHandlerRequest,
  res: NextApiResponse
) => {};
