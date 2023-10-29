import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

const check = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase.from("auth.users").select("*");
    if (error) throw error;
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
};

export default check;
